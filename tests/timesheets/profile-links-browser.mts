// Synthetic integration: actual profile React form, API/session/SQL and public page SSR.
// Next routing/Link are harnessed; this is not a deployed Next server or production data.
import { createServer } from 'node:http'
import { mkdtemp, readFile, mkdir, rm } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import assert from 'node:assert/strict'
import { build } from 'esbuild'
import { renderToStaticMarkup } from 'react-dom/server'
import { chromium, expect } from '@playwright/test'
import { NextRequest } from 'next/server'
import { db, setupSynthetic, actors, cookies } from './fixture'
import { GET, PATCH } from '../../app/api/fellows/me/route'
await mkdir('node_modules/.cache',{recursive:true})
const temp=await mkdtemp(resolve('node_modules/.cache/profile-links-'))
const out='docs/profile-links/screenshots'
await mkdir(out,{recursive:true})
await setupSynthetic()
await db.query("UPDATE fellows SET name='Synthetic Fellow',slug='synthetic-fellow',bio='A fictional profile for local verification.',joined_date='2026-10-01 12:00:00+00' WHERE id=$1",[actors.fellow])
await build({stdin:{contents:"import React from 'react'; import {createRoot} from 'react-dom/client'; import Profile from './app/fellows/me/page'; createRoot(document.getElementById('app')).render(<Profile/>);",resolveDir:process.cwd(),loader:'tsx'},bundle:true,platform:'browser',format:'iife',jsx:'automatic',outfile:join(temp,'app.js'),plugins:[{name:'next-harness',setup(b){
 b.onResolve({filter:/^next\/(link|navigation)$/},args=>({path:args.path,namespace:'harness'}))
 b.onLoad({filter:/.*/,namespace:'harness'},args=>({contents:args.path==='next/link'?"import React from 'react'; export default function Link({children,...props}){return React.createElement('a',props,children)}":"const router={push:(path)=>{window.location.href=path}};export function useRouter(){return router}",loader:'jsx',resolveDir:process.cwd()}))
}}]})
// Keep real SQL/auth modules shared with the synthetic fixture, and render the actual public page.
await build({entryPoints:['app/fellows/[slug]/page.tsx'],bundle:true,platform:'node',format:'cjs',packages:'external',jsx:'automatic',outfile:join(temp,'public.cjs'),plugins:[{name:'shared-sql',setup(b){b.onResolve({filter:/^@\/lib\/(fellows|fellow-auth)$/},args=>({path:resolve(args.path.replace('@/','')+'.ts'),external:true}))}}]})
const PublicPage=createRequire(import.meta.url)(join(temp,'public.cjs')).default
execFileSync('node_modules/.bin/tailwindcss',['-i','app/globals.css','-o',join(temp,'style.css'),'--content','app/fellows/me/page.tsx,app/fellows/[slug]/page.tsx,components/profile-links.tsx,components/ui/*.tsx'],{stdio:'pipe'})
const js=await readFile(join(temp,'app.js')),css=await readFile(join(temp,'style.css'))
let base=''
const shell=(content:string,script=false)=>'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/style.css"></head><body style="font-family:Arial,sans-serif"><aside style="padding:12px;background:#fff2c5;text-align:center">LOCAL SYNTHETIC TEST — Fictional account; no production connection</aside>'+content+(script?'<script src="/app.js"></script>':'')+'</body></html>'
const server=createServer(async(req,res)=>{
 try{
  if(req.url==='/app.js'){res.setHeader('Content-Type','application/javascript');res.end(js);return}
  if(req.url==='/style.css'){res.setHeader('Content-Type','text/css');res.end(css);return}
  if(req.url==='/api/fellows/me'){
   const chunks:Buffer[]=[];for await(const chunk of req)chunks.push(Buffer.from(chunk))
   const request=new NextRequest(base+req.url,{method:req.method,headers:req.headers as Record<string,string>,...(req.method==='PATCH'?{body:Buffer.concat(chunks)}:{})})
   const response=await(req.method==='PATCH'?PATCH(request):GET(request));res.writeHead(response.status,Object.fromEntries(response.headers));res.end(await response.text());return
  }
  if(req.url==='/api/fellows/me/projects'||req.url==='/api/fellows/reports'){res.setHeader('Content-Type','application/json');res.end('[]');return}
  if(req.url==='/fellows/synthetic-fellow'){
   res.setHeader('Content-Type','text/html');res.end(shell(renderToStaticMarkup(await PublicPage({params:Promise.resolve({slug:'synthetic-fellow'})}))));return
  }
  res.setHeader('Content-Type','text/html');res.end(shell('<main id="app"></main>',true))
 }catch(error){console.error(error);res.statusCode=500;res.end('Synthetic harness failure')}
})
await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve))
base='http://localhost:'+(server.address() as {port:number}).port
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'})
try{
 const context=await browser.newContext({viewport:{width:1280,height:900}})
 await context.addCookies([{name:'fellow_session',value:cookies.get(actors.fellow)!,url:base}])
 await context.route('**/*',route=>new URL(route.request().url()).origin===base?route.continue():route.abort())
 const page=await context.newPage();const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message))
 await page.goto(base+'/fellows/me')
 const values={'GitHub':'https://github.com/synthetic-fellow','LinkedIn':'https://www.linkedin.com/in/synthetic-fellow','Personal website':'https://example.org/about','YouTube channel':'https://www.youtube.com/@synthetic-fellow'}
 for(const [label,url] of Object.entries(values))await page.getByLabel(label+' (optional)',{exact:true}).fill(url)
 assert.equal(await page.locator('fieldset input').count(),4)
 assert.equal(await page.getByText('Add another link',{exact:true}).count(),0)
 await page.getByRole('button',{name:'Save Profile',exact:true}).click()
 await expect(page.getByRole('status')).toHaveText('Profile updated.')
 await page.reload()
 for(const [label,url] of Object.entries(values))await expect(page.getByLabel(label+' (optional)',{exact:true})).toHaveValue(url)
 await page.getByText('Profile links',{exact:true}).scrollIntoViewIfNeeded()
 await page.screenshot({path:out+'/01-edit-desktop.png',fullPage:true,animations:'disabled'})
 await page.getByLabel('GitHub (optional)',{exact:true}).fill('https://github.com.evil.example/synthetic')
 await page.getByRole('button',{name:'Save Profile',exact:true}).click()
 await expect(page.getByRole('alert')).toContainText('GitHub: use a github.com URL.')
 await page.reload();await expect(page.getByLabel('GitHub (optional)',{exact:true})).toHaveValue(values.GitHub)
 const publicPage=await context.newPage()
 await publicPage.goto(base+'/fellows/synthetic-fellow')
 for(const [label,url] of Object.entries(values)){
  const link=publicPage.getByRole('link',{name:label+' (opens in a new tab)',exact:true});await expect(link).toHaveAttribute('href',url);await expect(link).toHaveAttribute('rel','noopener noreferrer')
 }
 await publicPage.screenshot({path:out+'/02-public-desktop.png',fullPage:true,animations:'disabled'})
 await page.getByLabel('Personal website (optional)',{exact:true}).fill('')
 await page.getByRole('button',{name:'Save Profile',exact:true}).click();await expect(page.getByRole('status')).toHaveText('Profile updated.')
 await page.reload();await expect(page.getByLabel('Personal website (optional)',{exact:true})).toHaveValue('')
 await publicPage.reload();await expect(publicPage.getByRole('link',{name:'Personal website (opens in a new tab)',exact:true})).toHaveCount(0)
 await expect(publicPage.getByRole('link',{name:'GitHub (opens in a new tab)',exact:true})).toHaveCount(1)
 for(const p of [page,publicPage]){await p.setViewportSize({width:390,height:844});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth))}
 await page.screenshot({path:out+'/03-edit-mobile.png',fullPage:true,animations:'disabled'})
 await publicPage.screenshot({path:out+'/04-public-mobile.png',fullPage:true,animations:'disabled'})
 assert.deepEqual(errors,[])
 console.log('PASS: four optional fields; actual API + synthetic SQL save/reload/clear; invalid URL rejected; actual public page SSR; desktop/mobile no overflow; no custom links, external requests, or React errors. Next routing harnessed; projects/reports lists stubbed empty.')
}finally{await browser.close();await new Promise<void>(resolve=>server.close(()=>resolve()));await db.close();await rm(temp,{recursive:true,force:true})}
