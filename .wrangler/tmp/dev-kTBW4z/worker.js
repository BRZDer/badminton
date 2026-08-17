var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
var SEED_SIGNUPS = { "2026-08-22": [{ "id": "b170e7bc-47bf-4fa3-9035-455ca389084a", "name": "\u7C73\u9769\u529B", "at": 1786865205920, "pos": 1 }, { "id": "51297712-d326-4484-9451-ba35fde053c1", "name": "\u6728\u6BCF\u5973\u81E3", "at": 1786865212036, "pos": 2 }, { "id": "f3e2f04e-d39c-46a5-8070-c32c99e7a5a2", "name": "\u5973\u795E", "at": 1786865218495, "pos": 3 }, { "id": "459633b1-9d92-48cd-a4d7-8e661ff81d9b", "name": "\u4FEE\u9298", "at": 1786897823875, "pos": 4 }, { "id": "9dde4718-d5fe-4618-9b90-94ddb721ce4c", "name": "\u963F\u6E90", "at": 1786897824782, "pos": 5 }] };
var SEED_ROSTER = ["\u7C73\u9769\u529B", "\u6728\u6BCF\u5973\u81E3", "\u5973\u795E", "\u4EBB\uFF5C\u38CA\u91D1\u540D", "\u961D\u53EF\u6C35\u539F"];
var HTML = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>\u6DE1\u6C34\u4E73\u9178\u5806\u8D77\uFF5C\u9031\u516D\u7FBD\u7403\u5831\u540D</title>
<meta property="og:title" content="\u6DE1\u6C34\u4E73\u9178\u5806\u8D77\uFF5C\u9031\u516D\u7FBD\u7403\u5831\u540D">
<meta property="og:description" content="\u6BCF\u9031\u516D 16:00\u201318:00 \u6DE1\u6C34\u570B\u6C11\u904B\u52D5\u4E2D\u5FC3\uFF0C\u9EDE\u540D\u5B57\u4E0A\u5834\uFF01">
<meta name="theme-color" content="#0c352a">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>\u{1F3F8}</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Chocolate+Classical+Sans&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
/* === DESIGN TOKENS\uFF1A\u6DF1\u58A8\u7DA0\u7403\u5834 \xD7 \u7C73\u767D\u5834\u7DDA \xD7 \u87A2\u5149\u7FBD\u7403\u9EC3 === */
:root{
  --court:#0c352a;          /* \u9801\u9762\u5E95\uFF1A\u6DF1\u58A8\u7DA0 */
  --court-mat:#155941;      /* \u7403\u5834\u5730\u81A0\u7DA0 */
  --court-mat-2:#1b6a4e;
  --line:#efe9d8;           /* \u5834\u7DDA\u7C73\u767D */
  --ink:#f4f1e6;            /* \u4E3B\u6587\u5B57 */
  --dim:#9db8ab;            /* \u6B21\u8981\u6587\u5B57 */
  --lime:#d9ff3e;           /* \u87A2\u5149\u9EC3\uFF1ACTA / \u5F37\u8ABF */
  --coral:#ff6a4d;          /* \u73CA\u745A\u7D05\uFF1A\u8B66\u793A / \u5718\u9577\u63D0\u9192 */
  --chip:#f4f1e6;
  --chip-ink:#0c352a;
  --font-display:"Chocolate Classical Sans","Noto Sans TC",sans-serif;
  --font-num:"Anton","Noto Sans TC",sans-serif;
  --font-body:"Noto Sans TC",sans-serif;
}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html{scroll-behavior:smooth}
body{
  font-family:var(--font-body);
  background:
    radial-gradient(1200px 600px at 50% -200px, #17553f 0%, transparent 60%),
    repeating-linear-gradient(0deg, transparent 0 46px, rgba(239,233,216,.035) 46px 48px),
    var(--court);
  color:var(--ink);
  min-height:100dvh;
  padding-bottom:calc(96px + env(safe-area-inset-bottom));
}
.wrap{max-width:520px;margin:0 auto;padding:0 16px}

/* === \u9032\u5834\u52D5\u756B\uFF1A\u6574\u9801\u4E00\u6B21\u6027 stagger === */
@keyframes rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.rise{opacity:0;animation:rise .6s cubic-bezier(.2,.7,.2,1) forwards}
@media (prefers-reduced-motion: reduce){
  .rise{animation:none;opacity:1}
  *{animation-duration:.01ms !important;transition-duration:.01ms !important}
}

/* === \u6D77\u5831\u982D === */
header{padding:26px 0 10px;position:relative}
.team-row{display:flex;align-items:center;justify-content:space-between;gap:8px}
.team-badge{
  display:inline-block;font-family:var(--font-display);font-size:15px;letter-spacing:.35em;
  color:var(--court);background:var(--lime);padding:5px 10px 5px 13px;border-radius:3px;
  box-shadow:3px 3px 0 rgba(0,0,0,.35);
}
.btn-ghost{
  background:transparent;border:1px solid rgba(239,233,216,.35);color:var(--ink);
  font-family:var(--font-body);font-size:12px;padding:7px 12px;border-radius:99px;cursor:pointer;
}
.btn-ghost:active{background:rgba(239,233,216,.12)}
h1{
  font-family:var(--font-display);font-weight:400;
  font-size:clamp(44px,13vw,64px);line-height:1.08;margin-top:16px;
  text-shadow:0 2px 0 rgba(0,0,0,.25);
}
h1 .accent{color:var(--lime)}
.date-block{display:flex;align-items:flex-end;gap:14px;margin-top:14px;flex-wrap:wrap}
.date-num{font-family:var(--font-num);font-size:clamp(56px,17vw,84px);line-height:.9;letter-spacing:.02em;color:var(--line)}
/* \u6392\u7248\u8207\u539F\u7248\u5B8C\u5168\u76F8\u540C\uFF0C\u53EA\u7528 translateY \u5E73\u79FB\u6574\u584A\u505A\u5E95\u90E8\u5207\u9F4A\uFF08\u6821\u6E96\u503C\u7531\u50CF\u7D20\u91CF\u6E2C\u800C\u4F86\uFF09 */
.date-meta{padding-bottom:6px;transform:translateY(12px)}
.date-meta .weekday{font-family:var(--font-display);font-size:20px;color:var(--lime);letter-spacing:.2em}
.date-meta .time{font-family:var(--font-num);font-size:20px;letter-spacing:.05em;color:var(--ink)}
.venue{margin-top:10px;font-size:14px;color:var(--dim);letter-spacing:.08em}
.venue b{color:var(--ink);font-weight:500}
.status-row{display:flex;gap:8px;margin-top:14px;align-items:center;flex-wrap:wrap}
.pill{font-size:12px;padding:5px 12px;border-radius:99px;letter-spacing:.15em;font-weight:700}
.pill.open{background:var(--lime);color:var(--court)}
.pill.live{background:var(--coral);color:#fff}
.pill.closed{background:rgba(239,233,216,.2);color:var(--ink)}
.countdown{font-size:12px;color:var(--dim);letter-spacing:.05em}
/* \u4E09\u9031\u5207\u63DB\u9801\u7C64 */
.week-tabs{display:flex;gap:8px;margin-top:14px}
.week-tab{
  flex:1;border:1.5px solid rgba(239,233,216,.3);border-radius:11px;background:rgba(0,0,0,.2);
  color:var(--dim);font-family:var(--font-body);font-size:12px;padding:8px 4px;cursor:pointer;
  text-align:center;line-height:1.5;letter-spacing:.05em;
}
.week-tab .d{font-family:var(--font-num);font-size:15px;letter-spacing:.06em;display:block;color:var(--ink)}
.week-tab .c{font-size:11px}
.week-tab.on{background:var(--lime);border-color:var(--lime);color:var(--court)}
.week-tab.on .d,.week-tab.on .c{color:var(--court)}
.week-tab{position:relative}
.week-tab .edit{
  position:absolute;top:0;right:0;font-size:12px;opacity:.55;line-height:1;
  padding:6px 8px 10px 12px;cursor:pointer;overflow:hidden;
}
.week-tab.on .edit{opacity:.8}
/* \u900F\u660E\u7684\u539F\u751F\u65E5\u671F\u6B04\u4F4D\u758A\u5728 \u270E \u4E0A\uFF1A\u624B\u6A5F\u9EDE\u5230\u7684\u5C31\u662F\u771F\u8F38\u5165\u6846\uFF0C\u539F\u751F\u9078\u55AE\u5FC5\u5F48 */
.week-tab .edit input.tabdate{
  position:absolute;inset:0;opacity:0;border:0;padding:0;margin:0;
  width:100%;height:100%;cursor:pointer;-webkit-appearance:none;
}

/* === \u7403\u5834\uFF08SVG \u756B\u7DDA + \u540D\u5B57\u4E0A\u5834\uFF09 === */
.court-sec{margin-top:22px;position:relative}
.court-card{position:relative;border-radius:14px;overflow:hidden;
  background:linear-gradient(160deg,var(--court-mat-2),var(--court-mat) 55%);
  box-shadow:0 18px 44px -18px rgba(0,0,0,.6), inset 0 0 0 1px rgba(239,233,216,.08);
}
.court-svg{display:block;width:100%;height:auto}
.court-svg line,.court-svg rect{stroke:var(--line);stroke-width:4;fill:none;opacity:.9}
.court-svg .net{stroke-dasharray:14 10;stroke-width:5;opacity:.55}
/* \u5834\u7DDA\u7E6A\u88FD\u52D5\u756B\uFF1ApathLength \u7D71\u4E00\u70BA 100\uFF0C\u4EFB\u4F55\u9577\u5EA6\u7684\u7DDA\u90FD\u80FD\u756B\u6EFF */
.court-svg .draw{stroke-dasharray:100.5;stroke-dashoffset:100.5;animation:draw 1.4s .3s ease forwards}
@keyframes draw{to{stroke-dashoffset:0}}
.court-label{
  position:absolute;top:8px;left:16px;font-family:var(--font-num);font-size:15px;
  letter-spacing:.2em;color:var(--line);opacity:.95;display:flex;align-items:center;gap:6px;
}
.court-label select{
  appearance:none;-webkit-appearance:none;border:1.5px solid var(--lime);border-radius:6px;
  background:rgba(0,0,0,.25);color:var(--lime);font-family:var(--font-num);font-size:15px;
  padding:1px 17px 1px 8px;cursor:pointer;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23d9ff3e' stroke-width='2' fill='none'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 5px center;
}
.court-count{
  position:absolute;top:6px;right:16px;font-family:var(--font-num);font-size:24px;color:var(--lime);
  white-space:nowrap;
}
.court-count small{font-size:13px;color:var(--line);opacity:.75}
/* 8 \u500B\u7AD9\u4F4D\uFF1A\u76F4\u63A5\u4EE5\u5834\u7DDA\u5207\u683C\uFF08\u6B04\uFF1D\u55AE\u6253\u7DDA\u5230\u4E2D\u7DDA\uFF1B\u5217\uFF1D\u76F8\u9130\u5169\u689D\u6A6B\u7DDA\u4E4B\u9593\u7684\u5E36\uFF09
   \u6A6B\u7DDA y\uFF1A102 / 224 / 381(\u7DB2) / 538 / 660 \u2192 \u5217\u9AD8 122:157:157:122
   padding % \u4EE5\u5BEC\u5EA6\u70BA\u57FA\u6E96\uFF1Atop 102/610\u3001\u5DE6\u53F3 76/610\u3001bottom 60/610
   \u5BB9\u5668\u4E0D\u5403\u9EDE\u64CA\uFF08\u5426\u5247\u6703\u64CB\u4F4F COURT \u4E0B\u62C9\uFF09\uFF0C\u540D\u724C\u81EA\u5DF1\u958B\u56DE\u4F86 */
.slots{
  position:absolute;inset:0;display:grid;
  grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,1fr);
  padding:15.08% 12.46% 8.20%;gap:0;
  align-items:center;justify-items:center;
  pointer-events:none;
}
.slots .slot{pointer-events:auto}
.unlock-overlay{pointer-events:none}
.slot{
  width:86%;max-width:170px;height:70%;min-height:44px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  font-size:15px;font-weight:700;letter-spacing:.05em;text-align:center;
  transition:transform .15s;position:relative;padding:4px 8px;
}
.slot.empty{
  border:2px dashed rgba(239,233,216,.4);color:rgba(239,233,216,.5);
  font-family:var(--font-num);font-size:14px;font-weight:400;
}
/* \u9078\u597D\u540D\u5B57\u5F8C\uFF1A\u7A7A\u4F4D\u9032\u5165\u53EF\u9EDE\u72C0\u614B */
.slot.empty.pick{
  border-color:var(--lime);color:var(--lime);cursor:pointer;
  animation:pulsePick 1.1s ease-in-out infinite;
}
@keyframes pulsePick{
  0%,100%{box-shadow:0 0 0 0 rgba(217,255,62,0)}
  50%{box-shadow:0 0 0 5px rgba(217,255,62,.25)}
}
.slot.filled{
  background:var(--chip);color:var(--chip-ink);cursor:pointer;
  box-shadow:0 4px 0 rgba(0,0,0,.3);
  animation:pop .35s cubic-bezier(.2,.9,.3,1.4);
}
.slot.filled:active{transform:translateY(2px)}
/* \u591A\u884C\u62C6\u5B57\u540D\u724C\uFF1A\u884C\u6578\u8D8A\u591A\u5B57\u8D8A\u5C0F\uFF0C\u76F4\u6392\u5408\u9AD4 */
.slot.filled.multi{font-size:12.5px;line-height:1.18;letter-spacing:.1em}
.slot.filled.multi.tall{font-size:10.5px;line-height:1.1}
/* \u53EA\u6709\u8F38\u5165\u6642\u7528\u7A7A\u683C\u81EA\u884C\u5206\u6BB5\uFF08<br>\uFF09\u624D\u63DB\u884C\uFF1B\u5176\u4ED6\u4E00\u5F8B\u55AE\u884C\uFF0C\u592A\u9577\u5C31\u7E2E\u5B57 */
.slot.filled .stack{display:block;text-align:center;white-space:nowrap;max-width:100%;overflow:hidden}

.slot.filled .num{
  font-family:var(--font-num);font-size:11px;color:var(--court-mat);
  position:absolute;top:3px;left:7px;font-weight:400;
}
@keyframes pop{from{transform:scale(.5);opacity:0}to{transform:scale(1);opacity:1}}

/* === \u7B2C\u4E8C\u5834 === */
.court2-wrap{margin-top:14px}
/* \u672A\u89E3\u9396\uFF1A\u6574\u5EA7\u7403\u5834\u53CD\u767D\u964D\u98FD\u548C */
.court-card.ghost .court-svg,
.court-card.ghost .court-label,
.court-card.ghost .court-count,
.court-card.ghost .slots{opacity:.34;filter:grayscale(.35) brightness(1.3)}
.court-card.unlocked .court-svg,
.court-card.unlocked .court-label,
.court-card.unlocked .court-count,
.court-card.unlocked .slots{opacity:1;filter:none}
.unlock-overlay{
  position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:20px;
}
.unlock-box{
  background:rgba(12,53,42,.88);border:1px dashed rgba(239,233,216,.4);border-radius:13px;
  padding:15px 20px;text-align:center;font-size:13px;color:var(--ink);line-height:1.7;max-width:250px;
}
.unlock-box b{color:var(--lime)}
.bar{height:6px;border-radius:99px;background:rgba(239,233,216,.18);margin-top:9px;overflow:hidden}
.bar i{display:block;height:100%;background:var(--lime);border-radius:99px;transition:width .5s ease}
.captain-banner{
  margin-top:14px;border-radius:12px;padding:13px 16px;font-size:14px;line-height:1.65;
  background:var(--coral);color:#fff;font-weight:700;
  box-shadow:0 10px 26px -10px rgba(255,106,77,.55);
  animation:pop .4s cubic-bezier(.2,.9,.3,1.3);
}
/* === \u5019\u88DC\u5E2D === */
.bench{margin-top:14px;border-radius:14px;padding:14px 16px;background:rgba(0,0,0,.22)}
.bench h3{font-family:var(--font-num);font-size:13px;letter-spacing:.25em;color:var(--dim);margin-bottom:10px}
.bench-chips{display:flex;flex-wrap:wrap;gap:8px}
.bench-chips .slot.filled{max-width:none;width:auto;height:auto;min-height:36px;font-size:13px;padding:6px 14px}
.bench-chips .slot.filled .num{position:static;margin-right:2px}

/* === \u5E95\u90E8\u6495\u7968\u5831\u540D\u5217 === */
.ticket-bar{
  position:fixed;left:0;right:0;bottom:0;z-index:50;
  background:var(--line);padding:12px 16px calc(12px + env(safe-area-inset-bottom));
  box-shadow:0 -14px 34px rgba(0,0,0,.45);
}
.ticket-bar::before{ /* \u6495\u7968\u5B54 */
  content:"";position:absolute;top:-7px;left:0;right:0;height:14px;
  background:radial-gradient(circle at 8px 7px, var(--court) 5px, transparent 5.5px);
  background-size:26px 14px;background-repeat:repeat-x;
}
.ticket-inner{max-width:520px;margin:0 auto;display:flex;gap:10px}
.name-dd{flex:1;position:relative;min-width:0}
.name-select{
  width:100%;appearance:none;-webkit-appearance:none;text-align:left;cursor:pointer;
  font-family:var(--font-body);font-size:16px;font-weight:700;color:var(--court);
  background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%230c352a' stroke-width='2' fill='none'/%3E%3C/svg%3E") no-repeat right 14px center;
  border:2px solid var(--court);border-radius:10px;padding:12px 38px 12px 14px;min-width:0;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.name-select:disabled{cursor:default;color:rgba(12,53,42,.55)}
/* \u540D\u55AE\u9762\u677F\uFF1A\u5F80\u4E0A\u5F48\u51FA */
.name-list{
  position:absolute;bottom:calc(100% + 10px);left:0;right:0;z-index:60;
  background:#fff;border:2px solid var(--court);border-radius:12px;overflow:hidden auto;
  max-height:44vh;box-shadow:0 -10px 30px rgba(0,0,0,.35);
}
.name-row{
  display:flex;align-items:center;gap:8px;padding:11px 8px 11px 14px;cursor:pointer;
  font-size:15px;font-weight:700;color:var(--court);border-bottom:1px solid rgba(12,53,42,.08);
}
.name-row:last-child{border-bottom:none}
.name-row:active{background:rgba(12,53,42,.07)}
.name-row .nm{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.name-row.signed{color:rgba(12,53,42,.4);cursor:default;font-weight:500}
.name-row .del{
  flex:none;width:24px;height:24px;border-radius:99px;border:none;cursor:pointer;
  background:rgba(12,53,42,.08);color:rgba(12,53,42,.55);font-size:12px;line-height:1;
  display:flex;align-items:center;justify-content:center;
}
.name-row .del:active{background:var(--coral);color:#fff}
.btn-go{
  font-family:var(--font-display);font-size:18px;letter-spacing:.2em;
  background:var(--court);color:var(--lime);border:none;border-radius:10px;
  padding:12px 20px 12px 23px;cursor:pointer;white-space:nowrap;
}
.btn-go:disabled{opacity:.45}
.btn-go:active{transform:translateY(1px)}

/* === \u6298\u758A\u5340 === */
.fold{margin-top:16px;border-radius:12px;background:rgba(239,233,216,.05);overflow:hidden}
.fold summary{
  list-style:none;cursor:pointer;padding:13px 16px;font-size:13px;letter-spacing:.15em;
  color:var(--dim);display:flex;justify-content:space-between;align-items:center;user-select:none;
}
.fold summary::-webkit-details-marker{display:none}
.fold summary::after{content:"\uFF0B";font-size:15px;transition:transform .25s}
.fold[open] summary::after{transform:rotate(45deg)}
.fold-body{padding:2px 16px 16px}
.add-row{display:flex;gap:8px}
.add-row textarea{
  flex:1;font-family:var(--font-body);font-size:15px;padding:10px 12px;border-radius:9px;
  border:1px solid rgba(239,233,216,.3);background:rgba(0,0,0,.25);color:var(--ink);min-width:0;
  resize:none;line-height:1.5;
}
.add-row textarea::placeholder{color:rgba(157,184,171,.6)}
.btn-add{background:var(--lime);color:var(--court);font-weight:900;border:none;border-radius:9px;padding:10px 16px;font-size:14px;cursor:pointer}
.hint{font-size:12px;color:var(--dim);margin-top:9px;line-height:1.6}
.history-item{padding:10px 0;border-bottom:1px dashed rgba(239,233,216,.15);font-size:13px;line-height:1.7}
.history-item:last-child{border-bottom:none}
.history-item .d{font-family:var(--font-num);color:var(--lime);letter-spacing:.05em;margin-right:8px}
.history-item .names{color:var(--dim)}

/* === \u63D0\u793A toast / \u9023\u7DDA\u72C0\u614B === */
#toast{
  position:fixed;left:50%;bottom:calc(110px + env(safe-area-inset-bottom));transform:translateX(-50%) translateY(20px);
  background:#000c;color:#fff;font-size:14px;padding:10px 18px;border-radius:99px;
  opacity:0;pointer-events:none;transition:.3s;z-index:60;white-space:nowrap;
}
#toast.show{opacity:1;transform:translateX(-50%)}
.offline{
  margin-top:14px;border-radius:10px;padding:11px 14px;font-size:13px;line-height:1.6;
  background:rgba(255,106,77,.15);border:1px solid rgba(255,106,77,.5);color:#ffb3a3;display:none;
}
footer{margin-top:30px;text-align:center;font-size:11px;color:rgba(157,184,171,.5);letter-spacing:.2em;padding-bottom:8px}
</style>
</head>
<body>
<div class="wrap">

  <header>
    <div class="team-row rise" style="animation-delay:.05s">
      <span class="team-badge">\u6DE1\u6C34\u4E73\u9178\u5806\u8D77\u7FBD\u7403\u968A</span>
      <button class="btn-ghost" id="shareBtn">\u{1F517} \u8907\u88FD\u9023\u7D50</button>
    </div>
    <h1 class="rise" style="animation-delay:.12s">\u9031\u516D\u958B\u6253<br><span class="accent">\u624B\u5200\u5831\u540D</span></h1>
    <div class="date-block rise" style="animation-delay:.2s">
      <div class="date-num" id="dateNum">--.--</div>
      <div class="date-meta">
        <div class="weekday" id="weekdayTxt">SAT\uFF0F\u9031\u516D</div>
        <div class="time">16:00\u201318:00</div>
      </div>
    </div>
    <div class="venue rise" style="animation-delay:.26s">\u{1F4CD} <b>\u6DE1\u6C34\u570B\u6C11\u904B\u52D5\u4E2D\u5FC34F</b>\u3000<span id="courtName">\u58F9</span>\u53F7\u7FBD\u7403\u5834</div>
    <div class="status-row rise" style="animation-delay:.3s">
      <span class="pill open" id="statusPill">\u5831\u540D\u4E2D</span>
      <span class="countdown" id="countdown"></span>
    </div>
    <div class="week-tabs rise" style="animation-delay:.34s" id="weekTabs"></div>
    
  </header>

  <div class="offline" id="offlineBox">\u26A0\uFE0F \u9023\u7DDA\u4E0D\u5230\u5831\u540D\u8CC7\u6599\u5EAB\uFF0C\u986F\u793A\u7684\u662F\u5FEB\u53D6\u540D\u55AE\u3002\u8ACB\u6AA2\u67E5\u7DB2\u8DEF\u5F8C\u91CD\u65B0\u6574\u7406\u3002</div>

  <!-- \u7B2C\u4E00\u5834\uFF1A\u7403\u5834\u5373\u540D\u55AE -->
  <section class="court-sec rise" style="animation-delay:.36s">
    <div class="court-card">
      <svg class="court-svg" viewBox="0 0 610 570" aria-hidden="true">
        <rect class="draw" pathLength="100" x="30" y="66" width="550" height="480" rx="2"/>
        <line class="draw" pathLength="100" x1="76" y1="66" x2="76" y2="546"/>
        <line class="draw" pathLength="100" x1="534" y1="66" x2="534" y2="546"/>
        <line class="draw" pathLength="100" x1="30" y1="92" x2="580" y2="92"/>
        <line class="draw" pathLength="100" x1="30" y1="520" x2="580" y2="520"/>
        <line class="draw" pathLength="100" x1="30" y1="199" x2="580" y2="199"/>
        <line class="draw" pathLength="100" x1="30" y1="413" x2="580" y2="413"/>
        <line class="draw" pathLength="100" x1="305" y1="66" x2="305" y2="199"/>
        <line class="draw" pathLength="100" x1="305" y1="413" x2="305" y2="546"/>
        <line class="net" x1="18" y1="306" x2="592" y2="306"/>
      </svg>
      <div class="court-label">COURT
        <select id="courtSel" title="\u5718\u9577\u8A02\u5230\u7B2C\u5E7E\u9762\u5834\u5730\u5C31\u6539\u9019\u88E1">
          <option>1</option><option>2</option><option>3</option>
          <option>4</option><option>5</option><option>6</option>
        </select>
      </div>
      <div class="court-count" id="count1">0<small> / 8</small></div>
      <div class="slots" id="slots1"></div>
    </div>
  </section>

  <!-- \u7B2C\u4E8C\u5834\uFF1A\u540C\u6BD4\u4F8B\u7403\u5834\uFF0C\u672A\u89E3\u9396\u6642\u53CD\u767D\u5F15\u5C0E -->
  <section class="court2-wrap rise" style="animation-delay:.42s">
    <div id="banner2"></div>
    <div class="court-card ghost" id="court2Card">
      <svg class="court-svg" viewBox="0 0 610 570" aria-hidden="true">
        <rect x="30" y="66" width="550" height="480" rx="2"/>
        <line x1="76" y1="66" x2="76" y2="546"/>
        <line x1="534" y1="66" x2="534" y2="546"/>
        <line x1="30" y1="92" x2="580" y2="92"/>
        <line x1="30" y1="520" x2="580" y2="520"/>
        <line x1="30" y1="199" x2="580" y2="199"/>
        <line x1="30" y1="413" x2="580" y2="413"/>
        <line x1="305" y1="66" x2="305" y2="199"/>
        <line x1="305" y1="413" x2="305" y2="546"/>
        <line class="net" x1="18" y1="306" x2="592" y2="306"/>
      </svg>
      <div class="court-label">\u7B2C\u4E8C\u5834</div>
      <div class="court-count" id="count2">0<small> / 8</small></div>
      <div class="slots" id="slots2"></div>
      <div class="unlock-overlay" id="unlockOverlay"></div>
    </div>
  </section>

  <!-- \u5019\u88DC\u5E2D -->
  <section id="benchSec"></section>

  <!-- \u65B0\u589E\u540D\u5B57 -->
  <details class="fold rise" style="animation-delay:.48s">
    <summary>\u627E\u4E0D\u5230\u540D\u5B57\uFF1F\u65B0\u589E\u968A\u54E1</summary>
    <div class="fold-body">
      <div class="add-row">
        <textarea id="newName" maxlength="14" rows="1" placeholder="\u8F38\u5165\u540D\u5B57\uFF08Enter \u63DB\u884C\u76F4\u6392\uFF0C\u6700\u591A\u4E09\u884C\uFF09"></textarea>
        <button class="btn-add" id="addBtn">\u52A0\u5165</button>
      </div>
      <div class="hint">\u52A0\u5165\u5F8C\u6240\u6709\u4EBA\u7684\u9078\u55AE\u90FD\u6703\u51FA\u73FE\u9019\u500B\u540D\u5B57\uFF0C\u53EA\u9700\u8981\u52A0\u4E00\u6B21\u3002\u62C6\u5B57\u540D\u53EF\u7528\u7A7A\u683C\u5206\u884C\u76F4\u6392\uFF0C\u4F8B\uFF1A\u300C\u8279\u8279 \u4E00\u4E00 \u7F8B\u7F8B\u300D\u6703\u6392\u6210\u4E09\u884C\uFF1D\u83EF\u83EF\u3002</div>
    </div>
  </details>

  <!-- \u904E\u53BB\u7D00\u9304 -->
  <details class="fold rise" style="animation-delay:.52s" id="historyFold">
    <summary>\u904E\u53BB\u5E7E\u9031\u7D00\u9304</summary>
    <div class="fold-body" id="historyBody"><div class="hint">\u8F09\u5165\u4E2D\u22EF</div></div>
  </details>

  <footer>TAMSUI LACTIC ACID CLUB \xB7 EVERY SATURDAY</footer>
</div>

<!-- \u6495\u7968\u5831\u540D\u5217 -->
<div class="ticket-bar">
  <div class="ticket-inner">
    <div class="name-dd" id="nameDD">
      <button class="name-select" id="nameBtn" type="button" disabled>\u8F09\u5165\u4E2D\u22EF</button>
      <div class="name-list" id="nameList" hidden></div>
    </div>
    <button class="btn-go" id="goBtn" disabled>\u5831\u540D</button>
  </div>
</div>

<div id="toast"></div>

<script>
/* ================= \u8A2D\u5B9A ================= */
/* \u5F8C\u7AEF\uFF1ACloudflare Worker\uFF08badminton-signup.brzder.workers.dev\uFF09\uFF0B KV
   \u5728 workers.dev \u4E0A\u540C\u6E90\u547C\u53EB\uFF1B\u5728 GitHub Pages \u93E1\u50CF\u4E0A\u8DE8\u57DF\u547C\u53EB\uFF08Worker \u5DF2\u958B CORS\uFF09 */
const API_BASE = location.hostname.endsWith('github.io') ? 'https://badminton-signup.brzder.workers.dev' : '';
const CAP1 = 8, UNLOCK2 = 12, CAP_TOTAL = 16;
const POLL_MS = 25000;

/* ================= \u5834\u6B21\u6642\u9593 =================
   \u5831\u540D\u7A97\u53E3\uFF1A\u4E0A\u4E00\u5834\u7D50\u675F\uFF08\u9031\u516D 18:00\uFF09\u5F8C\u958B\u653E\u4E0B\u4E00\u9031 \uFF1D \u6C38\u9060 7 \u5929\u524D\u958B\u653E
   \u9031\u4E94 24:00 \u622A\u6B62\uFF08\u7D66\u5718\u9577\u6642\u9593\u6C7A\u5B9A\u52A0\u79DF\uFF09\uFF1B\u9031\u516D 00:00\u201316:00 \u540D\u55AE\u9396\u5B9A\uFF1B16:00\u201318:00 \u958B\u6253\u4E2D */
function sessionSaturday(now = new Date()){
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = (6 - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + diff);
  if (diff === 0 && now.getHours() >= 18) d.setDate(d.getDate() + 7);
  return d;
}
const pad = n => String(n).padStart(2, '0');
const dkeyOf = d => \`\${d.getFullYear()}-\${pad(d.getMonth()+1)}-\${pad(d.getDate())}\`;
const mdOf = d => \`\${pad(d.getMonth()+1)}.\${pad(d.getDate())}\`;
/* \u4E09\u500B\u5834\u6B21\uFF1A\u7B2C 1 \u9801\u56FA\u5B9A\u6700\u8FD1\u7684\u9031\u516D\uFF1B\u7B2C 2\u30013 \u9801\u53EF\u7531\u5718\u968A\u81EA\u8A02\u65E5\u671F\uFF08\u5B58 KV \u5168\u968A\u540C\u6B65\uFF09\uFF0C
   \u6C92\u81EA\u8A02\u6642\u9810\u8A2D\u4E0B\u9031\u516D\uFF0F\u4E0B\u4E0B\u9031\u516D */
let serverTabs = null;   // \u4F3A\u670D\u5668\u8F2A\u8F49\u5F8C\u7684\u4E09\u500B\u5834\u6B21\u65E5\u671F\uFF08\u5B57\u4E32\uFF09\uFF0C\u672A\u53D6\u5F97\u524D\u7528\u9810\u8A2D
let SATS = [], WEEK_KEYS = [];
let selIdx = 0, DKEY = '';
function computeSessions(){
  let keys;
  if (Array.isArray(serverTabs) && serverTabs.length === 3){
    keys = serverTabs;
  } else {
    const base = sessionSaturday();
    keys = [0, 1, 2].map(i => { const d = new Date(base); d.setDate(d.getDate() + 7 * i); return dkeyOf(d); });
  }
  WEEK_KEYS = keys;
  SATS = keys.map(k => { const [y, m, dd] = k.split('-').map(Number); return new Date(y, m - 1, dd); });
  DKEY = WEEK_KEYS[selIdx];
}
computeSessions();
let weekCounts = {};   // {dkey: \u5831\u540D\u4EBA\u6578} \u7D66\u9801\u7C64\u7528

function sessTimes(){
  const SAT = SATS[selIdx];
  const deadlineT = new Date(SAT); deadlineT.setHours(0,0,0,0);
  const startT = new Date(SAT); startT.setHours(16,0,0,0);
  const endT = new Date(SAT); endT.setHours(18,0,0,0);
  return {deadlineT, startT, endT};
}
function fmtLeft(ms){
  const d = Math.floor(ms/86400000), h = Math.floor(ms%86400000/3600000), m = Math.floor(ms%3600000/60000);
  return \`\${d > 0 ? d + ' \u5929 ' : ''}\${h} \u5C0F\u6642 \${m} \u5206\`;
}
function refreshStatus(){
  const {deadlineT, startT, endT} = sessTimes();
  const now = new Date(), pill = document.getElementById('statusPill'), cd = document.getElementById('countdown');
  if (now < deadlineT){ pill.className='pill open'; pill.textContent='\u5831\u540D\u4E2D'; cd.textContent=\`\u5831\u540D\u622A\u6B62\u5012\u6578 \${fmtLeft(deadlineT-now)}\`; return 'open'; }
  if (now < startT){ pill.className='pill closed'; pill.textContent='\u540D\u55AE\u9396\u5B9A'; cd.textContent=\`\u958B\u6253\u5012\u6578 \${fmtLeft(startT-now)}\`; return 'locked'; }
  if (now < endT){ pill.className='pill live'; pill.textContent='\u958B\u6253\u4E2D'; cd.textContent='\u6253\u8D77\u4F86\uFF01'; return 'live'; }
  pill.className='pill closed'; pill.textContent='\u672C\u9031\u5DF2\u6536\u5834'; cd.textContent=''; return 'closed';
}

/* ================= \u8CC7\u6599\u5C64 ================= */
let roster = ['Miller'];
let signups = [];   // [{id,name,at,pos}] id \u7531\u4F3A\u670D\u5668\u767C\uFF0Cpos=\u5834\u4E0A\u4F4D\u7F6E(1-8 \u7B2C\u4E00\u5834)
let history = [];   // [{date,names:[]}]
let courtNo = 1;    // \u5718\u9577\u8A02\u5230\u7684\u5834\u5730\u865F\uFF081-6\uFF0C\u5168\u968A\u5171\u4EAB\uFF09
let pendingName = null;  // \u5DF2\u9078\u597D\u3001\u5F85\u9EDE\u4F4D\u7F6E\u7684\u540D\u5B57
let online = true;

/* DEMO \u6C99\u76D2\u6A21\u5F0F\uFF08?demo=1\uFF09\uFF1A\u5168\u90E8\u5728\u672C\u9801\u8A18\u61B6\u9AD4\u6A21\u64EC\uFF0C\u4E0D\u78B0\u6B63\u5F0F\u8CC7\u6599\u5EAB */
const DEMO = new URLSearchParams(location.search).has('demo');
const demoStore = {
  tabs:null,
  roster:['Miller','\u5973\u795E','\u7C73\u9769\u529B','\u6728\u6BCF\u5973\u81E3'],
  history:[{date:'2026-08-09',names:['\u7C73\u9769\u529B','\u5973\u795E','Miller']}],
  weeks:{}
};
function demoWeek(date){
  if (!demoStore.weeks[date]){
    demoStore.weeks[date] = {
      signups: date === WEEK_KEYS[0]
        ? [{id:'d1',name:'\u7C73\u9769\u529B',at:1,pos:1},{id:'d2',name:'\u6728\u6BCF\u5973\u81E3',at:2,pos:2},{id:'d3',name:'\u5973\u795E',at:3,pos:5}]
        : [],
      court: 1
    };
  }
  return demoStore.weeks[date];
}
function demoApi(path, body){
  const m = path.match(/date=([0-9-]+)/);
  const date = (body && body.date) || (m && m[1]) || DKEY;
  const w = demoWeek(date);
  if (path === 'signup' && !w.signups.some(x=>x.name===body.name)){
    const taken = new Set(w.signups.map(x=>x.pos));
    let pos = body.pos && !taken.has(body.pos) ? body.pos : null;
    if (!pos){ pos = 1; while (taken.has(pos)) pos++; }
    w.signups.push({id:'d'+Date.now(), name:body.name, at:Date.now(), pos});
  }
  if (path === 'cancel') w.signups = w.signups.filter(x=>x.id!==body.id);
  if (path === 'addname' && !demoStore.roster.includes(body.name)) demoStore.roster.push(body.name);
  if (path === 'delname') demoStore.roster = demoStore.roster.filter(x => x !== body.name);
  if (path === 'setcourt') w.court = body.court;
  if (!demoStore.tabs) demoStore.tabs = [...WEEK_KEYS];
  if (path === 'settab') demoStore.tabs[body.slot - 1] = body.date;
  const counts = {};
  WEEK_KEYS.forEach(k => { counts[k] = demoWeek(k).signups.length; });
  return Promise.resolve(JSON.parse(JSON.stringify(
    {signups:w.signups, court:w.court, roster:demoStore.roster, history:demoStore.history, counts, tabs:demoStore.tabs})));
}
async function api(path, body){
  if (DEMO) return demoApi(path, body);
  const r = await fetch(API_BASE + '/api/' + path, body
    ? {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)}
    : {cache:'no-store'});
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
function absorb(s){
  if (!s) return;
  if (Array.isArray(s.signups)) signups = s.signups;
  if (Array.isArray(s.roster)) roster = s.roster;
  if (Array.isArray(s.history)) history = s.history;
  if (s.court >= 1) courtNo = s.court;
  if (Array.isArray(s.tabs) && s.tabs.length === 3){
    serverTabs = s.tabs;
    computeSessions();
  }
  if (s.counts) weekCounts = s.counts;
  else if (Array.isArray(s.signups)) weekCounts[DKEY] = s.signups.length;
  if (DEMO) return;
  try{ localStorage.setItem('bd_cache', JSON.stringify({roster, signups, week: DKEY})); }catch(e){}
}
function loadCache(){
  try{
    const c = JSON.parse(localStorage.getItem('bd_cache') || 'null');
    if (c){ roster = c.roster || roster; if (c.week === DKEY) signups = c.signups || []; }
  }catch(e){}
}
async function pull(){
  try{ absorb(await api(\`state?date=\${DKEY}&hist=1&all=\${WEEK_KEYS.join(',')}\`)); online = true; }
  catch(e){ online = false; }
  render();
}

/* ================= \u756B\u9762 ================= */
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* \u540D\u5B57\u88E1\u7684\u7A7A\u683C\uFF1D\u63DB\u884C\uFF1A\u62C6\u5B57\u53EF\u4EE5\u76F4\u6392\uFF08\u4F8B\uFF1A\u300C\u8279\u8279 \u4E00\u4E00 \u7F8B\u7F8B\u300D\u4E09\u884C\u76F4\u8B80\uFF1D\u83EF\u83EF\uFF09 */
function chipHTML(p){
  const parts = String(p.name).split('\\n').filter(Boolean);   // \u53EA\u6709 Enter \u63DB\u884C\u624D\u5206\u884C\uFF0C\u7A7A\u683C\u4E0D\u5206\u884C
  const multi = parts.length > 1 ? \` multi\${parts.length > 2 ? ' tall' : ''}\` : '';
  /* \u55AE\u6BB5\u9577\u540D\u4E0D\u63DB\u884C\u3001\u6309\u5B57\u6578\u7E2E\u5B57\uFF0896px \u986F\u793A\u9810\u7B97\uFF0C\u6700\u5C0F 8px\uFF09 */
  const fs = parts.length === 1 && p.name.length > 6
    ? \` style="font-size:\${Math.max(8, Math.floor(96 / p.name.length))}px;letter-spacing:0"\` : '';
  return \`<div class="slot filled\${multi}"\${fs} data-id="\${esc(p.id)}" data-name="\${esc(p.name)}" title="\u9EDE\u4E00\u4E0B\u53D6\u6D88\u5831\u540D">
    <span class="num">\${p.pos}</span><span class="stack">\${parts.map(esc).join('<br>')}</span></div>\`;
}
function render(){
  const st = refreshStatus();
  document.getElementById('offlineBox').style.display = online ? 'none' : 'block';

  /* \u5834\u6B21\u65E5\u671F\u8207\u4E09\u9031\u9801\u7C64\uFF08\u7B2C 2\u30013 \u9801\u53EF\u81EA\u8A02\u65E5\u671F\uFF0C\u53F3\u4E0A\u89D2 \u270E\uFF09 */
  const selDate = SATS[selIdx];
  document.getElementById('dateNum').textContent = mdOf(selDate);
  document.getElementById('weekdayTxt').textContent =
    \`\${['SUN','MON','TUE','WED','THU','FRI','SAT'][selDate.getDay()]}\uFF0F\u9031\${'\u65E5\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D'[selDate.getDay()]}\`;
  document.getElementById('weekTabs').innerHTML = WEEK_KEYS.map((k, i) => {
    const c = weekCounts[k];
    const label = \`\u9031\${'\u65E5\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D'[SATS[i].getDay()]}\`;
    return \`<div class="week-tab\${i === selIdx ? ' on' : ''}" data-idx="\${i}" role="button">
      \${label}<span class="d">\${mdOf(SATS[i])}</span>
      <span class="c">\${c > 0 ? c + ' \u4EBA\u5DF2\u5831' : '\u5C1A\u7121\u4EBA\u5831\u540D'}</span>
      <span class="edit" title="\u6539\u65E5\u671F">\u270E<input type="date" class="tabdate" data-idx="\${i}" value="\${k}" min="\${dkeyOf(new Date())}"></span></div>\`;
  }).join('');

  /* \u5834\u5730\u865F\u540C\u6B65\uFF08\u5718\u9577\u8A2D\u5B9A\uFF09 */
  document.getElementById('courtSel').value = String(courtNo);
  document.getElementById('courtName').textContent = '\u58F9\u8CB3\u53C3\u8086\u4F0D\u9678'[courtNo-1] || courtNo;

  /* \u5169\u5EA7\u7403\u5834\uFF1A\u4F9D pos \u653E\u7F6E\uFF1B\u9078\u597D\u540D\u5B57\u6642\u7A7A\u4F4D\u9032\u5165\u53EF\u9EDE\u72C0\u614B */
  const byPos = {};
  signups.forEach(p => { byPos[p.pos] = p; });
  const n = signups.length;
  const picking = pendingName && st === 'open';
  const unlocked = n >= UNLOCK2;

  const slotsHTML = (startPos, clickable) =>
    Array.from({length: 8}, (_, i) => {
      const pos = startPos + i;
      return byPos[pos] ? chipHTML(byPos[pos])
        : \`<div class="slot empty\${clickable && picking ? ' pick' : ''}"\${clickable ? \` data-pos="\${pos}"\` : ''}>NO.\${pos}</div>\`;
    }).join('');

  document.getElementById('slots1').innerHTML = slotsHTML(1, true);
  const n1 = signups.filter(p => p.pos <= CAP1).length;
  document.getElementById('count1').innerHTML = \`\${n1}<small> / 8</small>\`;

  /* \u7B2C\u4E8C\u5834\uFF1A\u672A\u6EFF 12 \u4EBA\u53CD\u767D\uFF0B\u89E3\u9396\u63D0\u793A\uFF1B\u6EFF 12 \u5168\u5F69\u53EF\u9078\u4F4D */
  const card2 = document.getElementById('court2Card');
  const overlay = document.getElementById('unlockOverlay');
  const banner2 = document.getElementById('banner2');
  const n2 = signups.filter(p => p.pos > CAP1 && p.pos <= CAP_TOTAL).length;
  document.getElementById('slots2').innerHTML = slotsHTML(CAP1 + 1, unlocked);
  document.getElementById('count2').innerHTML = \`\${n2}<small> / 8</small>\`;
  card2.className = 'court-card ' + (unlocked ? 'unlocked' : 'ghost');
  if (unlocked){
    overlay.style.display = 'none';
    banner2.innerHTML = \`<div class="captain-banner">\u{1F389} \u6EFF \${UNLOCK2} \u4EBA\uFF0C\u7B2C\u4E8C\u5834\u6210\u7ACB\uFF01<br>\u5718\u9577\u8A18\u5F97\u53BB\u52A0\u79DF\u7B2C\u4E8C\u9762\u5834\u5730\uFF5E</div>\`;
    banner2.style.marginBottom = '12px';
  } else {
    overlay.style.display = 'flex';
    banner2.innerHTML = '';
    overlay.innerHTML = n <= CAP1
      ? \`<div class="unlock-box">\u{1F512} \u5831\u540D\u6EFF <b>\${UNLOCK2} \u4EBA</b>\u81EA\u52D5\u89E3\u9396\u7B2C\u4E8C\u5834<br>\u63EA\u4EBA\u4E00\u8D77\u4F86\uFF01\uFF08\u76EE\u524D \${n} \u4EBA\uFF09
          <div class="bar"><i style="width:\${Math.min(n/UNLOCK2*100,100)}%"></i></div></div>\`
      : \`<div class="unlock-box">\u23F3 \u7B2C\u4E8C\u5834\u6392\u968A\u4E2D\uFF0C\u518D <b>\${UNLOCK2 - n} \u4EBA</b>\u5C31\u6210\u7ACB<br>\uFF08\u76EE\u524D \${n}\uFF0F\${UNLOCK2} \u4EBA\uFF09
          <div class="bar"><i style="width:\${n/UNLOCK2*100}%"></i></div></div>\`;
  }

  /* \u5019\u88DC\uFF08>16\uFF09 */
  const bench = document.getElementById('benchSec');
  const waiters = signups.filter(p => p.pos > CAP_TOTAL).sort((a,b)=>a.pos-b.pos);
  bench.innerHTML = waiters.length
    ? \`<div class="bench"><h3>WAITLIST\uFF0F\u5019\u88DC\u5E2D</h3><div class="bench-chips">
        \${waiters.map(p=>chipHTML(p)).join('')}</div></div>\`
    : '';

  /* \u81EA\u8A02\u540D\u5B57\u9078\u55AE\uFF1A\u5DF2\u4E0A\u5834\u6253\u52FE\u53CD\u7070\u3001\u53EF\u9078\u7684\u6BCF\u5217\u53F3\u5074\u6709\u5C0F \u2715 \u53EF\u81EA\u884C\u79FB\u9664\u820A\u540D */
  const btn = document.getElementById('nameBtn'), list = document.getElementById('nameList'), go = document.getElementById('goBtn');
  const signed = new Set(signups.map(p => p.name));
  const avail = roster.filter(x => !signed.has(x));
  if (st !== 'open'){
    btn.textContent = st === 'locked' ? '\u5DF2\u622A\u6B62\uFF0C\u540D\u55AE\u9396\u5B9A\u5099\u6230' : st === 'live' ? '\u958B\u6253\u4E2D\uFF01' : '\u672C\u9031\u5DF2\u6536\u5834\uFF0C\u7B49\u4E0B\u9031\u958B\u653E';
    btn.disabled = true; list.hidden = true; go.disabled = true;
  } else {
    if (pendingName && !avail.includes(pendingName)) pendingName = null;
    btn.disabled = false;
    btn.textContent = (pendingName || '').replace(/\\n/g, ' ') || (avail.length ? '\u9078\u4F60\u7684\u540D\u5B57' : '\u5168\u54E1\u90FD\u4E0A\u5834\u4E86 \u{1F4AA}');
    go.disabled = !avail.length;
    const shown = x => esc(x).replace(/\\n/g, ' <span style="opacity:.35">/</span> ');
    list.innerHTML = roster.map(x => signed.has(x)
      ? \`<div class="name-row signed"><span class="nm">\u2714 \${shown(x)}\uFF08\u5DF2\u4E0A\u5834\uFF09</span></div>\`
      : \`<div class="name-row" data-name="\${esc(x)}"><span class="nm">\${shown(x)}</span>
          <button class="del" data-del="\${esc(x)}" title="\u5F9E\u540D\u55AE\u79FB\u9664">\u2715</button></div>\`).join('')
      || \`<div class="name-row signed"><span class="nm">\u540D\u55AE\u662F\u7A7A\u7684\uFF0C\u5148\u53BB\u300C\u65B0\u589E\u968A\u54E1\u300D</span></div>\`;
  }

  renderHistory();
}
function renderHistory(){
  const box = document.getElementById('historyBody');
  box.innerHTML = history.length
    ? history.map(h => \`<div class="history-item"><span class="d">\${esc(h.date.slice(5).replace('-','.'))}</span>
        <span class="names">\${h.names.length} \u4EBA\uFF1A\${h.names.map(esc).join('\u3001')}</span></div>\`).join('')
    : '<div class="hint">\u9084\u6C92\u6709\u904E\u5F80\u7D00\u9304\uFF0C\u672C\u9031\u6253\u5B8C\u5C31\u6709\u4E86\u3002</div>';
}

/* ================= \u4E92\u52D5 ================= */
/* \u6D41\u7A0B\uFF1A\u4E0B\u62C9\u9078\u540D\u5B57 \u2192 \u5834\u4E0A\u7A7A\u4F4D\u958B\u59CB\u9583 \u2192 \u9EDE\u4F4D\u7F6E\u5B8C\u6210\u5831\u540D\uFF1B\u6309\u300C\u5831\u540D\u300D\u5247\u81EA\u52D5\u6392\u6700\u524D\u7A7A\u4F4D */
async function doSignup(name, pos){
  try{
    absorb(await api('signup', {date: DKEY, name, pos}));
    online = true; pendingName = null;
    const me = signups.find(p => p.name === name);
    toast(me && me.pos <= CAP1 ? \`\u2705 \${name} \u7AD9\u4E0A NO.\${me.pos}\uFF01\`
        : me ? \`\u2705 \${name} \u6392\u5728 NO.\${me.pos}\uFF01\u76EE\u524D\u5171 \${signups.length} \u4EBA\`
        : \`\u2705 \${name} \u5DF2\u6392\u5165\`);
  }catch(e){
    online = navigator.onLine !== false;
    toast(String(e).includes('taken') ? '\u9019\u500B\u4F4D\u7F6E\u525B\u88AB\u6436\u8D70\uFF0C\u63DB\u4E00\u683C\u5427' : '\u9023\u7DDA\u5931\u6557\uFF0C\u8ACB\u518D\u8A66\u4E00\u6B21');
  }
  render();
}

/* \u81EA\u8A02\u9078\u55AE\u958B\u5408\u8207\u9078\u64C7/\u522A\u9664 */
document.getElementById('nameBtn').addEventListener('click', () => {
  const list = document.getElementById('nameList');
  list.hidden = !list.hidden;
});
document.getElementById('nameList').addEventListener('click', async e => {
  /* \u5C0F \u2715\uFF1A\u628A\u820A\u540D\u5B57\u5F9E\u540D\u55AE\u79FB\u9664\uFF08\u4E0D\u5F71\u97FF\u5DF2\u5831\u540D\u5834\u6B21\uFF09 */
  const del = e.target.closest('.del');
  if (del){
    e.stopPropagation();
    const name = del.dataset.del;
    if (!confirm(\`\u628A\u300C\${name}\u300D\u5F9E\u540D\u55AE\u79FB\u9664\uFF1F\\n\uFF08\u6539\u540D\u7559\u4E0B\u7684\u820A\u540D\u5B57\u53EF\u4EE5\u9019\u6A23\u6E05\u6389\uFF0C\u4E0D\u5F71\u97FF\u5DF2\u5831\u540D\u7684\u5834\u6B21\uFF09\`)) return;
    try{
      absorb(await api('delname', {name}));
      online = true;
      if (pendingName === name) pendingName = null;
      toast(\`\u5DF2\u628A \${name} \u5F9E\u540D\u55AE\u79FB\u9664\`);
    }catch(err){ online = false; toast('\u9023\u7DDA\u5931\u6557\uFF0C\u8ACB\u518D\u8A66\u4E00\u6B21'); }
    render();
    document.getElementById('nameList').hidden = false;   // \u4FDD\u6301\u9762\u677F\u958B\u8457\u65B9\u4FBF\u9023\u7E8C\u6574\u7406
    return;
  }
  const row = e.target.closest('.name-row:not(.signed)');
  if (!row) return;
  pendingName = row.dataset.name;
  document.getElementById('nameList').hidden = true;
  render();
  const hasEmpty = signups.filter(p => p.pos <= CAP1).length < CAP1;
  toast(hasEmpty ? \`\${pendingName}\uFF0C\u9EDE\u5834\u4E0A\u7684\u7A7A\u4F4D\u5B8C\u6210\u5831\u540D\` : '\u7B2C\u4E00\u5834\u5DF2\u6EFF\uFF0C\u6309\u300C\u5831\u540D\u300D\u6392\u5165\u7B2C\u4E8C\u5834');
});
/* \u9EDE\u9762\u677F\u5916\u9762 \u2192 \u6536\u5408 */
document.addEventListener('click', e => {
  if (!e.target.closest('#nameDD')) document.getElementById('nameList').hidden = true;
});

document.getElementById('goBtn').addEventListener('click', async () => {
  if (!pendingName) { toast('\u5148\u9078\u540D\u5B57\u518D\u5831\u540D'); return; }
  await doSignup(pendingName, null);   // \u4E0D\u6307\u5B9A\u4F4D\u7F6E \u2192 \u4F3A\u670D\u5668\u6392\u6700\u524D\u7A7A\u4F4D
});

document.body.addEventListener('click', async e => {
  /* \u9EDE\u7A7A\u4F4D \u2192 \u7528\u5DF2\u9078\u7684\u540D\u5B57\u5831\u540D\u5230\u8A72\u4F4D\u7F6E */
  const empty = e.target.closest('.slot.empty');
  if (empty && empty.dataset.pos){
    if (refreshStatus() !== 'open') return;
    if (!pendingName){ toast('\u5148\u5728\u4E0B\u9762\u9078\u4F60\u7684\u540D\u5B57'); return; }
    await doSignup(pendingName, Number(empty.dataset.pos));
    return;
  }
  /* \u9EDE\u540D\u5B57\u6676\u7247 \u2192 \u53D6\u6D88\u5831\u540D */
  const chip = e.target.closest('.slot.filled');
  if (!chip) return;
  if (refreshStatus() !== 'open'){ toast('\u5DF2\u622A\u6B62\uFF0C\u540D\u55AE\u9396\u5B9A'); return; }
  const {id, name} = chip.dataset;
  if (!confirm(\`\u78BA\u5B9A\u5E6B\u300C\${name}\u300D\u53D6\u6D88\u9019\u9031\u7684\u5831\u540D\u55CE\uFF1F\`)) return;
  try{
    absorb(await api('cancel', {date: DKEY, id}));
    online = true;
    toast(\`\u5DF2\u53D6\u6D88 \${name} \u7684\u5831\u540D\`);
  }catch(e){ online = false; toast('\u9023\u7DDA\u5931\u6557\uFF0C\u8ACB\u518D\u8A66\u4E00\u6B21'); }
  render();
});

/* \u5207\u63DB\u9031\u6B21\uFF0F\u81EA\u8A02\u65E5\u671F\uFF08\u270E \u4E0A\u758A\u7684\u539F\u751F\u65E5\u671F\u6B04\u4F4D\uFF0C\u6539\u5B8C\u5168\u968A\u540C\u6B65\uFF09 */
document.getElementById('weekTabs').addEventListener('click', e => {
  if (e.target.closest('.edit')) return;   // \u9EDE\u5230\u65E5\u671F\u6B04\u4F4D\u4E0D\u5207\u9801
  const tab = e.target.closest('.week-tab');
  if (!tab) return;
  const i = Number(tab.dataset.idx);
  if (i === selIdx) return;
  selIdx = i; DKEY = WEEK_KEYS[i];
  pendingName = null; signups = []; history = [];
  render(); pull();
});
document.getElementById('weekTabs').addEventListener('change', async e => {
  const inp = e.target.closest('input.tabdate');
  if (!inp || !inp.value) return;
  const slot = Number(inp.dataset.idx);
  const date = inp.value;
  try{
    absorb(await api('settab', {slot: slot + 1, date}));
    online = true;
    selIdx = slot; computeSessions();
    pendingName = null; signups = []; history = [];
    toast(\`\u5834\u6B21\u65E5\u671F\u6539\u70BA \${date.slice(5).replace('-','/')}\`);
    render(); pull();
  }catch(err){
    const msg = String(err.message || err);
    toast(msg.includes('\u5DF2\u5728\u5176\u4ED6\u9801\u7C64') ? '\u9019\u500B\u65E5\u671F\u5DF2\u7D93\u6709\u9801\u7C64\u4E86' : msg.includes('\u904E\u53BB\u7684\u65E5\u671F') ? '\u4E0D\u80FD\u9078\u904E\u53BB\u7684\u65E5\u671F' : '\u9023\u7DDA\u5931\u6557\uFF0C\u8ACB\u518D\u8A66\u4E00\u6B21');
    render();
  }
});

/* \u5718\u9577\u6539\u5834\u5730\u865F\uFF081-6\uFF0C\u5168\u968A\u540C\u6B65\uFF09 */
document.getElementById('courtSel').addEventListener('change', async e => {
  const court = Number(e.target.value);
  try{
    absorb(await api('setcourt', {date: DKEY, court}));
    online = true;
    toast(\`\u5834\u5730\u6539\u70BA \${court} \u865F\u5834\`);
  }catch(err){ online = false; toast('\u9023\u7DDA\u5931\u6557\uFF0C\u8ACB\u518D\u8A66\u4E00\u6B21'); }
  render();
});

/* \u65B0\u589E\u540D\u5B57\uFF08\u9032\u5171\u4EAB roster\uFF09 */
async function addName(){
  const inp = document.getElementById('newName');
  const name = inp.value.split('\\n').map(x => x.replace(/\\s+/g, ' ').trim()).filter(Boolean).slice(0, 3).join('\\n');   // \u53EA\u6709 Enter \u5206\u884C\uFF08\u6700\u591A\u4E09\u884C\uFF09\uFF0C\u7A7A\u683C\u4FDD\u7559\u5728\u540C\u4E00\u884C
  if (!name) return;
  if (name.length > 14) { toast('\u540D\u5B57\u592A\u9577\u4E86'); return; }
  if (roster.includes(name)) { toast('\u540D\u55AE\u88E1\u5DF2\u7D93\u6709\u9019\u500B\u540D\u5B57'); inp.value = ''; inp.rows = 1; render(); return; }
  try{
    absorb(await api('addname', {name, date: DKEY}));
    online = true; inp.value = ''; inp.rows = 1;
    /* \u52A0\u5B8C\u76F4\u63A5\u9032\u5165\u9078\u4F4D\u6D41\u7A0B\uFF1A\u6536\u5408\u6298\u758A\u5340\u3001\u540D\u5B57\u4E0A\u9078\u55AE\u3001\u7A7A\u4F4D\u958B\u59CB\u9583
       \u7B2C\u4E00\u5834\u5DF2\u6EFF \u2192 \u4E0D\u7528\u9078\uFF0C\u76F4\u63A5\u81EA\u52D5\u6392\u5165\u4E0B\u4E00\u500B\u865F\u78BC\uFF089 \u8D77\u8DF3\uFF09 */
    if (refreshStatus() === 'open' && !signups.some(p => p.name === name)){
      document.querySelector('details.fold').removeAttribute('open');
      const full1 = signups.filter(p => p.pos <= CAP1).length >= CAP1;
      if (full1){
        await doSignup(name, null);   // \u4F3A\u670D\u5668\u81EA\u52D5\u7D66\u6700\u524D\u7A7A\u865F
        document.getElementById('court2Card').scrollIntoView({behavior:'smooth', block:'center'});
        return;
      }
      pendingName = name;
      render();
      document.querySelector('.court-sec').scrollIntoView({behavior:'smooth', block:'center'});
      toast(\`\${name} \u5DF2\u52A0\u5165\uFF01\u9EDE\u5834\u4E0A\u7684\u7A7A\u4F4D\u9078\u4F60\u7684\u4F4D\u7F6E\`);
      return;
    }
    toast(\`\u5DF2\u628A \${name} \u52A0\u9032\u540D\u55AE\`);
  }catch(e){ online = false; toast('\u9023\u7DDA\u5931\u6557\uFF0C\u8ACB\u518D\u8A66\u4E00\u6B21'); }
  render();
}
document.getElementById('addBtn').addEventListener('click', addName);
/* Enter\uFF1D\u63DB\u884C\uFF08\u76F4\u6392\u5206\u6BB5\uFF09\uFF0C\u6700\u591A\u4E09\u884C\uFF1B\u9001\u51FA\u7528\u300C\u52A0\u5165\u300D\u6309\u9215 */
document.getElementById('newName').addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.value.split('\\n').length >= 3) e.preventDefault();
});
document.getElementById('newName').addEventListener('input', e => {
  e.target.rows = Math.min(3, e.target.value.split('\\n').length);
});

/* \u5206\u4EAB */
document.getElementById('shareBtn').addEventListener('click', async () => {
  try{ await navigator.clipboard.writeText(location.href); toast('\u9023\u7D50\u5DF2\u8907\u88FD\uFF0C\u8CBC\u5230 LINE \u7FA4\u5427'); }
  catch(e){ prompt('\u8907\u88FD\u9019\u500B\u9023\u7D50\uFF1A', location.href); }
});

/* ================= \u555F\u52D5 ================= */
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600);
}
if (DEMO){
  const pill = document.createElement('span');
  pill.className = 'pill closed'; pill.textContent = 'DEMO \u9810\u89BD';
  document.querySelector('.status-row').appendChild(pill);
} else { loadCache(); }
render(); pull();
setInterval(pull, POLL_MS);
document.addEventListener('visibilitychange', () => { if (!document.hidden) pull(); });
setInterval(refreshStatus, 30000);
<\/script>
</body>
</html>
`;
var CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type"
};
var J = /* @__PURE__ */ __name((o, status = 200) => new Response(JSON.stringify(o), {
  status,
  headers: { "content-type": "application/json", ...CORS }
}), "J");
function kvOf(env) {
  for (const k of ["KV", "DATA", "SIGNUPS", "BADMINTON"]) {
    if (env[k] && typeof env[k].get === "function") return env[k];
  }
  for (const v of Object.values(env)) {
    if (v && typeof v.get === "function" && typeof v.put === "function") return v;
  }
  return null;
}
__name(kvOf, "kvOf");
var DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
var TPE = 8 * 3600 * 1e3;
var sessionOver = /* @__PURE__ */ __name((ds) => Date.now() > Date.parse(ds + "T18:00:00+08:00"), "sessionOver");
var plusDays = /* @__PURE__ */ __name((ds, n) => {
  const d = /* @__PURE__ */ new Date(ds + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}, "plusDays");
function nextSat() {
  const d = new Date(Date.now() + TPE);
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + (6 - d.getUTCDay() + 7) % 7);
  let s = d.toISOString().slice(0, 10);
  while (sessionOver(s)) s = plusDays(s, 7);
  return s;
}
__name(nextSat, "nextSat");
async function readTabs(kv) {
  let t = await kv.get("tabs", "json");
  let changed = false;
  if (!Array.isArray(t) || t.length !== 3 || !t.every((x) => typeof x === "string" && DATE_RE.test(x))) {
    const base = nextSat();
    const old = Array.isArray(t) ? t : [];
    t = [
      base,
      old[0] && DATE_RE.test(old[0]) && !sessionOver(old[0]) ? old[0] : plusDays(base, 7),
      old[1] && DATE_RE.test(old[1]) && !sessionOver(old[1]) ? old[1] : plusDays(base, 14)
    ];
    changed = true;
  }
  while (sessionOver(t[0])) {
    t.shift();
    let cand = nextSat();
    while (t.includes(cand)) cand = plusDays(cand, 7);
    t.push(cand);
    changed = true;
  }
  if (changed) await kv.put("tabs", JSON.stringify(t));
  return t;
}
__name(readTabs, "readTabs");
var norm = /* @__PURE__ */ __name((x) => ({ id: x.id || crypto.randomUUID(), name: x.name || x.n || "", at: x.at || 0, pos: x.pos | 0 }), "norm");
var normName = /* @__PURE__ */ __name((v) => String(v || "").split("\n").map((l) => l.replace(/[^\S\n]+/g, " ").trim()).filter(Boolean).slice(0, 3).join("\n").slice(0, 20), "normName");
function backfillPos(list) {
  const taken = new Set(list.filter((x) => x.pos >= 1).map((x) => x.pos));
  for (const x of list) {
    if (x.pos >= 1) continue;
    let p = 1;
    while (taken.has(p)) p++;
    x.pos = p;
    taken.add(p);
  }
  return list;
}
__name(backfillPos, "backfillPos");
function lowestFree(list) {
  const taken = new Set(list.map((x) => x.pos));
  let p = 1;
  while (taken.has(p)) p++;
  return p;
}
__name(lowestFree, "lowestFree");
async function readSignups(kv, date) {
  let v = await kv.get("s:" + date, "json");
  if (v === null && SEED_SIGNUPS[date]) {
    v = SEED_SIGNUPS[date];
    await kv.put("s:" + date, JSON.stringify(v));
  }
  return Array.isArray(v) ? backfillPos(v.map(norm)) : [];
}
__name(readSignups, "readSignups");
async function readRoster(kv) {
  let v = await kv.get("roster", "json");
  if (!Array.isArray(v) || !v.length) {
    v = SEED_ROSTER;
    await kv.put("roster", JSON.stringify(v));
  }
  return v;
}
__name(readRoster, "readRoster");
async function buildState(kv, date, withHist) {
  const [signups, roster, court, tabs] = await Promise.all([
    readSignups(kv, date),
    readRoster(kv),
    kv.get("c:" + date),
    readTabs(kv)
  ]);
  const out = { signups, roster, court: Math.min(Math.max(parseInt(court) || 1, 1), 6), tabs };
  if (withHist) {
    out.history = [];
    const base = /* @__PURE__ */ new Date(date + "T00:00:00Z");
    for (let i = 1; i <= 4; i++) {
      const d = new Date(base);
      d.setUTCDate(d.getUTCDate() - 7 * i);
      const k = d.toISOString().slice(0, 10);
      const s = await readSignups(kv, k);
      if (s.length) out.history.push({ date: k, names: s.map((x) => x.name) });
    }
  }
  return out;
}
__name(buildState, "buildState");
var worker_default = {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (!url.pathname.startsWith("/api/")) {
      return new Response(HTML, { headers: { "content-type": "text/html;charset=utf-8", "cache-control": "no-cache" } });
    }
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
    const kv = kvOf(env);
    if (!kv) return J({ error: "KV binding missing \u2014 Worker \u8A2D\u5B9A\u88E1\u8981\u7D81\u4E00\u500B KV namespace" }, 500);
    const p = url.pathname.slice(5);
    try {
      if (p === "state") {
        const date = url.searchParams.get("date") || "";
        if (!DATE_RE.test(date)) return J({ error: "bad date" }, 400);
        const out = await buildState(kv, date, url.searchParams.get("hist") === "1");
        const all = (url.searchParams.get("all") || "").split(",").filter((k) => DATE_RE.test(k)).slice(0, 6);
        if (all.length) {
          out.counts = {};
          for (const k of all) out.counts[k] = (k === date ? out.signups : await readSignups(kv, k)).length;
        }
        return J(out);
      }
      if (req.method !== "POST") return J({ error: "POST required" }, 405);
      const b = await req.json();
      if (p === "signup") {
        const date = String(b.date || ""), name = normName(b.name);
        if (!DATE_RE.test(date) || !name) return J({ error: "bad request" }, 400);
        const wantPos = Number.isInteger(b.pos) && b.pos >= 1 && b.pos <= 48 ? b.pos : null;
        const s = await readSignups(kv, date);
        if (!s.some((x) => x.name === name)) {
          if (wantPos && s.some((x) => x.pos === wantPos)) return J({ error: "position taken" }, 409);
          s.push({ id: crypto.randomUUID(), name, at: Date.now(), pos: wantPos || lowestFree(s) });
          await kv.put("s:" + date, JSON.stringify(s));
        }
        return J(await buildState(kv, date, true));
      }
      if (p === "settab") {
        const slot = parseInt(b.slot), date = String(b.date || "");
        if (!(slot >= 1 && slot <= 3) || !DATE_RE.test(date)) return J({ error: "bad request" }, 400);
        if (sessionOver(date)) return J({ error: "\u4E0D\u80FD\u9078\u5DF2\u7D93\u904E\u53BB\u7684\u65E5\u671F" }, 400);
        const tabs = await readTabs(kv);
        if (tabs.includes(date) && tabs[slot - 1] !== date) return J({ error: "\u9019\u500B\u65E5\u671F\u5DF2\u5728\u5176\u4ED6\u9801\u7C64" }, 400);
        tabs[slot - 1] = date;
        await kv.put("tabs", JSON.stringify(tabs));
        return J({ tabs });
      }
      if (p === "setcourt") {
        const date = String(b.date || ""), court = parseInt(b.court);
        if (!DATE_RE.test(date) || !(court >= 1 && court <= 6)) return J({ error: "bad request" }, 400);
        await kv.put("c:" + date, String(court));
        return J(await buildState(kv, date, false));
      }
      if (p === "cancel") {
        const date = String(b.date || "");
        if (!DATE_RE.test(date) || !b.id) return J({ error: "bad request" }, 400);
        const s = (await readSignups(kv, date)).filter((x) => x.id !== b.id);
        await kv.put("s:" + date, JSON.stringify(s));
        return J(await buildState(kv, date, true));
      }
      if (p === "delname") {
        const name = String(b.name || "").trim();
        if (!name) return J({ error: "bad request" }, 400);
        const roster = (await readRoster(kv)).filter((x) => x !== name);
        await kv.put("roster", JSON.stringify(roster));
        return J({ roster });
      }
      if (p === "addname") {
        const name = normName(b.name);
        if (!name) return J({ error: "bad request" }, 400);
        const roster = await readRoster(kv);
        if (!roster.includes(name)) {
          roster.push(name);
          roster.sort((a, c) => a.localeCompare(c, "zh-Hant"));
          await kv.put("roster", JSON.stringify(roster));
        }
        const date = DATE_RE.test(String(b.date || "")) ? b.date : null;
        return J(date ? await buildState(kv, date, false) : { roster });
      }
      return J({ error: "not found" }, 404);
    } catch (e) {
      return J({ error: String(e) }, 500);
    }
  }
};

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-xxDuYY/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-xxDuYY/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
