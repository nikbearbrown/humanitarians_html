'use client';
// components/LedgerWidget.tsx
//
// Renders the Project Ledger tool. The markup+CSS below is injected via
// dangerouslySetInnerHTML rather than hand-converted to JSX, deliberately --
// this widget was already built and tested as a working prototype, and
// retyping 189 lines of markup by hand is exactly the kind of transcription
// step that introduces silent bugs. The interactive logic lives as a plain
// script at /public/scripts/ledger.js and is attached on mount below.
// Data comes from /api/ledger (lib/ledger.ts); the page is app/ledger/page.tsx.

import { useEffect, useRef } from 'react';

const MARKUP = `<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,75..125,400..700;1,75..125,400..700&display=swap" rel="stylesheet">

<style>
  .hai * { box-sizing: border-box; }
  .hai {
    --ink: #17242B;
    --paper: #EFF1EC;
    --rule: #CBD1C6;
    --sea: #2F6F63;
    --amber: #A96A16;
    --slate: #5E6C6F;
    --card: #FFFFFF;
    --card-shadow: rgba(23, 36, 43, 0.08);
    --overlay: rgba(23, 36, 43, 0.45);
    --pmrow-bg: #EAF1EE;
    --pmitem-bg: #F4F8F6;
    --pmitem-rule: #DCE7E2;
    --addform-bg: #F3F8F6;
    --primary-hover: #255A50;
    font-family: 'Archivo', 'Helvetica Neue', Arial, sans-serif;
    font-variation-settings: 'wdth' 100;
    letter-spacing: 0.012em;
    word-spacing: 0.04em;
    color: var(--ink); background: var(--paper);
    max-width: 1440px; margin: 0 auto; padding: 28px 32px 40px; line-height: 1.5;
  }
  /* Dark theme -- follows the site's theme toggle (next-themes puts the
     "dark" class on <html>). Keeps the tool's own teal/amber accents, just
     inverted for a dark surface. */
  .dark .hai {
    --ink: #E8EDEA; --paper: #10161A; --rule: #32423E; --sea: #59BCA6; --amber: #E3A75B; --slate: #93A6A1;
    --card: #182123; --card-shadow: rgba(0, 0, 0, 0.5); --overlay: rgba(0, 0, 0, 0.6);
    --pmrow-bg: #1A2C28; --pmitem-bg: #151F1E; --pmitem-rule: #2A3B37; --addform-bg: #14211D; --primary-hover: #74CAB5;
  }
  .hai h1 { font-size: 26px; font-weight: 600; letter-spacing: 0.005em; margin: 0 0 5px; }
  .hai .sub { margin: 0; color: var(--slate); font-size: 14px; max-width: 58ch; }
  .hai .topbar { display: flex; flex-wrap: wrap; gap: 14px; align-items: flex-end; justify-content: space-between; padding-bottom: 16px; border-bottom: 2px solid var(--ink); }
  .hai .whoami { font-size: 13px; color: var(--slate); }
  .hai .whoami input { width: 210px; margin-left: 6px; }
  .hai input[readonly], .hai textarea[readonly] { background: transparent; color: var(--slate); }
  .hai .viewonly { margin: 0 0 12px; padding: 8px 12px; border-radius: 4px; background: var(--pmrow-bg); color: var(--slate); font-size: 13px; }
  .hai select, .hai input, .hai textarea {
    font-family: inherit; font-size: 13px; color: var(--ink);
    letter-spacing: 0.012em; word-spacing: 0.04em;
    background: var(--card); border: 1px solid var(--rule); border-radius: 2px; padding: 5px 8px;
  }
  .hai textarea { width: 100%; resize: vertical; min-height: 52px; line-height: 1.5; }
  .hai select:focus-visible, .hai input:focus-visible, .hai textarea:focus-visible,
  .hai button:focus-visible, .hai .row-head:focus-visible { outline: 2px solid var(--sea); outline-offset: 1px; }

  .hai .deadline { font-size: 13px; color: var(--slate); margin: 18px 0 0; }
  .hai .deadline b { color: var(--ink); font-weight: 600; }
  .hai .deadline.past b { color: var(--amber); }

  .hai .attention { margin: 8px 0 22px; border-left: 5px solid var(--amber); padding: 2px 0 2px 16px; }
  .hai .attention.clear { border-left-color: var(--sea); }
  .hai .attention p { margin: 0 0 3px; font-size: 19px; font-weight: 500; letter-spacing: 0.005em; }
  .hai .attention ul { margin: 8px 0 0; padding: 0; list-style: none; }
  .hai .attention li { font-size: 14px; color: var(--slate); margin-bottom: 4px; }
  .hai .attention li b { color: var(--ink); font-weight: 600; }

  .hai .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 6px; }
  .hai button {
    font-family: inherit; font-size: 13px; letter-spacing: 0.02em; word-spacing: 0.04em;
    cursor: pointer; background: transparent; color: var(--ink);
    border: 1px solid var(--rule); border-radius: 2px; padding: 5px 11px;
  }
  .hai button:hover { border-color: var(--ink); }
  .hai button.on { background: var(--ink); color: var(--paper); border-color: var(--ink); }
  .hai button.primary { background: var(--sea); color: var(--paper); border-color: var(--sea); }
  .hai button.primary:hover { background: var(--primary-hover); }
  .hai button.tiny { font-size: 12px; padding: 3px 8px; }
  .hai .spacer { flex: 1; }
  .hai .ghost { color: var(--slate); border-color: transparent; }
  .hai .ghost:hover { color: var(--amber); border-color: var(--rule); }

  .hai .panel { border: 2px solid var(--ink); border-radius: 2px; background: var(--card); padding: 16px 16px 14px; margin: 0 0 22px; }
  .hai .panel h2 { font-size: 17px; font-weight: 600; letter-spacing: 0.005em; margin: 0 0 4px; }
  .hai .panel .hint { font-size: 13px; color: var(--slate); margin: 0 0 14px; max-width: 70ch; }
  .hai .panel .foot { display: flex; gap: 10px; align-items: center; margin-top: 16px; }
  .hai .panel .tally { font-size: 13px; color: var(--slate); }
  .hai .digest { width: 100%; min-height: 320px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; line-height: 1.55; letter-spacing: 0; }

  .hai .rblock { border-top: 1px solid var(--rule); padding: 14px 0 16px; }
  .hai .rtop { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 9px; }
  .hai .rtop .rname { font-size: 15px; font-weight: 600; letter-spacing: 0.005em; }
  .hai .rtop .rname small { display: block; font-weight: 400; color: var(--slate); font-size: 12px; letter-spacing: 0.012em; }
  .hai .rtop input.hrs { width: 84px; }
  .hai .rstack { display: flex; flex-direction: column; gap: 7px; margin-bottom: 11px; }
  .hai .subhead { font-size: 12px; font-weight: 600; color: var(--slate); letter-spacing: 0.03em; margin: 0 0 5px; }

  .hai .mrow { border-top: 1px solid var(--rule); padding: 13px 0; }
  .hai .mrow .mhead { display: flex; flex-wrap: wrap; gap: 10px; align-items: baseline; }
  .hai .mrow .mname { font-size: 15px; font-weight: 600; letter-spacing: 0.005em; }
  .hai .mrow .mmeta { font-size: 13px; color: var(--slate); }
  .hai .mrow .mmeta.flag { color: var(--amber); }
  .hai .mrow .mbody { font-size: 14px; margin-top: 5px; }
  .hai .mrow .mbody .lbl { color: var(--slate); }
  .hai .mrow ul.mteam { list-style: none; margin: 7px 0 0; padding: 0; }
  .hai .mrow ul.mteam li { font-size: 13.5px; color: var(--ink); padding: 3px 0 3px 13px; border-left: 2px solid var(--rule); }
  .hai .mrow ul.mteam li span { color: var(--slate); }

  .hai ol.ledger {
    list-style: none; margin: 0; padding: 0;
    display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px;
  }
  .hai li.item {
    border: 1px solid var(--rule); border-radius: 4px; background: var(--card);
    transition: border-color .15s, box-shadow .15s;
  }
  .hai li.item:hover { border-color: var(--sea); box-shadow: 0 1px 6px var(--card-shadow); }
  .hai .row-head {
    display: flex; flex-direction: column; gap: 9px; width: 100%; height: 100%; text-align: left;
    padding: 14px 15px; border: none; background: none; cursor: pointer;
    font-family: inherit; letter-spacing: 0.012em; word-spacing: 0.04em;
  }
  .hai .row-head:hover .pname { color: var(--sea); }
  .hai .chead { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
  .hai .pname { font-size: 16px; font-weight: 600; letter-spacing: 0.005em; }
  .hai .strands { font-size: 12px; color: var(--slate); margin-top: -5px; }
  .hai .pnext { font-size: 13px; color: var(--slate); line-height: 1.4; }
  .hai .pnext.none { font-style: italic; }
  .hai .cfoot { display: flex; flex-direction: column; gap: 6px; margin-top: auto; padding-top: 5px; }
  .hai .pmcell { font-size: 13px; color: var(--slate); }
  .hai .pmcell.none { color: var(--amber); }
  .hai .phase {
    font-size: 11px; font-weight: 600; color: var(--slate); letter-spacing: 0.03em;
    white-space: nowrap; padding: 2px 8px; border: 1px solid var(--rule); border-radius: 20px;
  }
  .hai .phase.active { color: var(--sea); border-color: var(--sea); }
  .hai .phase.blocked { color: var(--amber); border-color: var(--amber); }

  .hai .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(155px, 1fr)); gap: 13px; margin-bottom: 18px; }
  .hai .field { display: flex; flex-direction: column; gap: 4px; }
  .hai .field span { font-size: 12px; color: var(--slate); }
  .hai .block { margin-bottom: 18px; }
  .hai .block > h3 { font-size: 13px; font-weight: 600; color: var(--slate); letter-spacing: 0.03em; margin: 0 0 8px; }
  .hai .wide { width: 100%; }

  .hai table.team, .hai table.hours { width: 100%; border-collapse: collapse; }
  .hai table.team td, .hai table.team th,
  .hai table.hours td, .hai table.hours th {
    padding: 7px 10px 7px 0; border-top: 1px solid var(--rule);
    vertical-align: top; font-size: 14px; text-align: left;
  }
  .hai table.team th, .hai table.hours th { border-top: none; font-size: 12px; font-weight: 600; color: var(--slate); letter-spacing: 0.03em; }
  .hai table.hours .h { width: 84px; }
  .hai table.hours .w { width: 128px; color: var(--slate); font-size: 13px; }
  .hai table.team .who { width: 152px; }
  .hai table.team .added { width: 168px; color: var(--slate); font-size: 13px; }
  .hai table.team .hrs { width: 74px; }
  .hai table.team .who input, .hai table.team .doing input, .hai table.team .hrs input { width: 100%; }
  .hai table.team .act { width: 34px; text-align: right; }
  .hai table.team .nm { font-weight: 600; }
  .hai table.log .who { width: 210px; }
  .hai table.log textarea { min-height: 44px; }
  .hai table.log .doing input, .hai table.log .doing textarea { width: 100%; }
  .hai .pmname { font-weight: 600; font-size: 14px; }
  .hai table.team tr.pmrow td { background: var(--pmrow-bg); border-top: 2px solid var(--sea); }
  .hai table.team tr.pmrow td:first-child { padding-left: 10px; }
  .hai table.team tr.pmrow td:last-child { padding-right: 10px; }
  .hai table.team tr.vsub td { border-top: none; padding: 12px 0 2px 14px; font-size: 12px; font-weight: 600; color: var(--slate); letter-spacing: 0.03em; }
  .hai table.team tr.vsub td.none { font-weight: 400; font-style: italic; padding-bottom: 10px; }
  .hai table.team tr.vrow td.who { border-left: 3px solid var(--sea); padding-left: 14px; }
  .hai .vname { font-weight: 600; font-size: 14px; border-color: transparent; background: transparent; }
  .hai .vname:hover { border-color: var(--rule); background: var(--card); }
  .hai .vmeta { display: flex; flex-wrap: wrap; align-items: center; gap: 0 8px; margin: 2px 0 0 9px; }
  .hai .vadded { font-size: 12px; color: var(--slate); }
  .hai button.linkbtn { border-color: transparent; color: var(--sea); font-size: 12px; padding: 0; }
  .hai button.linkbtn:hover { border-color: transparent; text-decoration: underline; }
  .hai table.team tr.pmhead td { background: var(--pmrow-bg); border-top: 2px solid var(--sea); padding: 8px 10px; }
  .hai .pmbar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: space-between; }
  .hai .pmacts { display: flex; gap: 8px; align-items: center; }
  .hai .pmwho .upd { margin-top: 2px; }
  .hai .pmacts button.primary { padding: 3px 12px; }
  .hai .rec-sub { padding: 2px 0 6px 10px; margin: 2px 0 4px; border-left: 2px solid var(--rule); }
  .hai table.team tr.pmitem td { background: var(--pmitem-bg); border-top: 1px solid var(--pmitem-rule); }
  .hai table.team tr.pmitem td:first-child { padding-left: 10px; }
  .hai table.team tr.pmitem td:last-child { padding-right: 10px; }
  .hai .wlabel { font-size: 12px; color: var(--slate); }
  .hai table.team.log .act { width: 122px; }
  .hai .vacts { display: flex; gap: 6px; align-items: center; justify-content: flex-end; }
  .hai .vacts button.primary { padding: 4px 12px; }
  .hai .upd { display: block; margin-top: 4px; font-size: 12px; color: var(--slate); }
  .hai .upd.ok { color: var(--sea); font-weight: 600; }
  .hai .upd.err { color: var(--amber); font-weight: 600; }
  .hai .addvol { margin: 18px 0 4px; }
  .hai .addvol > button.primary { font-size: 14px; padding: 8px 18px; font-weight: 600; }
  .hai .addform { margin-top: 12px; border: 2px solid var(--sea); background: var(--addform-bg); border-radius: 3px; padding: 14px 16px 16px; }
  .hai .addform h4 { margin: 0 0 12px; font-size: 15px; font-weight: 600; }
  .hai .addform h4 .muted, .hai .rec-when.muted { font-weight: 400; color: var(--slate); }
  .hai .addgrid { display: grid; grid-template-columns: 1.2fr 1.6fr 1.4fr 96px; gap: 12px; margin-bottom: 14px; }
  .hai .addacts { display: flex; gap: 10px; align-items: center; }
  .hai .rec-when { font-size: 12px; font-weight: 600; color: var(--ink); margin-bottom: 3px; }
  .hai .already { font-size: 13px; color: var(--slate); }
  .hai .already b { color: var(--ink); font-weight: 600; }
  .hai .rec { border: 1px solid var(--rule); border-radius: 3px; background: var(--card); padding: 12px 16px 6px; margin: 0 0 12px; }
  .hai .rec-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; margin-bottom: 6px; }
  .hai .rec-range { font-size: 13px; color: var(--slate); flex: 1; }
  .hai .rec-hrs { font-size: 13px; font-weight: 600; }
  .hai .rec-item { padding: 6px 0 8px 12px; border-left: 2px solid var(--rule); margin-bottom: 6px; }
  .hai .rec-task { font-size: 14px; }
  .hai .rec-meta { font-size: 12px; color: var(--slate); margin-top: 2px; }
  .hai .chip { font-size: 11px; font-weight: 600; color: var(--sea); border: 1px solid var(--sea); border-radius: 20px; padding: 0 8px; }
  .hai .pager { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; margin: 16px 0 6px; }
  .hai .pager-info { font-size: 13px; color: var(--slate); }
  .hai .pager-btns { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
  .hai .pager-btns .gap { color: var(--slate); }
  .hai .field.wide2 { grid-column: span 2; }
  .hai details.more { margin: 0 0 20px; border: 1px solid var(--rule); border-radius: 3px; padding: 0 14px; background: var(--card); }
  .hai details.more summary { cursor: pointer; font-size: 13px; color: var(--slate); padding: 9px 0; }
  .hai details.more[open] summary { border-bottom: 1px solid var(--rule); margin-bottom: 14px; }
  .hai .wkbar { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; margin: 0 0 6px; }
  .hai .wkbar h3 { margin: 0; font-size: 15px; font-weight: 600; color: var(--ink); letter-spacing: 0.005em; }
  .hai .wkpick { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--slate); }
  .hai .wkpick select { font-weight: 600; }
  .hai .wkpanel[hidden] { display: none; }
  .hai .addhead { margin-top: 18px; }
  .hai .hfilters { display: flex; flex-wrap: wrap; gap: 14px; align-items: flex-end; margin: 0 0 18px; }
  .hai .hfilters label { display: flex; flex-direction: column; gap: 3px; font-size: 12px; color: var(--slate); }
  .hai .hweek h3 { color: var(--ink); }
  .hai .modal-box.detail-box .hint { font-size: 13px; color: var(--slate); margin-top: 0; margin-bottom: 16px; }
  .hai .modal-box.detail-box.wide > * { max-width: 1100px; }
  .hai .modal-box.detail-box .foot.savebar {
    position: sticky; bottom: -60px; z-index: 5; display: flex; gap: 10px; align-items: center;
    margin-top: 22px; padding: 12px 0 14px; background: var(--card); border-top: 1px solid var(--rule);
  }
  .hai .hweek .mbody { font-size: 14px; margin-top: 8px; }
  .hai .hweek .mbody .lbl { color: var(--slate); }
  .hai .tag { font-size: 10px; font-weight: 600; color: var(--sea); border: 1px solid var(--sea); border-radius: 20px; padding: 0 6px; letter-spacing: 0.03em; vertical-align: 1px; }
  .hai .addrow { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px; }
  .hai .addrow input.n { width: 152px; }
  .hai .addrow input.t { flex: 1; min-width: 180px; }
  .hai .addrow input.hrs { width: 84px; }

  .hai .notes { margin: 0 0 12px; padding: 0; list-style: none; }
  .hai .notes li { display: flex; gap: 10px; align-items: flex-start; justify-content: space-between; font-size: 14px; padding: 8px 0 8px 14px; border-left: 2px solid var(--rule); margin-bottom: 3px; }
  .hai .notes .ntext { flex: 1; min-width: 0; }
  .hai .notes .meta { display: block; font-size: 12px; color: var(--slate); }
  .hai .empty { font-size: 13px; color: var(--slate); font-style: italic; margin: 0 0 10px; }
  .hai .post { display: flex; gap: 9px; align-items: flex-start; }
  .hai .post textarea { flex: 1; }

  .hai .detail-status { font-size: 13px; color: var(--slate); }
  .hai .detail-status.err { color: var(--amber); font-weight: 600; }
  .hai button:disabled { opacity: 0.55; cursor: default; }
  .hai button:disabled:hover { border-color: var(--rule); }
  .hai .hint-inline { font-size: 12px; color: var(--slate); margin: 9px 0 0; font-style: italic; }

  .hai .unsaved { display: none; font-size: 13px; color: var(--amber); font-weight: 600; }
  .hai .unsaved.show { display: inline; }

  .hai footer { margin-top: 26px; display: flex; gap: 12px; align-items: center; }
  .hai .status { font-size: 12px; color: var(--slate); min-height: 16px; }
  .hai .status.err { color: var(--amber); }

  .hai .modal-overlay {
    position: fixed; inset: 0; background: var(--overlay);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; z-index: 100;
  }
  .hai .modal-box {
    background: var(--card); border: 2px solid var(--ink); border-radius: 3px;
    padding: 22px 24px 20px; width: 100%; max-width: 380px;
  }
  .hai .modal-box h3 { font-size: 15px; font-weight: 600; margin: 0 0 12px; letter-spacing: 0.005em; }
  .hai .modal-box:not(.detail-box) input { width: 100%; font-size: 14px; padding: 8px 10px; margin-bottom: 16px; }
  .hai .modal-box .modal-msg { font-size: 14px; color: var(--ink); line-height: 1.5; margin: 0 0 18px; }
  .hai .modal-box .modal-actions { display: flex; justify-content: flex-end; gap: 8px; }

  .hai .modal-overlay[data-detail-overlay] { padding: 0; align-items: stretch; justify-content: stretch; }
  .hai .modal-box.detail-box {
    max-width: none; max-height: none; width: 100%; height: 100%;
    border: none; border-radius: 0; overflow-y: auto; text-align: left;
    padding: 24px clamp(20px, 6vw, 72px) 60px;
  }
  .hai .modal-box.detail-box > * { max-width: 820px; margin-left: auto; margin-right: auto; }
  .hai .modal-box.detail-box .detail-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 20px; }
  .hai .modal-box.detail-box .detail-head h3 { font-size: 22px; margin: 0; }
  .hai .modal-box.detail-box .detail-head button.tiny {
    font-size: 13px; padding: 6px 12px; white-space: nowrap;
    border-color: var(--rule); color: var(--slate);
  }
  .hai .modal-box.detail-box .detail-head button.tiny:hover { color: var(--ink); border-color: var(--ink); }

  @media (max-width: 760px) {
    .hai table.team td, .hai table.team th { display: block; border-top: none; padding: 2px 0; }
    .hai table.team thead { display: none; }
    .hai table.team tr { display: block; border-top: 1px solid var(--rule); padding: 9px 0; }
    .hai table.team .who, .hai table.team .added, .hai table.team .hrs, .hai table.team .act,
    .hai table.log .who { width: auto; }
    .hai .field.wide2 { grid-column: auto; }
    .hai .addgrid { grid-template-columns: 1fr; }
  }
</style>

<div class="hai">
  <div class="topbar">
    <div>
      <h1>Humanitarians AI project ledger</h1>
      <p class="sub">PMs file their project and every volunteer by Friday. OPS reads it before the weekly meeting.</p>
    </div>
    <label class="whoami">Signed in as
      <input id="me" readonly>
    </label>
  </div>

  <p class="deadline" id="deadline"></p>
  <div id="attention" class="attention clear"><p>Loading the ledger&hellip;</p></div>

  <div id="slot"></div>

  <div class="controls">
    <button data-filter="all" class="on">All projects</button>
    <button data-filter="attention">Needs attention</button>
    <button data-filter="mine">I am PM</button>
    <span class="spacer"></span>
    <button id="meeting">Meeting view</button>
    <button id="history">History</button>
    <button id="review" class="primary">File my week</button>
    <button id="export">Export week (CSV)</button>
  </div>

  <ol class="ledger" id="list"></ol>

  <footer>
    <span class="status" id="status"></span>
  </footer>
</div>

`;

export default function LedgerWidget() {
  const attached = useRef(false);

  useEffect(() => {
    if (attached.current) return;
    attached.current = true;
    const script = document.createElement('script');
    script.src = '/scripts/ledger.js';
    script.async = true;
    document.body.appendChild(script);
    // Deliberately no cleanup: removing the tag in React's dev-mode double
    // effect could pull the script before it finished loading, leaving the
    // markup above inert. ledger.js refuses to boot twice on its own.
    return undefined;
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
