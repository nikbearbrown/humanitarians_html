import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { contentHtml } from '../../lib/content-html';
test('server sanitizer loads when the host cannot require ESM dependencies', () => {
 const result = spawnSync(process.execPath, ['--no-experimental-require-module', '-e',
  `const { JSDOM } = require('jsdom'); const purify = require('dompurify')(new JSDOM('').window); if (purify.sanitize('<p>ok</p><script>bad()</script>') !== '<p>ok</p>') process.exit(1);`
 ], { encoding: 'utf8' });
 assert.equal(result.status, 0, result.stderr);
});
test('published HTML cannot execute inline scripts, handlers, forms, srcdoc or javascript URLs', () => {
 const clean = contentHtml(`<p>Hello <strong>world</strong></p><script>fetch('/api/admin/fellows')</script><img src=x onerror="fetch('/api/admin/fellows')"><a href="javascript:alert(1)">bad</a><form action="/api/admin/login"><input name=password></form><iframe srcdoc="<script>alert(1)</script>"></iframe>`);
 assert.match(clean, /<strong>world<\/strong>/);
 for (const bad of ['<script','onerror','javascript:','<form','<input','srcdoc']) assert.ok(!clean.includes(bad), bad);
});
test('external embeds keep content but cannot acquire site origin; relative/protocol-relative embeds removed', () => {
 const clean = contentHtml('<iframe src="https://www.youtube.com/embed/demo" sandbox="allow-same-origin allow-scripts"></iframe><iframe src="/admin/dashboard"></iframe><iframe src="//example.org"></iframe>');
 assert.match(clean, /https:\/\/www.youtube.com\/embed\/demo/);
 assert.match(clean,/sandbox="allow-scripts allow-forms allow-popups"/);
 assert.ok(!clean.includes('allow-same-origin'));assert.ok(!clean.includes('/admin/dashboard'));assert.ok(!clean.includes('//example.org'));
});
test('known visualisation placeholders and normal links survive sanitization', () => {
 const clean = contentHtml('<div data-viz="ai-adoption-bars"></div><h2>Title</h2><a href="https://example.org" target="_blank">Link</a>');
 assert.match(clean,/data-viz="ai-adoption-bars"/);assert.match(clean, /<h2>Title<\/h2>/);assert.match(clean,/noopener noreferrer/);
});
