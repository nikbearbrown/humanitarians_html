// Local-only synthetic harness: actual React screen + actual API handlers +
// in-memory PostgreSQL. This is not the deployed Next server or a real roster.
import { createServer } from "node:http";
import { mkdtemp, readFile, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { chromium, expect } from "@playwright/test";
import { NextRequest } from "next/server";
import { db, setupSynthetic, actors, cookies, strictCookies } from "./fixture";
import { adminRosterHandler, listAdminRoster } from '../../lib/admin-roster';
const temp = await mkdtemp(join(tmpdir(), "ledger-roster-ui-"));
const out = "docs/timesheets/screenshots";
await mkdir(out, { recursive: true });
await setupSynthetic();
await db.query("UPDATE fellows SET joined_date='2026-10-01',email=CASE WHEN id=$1 THEN 'fellow@example.org' WHEN id=$2 THEN 'supervisor@example.org' ELSE 'other-supervisor@example.org' END",[actors.fellow,actors.pm]);
await db.query("UPDATE projects SET slug=CASE WHEN id=$1 THEN 'demo-project' ELSE 'other-project' END",[actors.project]);
const monday = new Date();
monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));
const week = monday.toISOString().slice(0, 10);
await build({
  stdin: {
    contents:
      "import React from 'react'; import {createRoot} from 'react-dom/client'; import Timesheets from './app/admin/dashboard/fellows/page'; createRoot(document.getElementById('app')).render(<Timesheets/>);",
    resolveDir: process.cwd(),
    loader: "tsx",
  },
  bundle: true,
  platform: "browser",
  format: "iife",
  jsx: "automatic",
  outfile: join(temp, "app.js"),
  plugins: [
    {
      name: "preview-link",
      setup(b) {
        b.onResolve({ filter: /^next\/link$/ }, () => ({
          path: "next/link",
          namespace: "preview",
        }));
        b.onLoad({ filter: /.*/, namespace: "preview" }, () => ({
          contents:
            "import React from 'react'; export default function Link({children,...props}){return React.createElement('a',props,children)}",
          loader: "jsx",
          resolveDir: process.cwd(),
        }));
      },
    },
  ],
});
execFileSync(
  "node_modules/.bin/tailwindcss",
  [
    "-i",
    "app/globals.css",
    "-o",
    join(temp, "style.css"),
    "--content",
    "app/admin/dashboard/fellows/page.tsx,components/ui/*.tsx",
  ],
  { stdio: "pipe" },
);
const js = await readFile(join(temp, "app.js")),
  css = await readFile(join(temp, "style.css"));
// Authorization is stubbed for this isolated UI harness; denial is tested in roster.test.ts.
const handler=adminRosterHandler({authorized:async()=>true,list:listAdminRoster});
let base='';
const server=createServer(async(req,res)=>{
  if(req.url==='/app.js'){res.setHeader('Content-Type','application/javascript');res.end(js);return}
  if(req.url==='/style.css'){res.setHeader('Content-Type','text/css');res.end(css);return}
  if(req.url==='/api/admin/fellows/list'){const r=await handler();res.writeHead(r.status,Object.fromEntries(r.headers));res.end(await r.text());return}
  res.setHeader('Content-Type','text/html');res.end('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/style.css"></head><body style="font-family:Arial,sans-serif"><aside style="padding:12px;background:#fff2c5;text-align:center">LOCAL SYNTHETIC TEST — Fictional accounts; no production connection</aside><main id="app" style="max-width:1000px;margin:32px auto;padding:16px"></main><script src="/app.js"></script></body></html>');
});
await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));
base='http://127.0.0.1:'+(server.address() as {port:number}).port;
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try{
 const context=await browser.newContext({viewport:{width:1280,height:900}});
 await context.route('**/*',route=>new URL(route.request().url()).origin===base?route.continue():route.abort());
 const page=await context.newPage();const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);
 await expect(page.getByRole('button',{name:'Project managers (2)',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Project managers (2)',exact:true}).click();
 await expect(page.getByRole('status')).toHaveText('2 accounts shown.');
 await expect(page.getByText('Demo project',{exact:false}).last()).toBeVisible();
 await page.screenshot({path:out+'/05-roster-project-managers.png',fullPage:true,animations:"disabled"});
 await page.getByLabel('Search people or projects').fill('Other project');
 await expect(page.getByRole('status')).toHaveText('1 accounts shown.');
 await page.getByLabel('Search people or projects').fill('');
 await page.getByRole('button',{name:'Board / C-suite (unknown)',exact:true}).click();
 await expect(page.getByText('No verified board classification to display.',{exact:true})).toBeVisible();
 await page.screenshot({path:out+'/06-roster-board-unknown.png',fullPage:true,animations:"disabled"});
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:'Project managers (2)',exact:true}).click();
 await expect(page.getByRole('status')).toHaveText('2 accounts shown.');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));
 await page.screenshot({path:out+'/07-roster-mobile.png',fullPage:true,animations:"disabled"});
 assert.deepEqual(errors,[]);
 console.log('PASS roster: current PM count, project search, unknown board, mobile width, no React errors; synthetic SQL, authorization stubbed.');
}finally{await browser.close();await new Promise<void>(resolve=>server.close(()=>resolve()));await db.close();await rm(temp,{recursive:true,force:true})}
