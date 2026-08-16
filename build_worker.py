#!/usr/bin/env python3
"""把 index.html 打包進 worker.js（Cloudflare Worker 單檔，可直接貼 dashboard 或 wrangler deploy）"""
import json, pathlib

ROOT = pathlib.Path(__file__).parent
html = (ROOT / 'index.html').read_text()

# SEED：覆蓋部署當下的既有報名資料（2026-08-16 自舊版 API 備份），
# 只在 KV 對應 key 不存在時寫入，永不覆蓋既有資料
seed_signups = {
    "2026-08-22": [
        {"id": "b170e7bc-47bf-4fa3-9035-455ca389084a", "name": "米革力", "at": 1786865205920},
        {"id": "51297712-d326-4484-9451-ba35fde053c1", "name": "木每女臣", "at": 1786865212036},
        {"id": "f3e2f04e-d39c-46a5-8070-c32c99e7a5a2", "name": "女神", "at": 1786865218495},
    ]
}
seed_roster = ["Miller", "女神", "米革力", "木每女臣"]

worker = r'''// 淡水乳酸堆起 週六羽球報名 — Cloudflare Worker（UI + API + KV）
// 由 build_worker.py 產生，勿直接編輯；改 index.html 後重跑 python3 build_worker.py
const SEED_SIGNUPS = __SEED_SIGNUPS__;
const SEED_ROSTER = __SEED_ROSTER__;
const HTML = __HTML__;

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,POST,OPTIONS',
  'access-control-allow-headers': 'content-type',
};
const J = (o, status = 200) => new Response(JSON.stringify(o), {
  status, headers: { 'content-type': 'application/json', ...CORS },
});

// KV binding 名稱不固定（dashboard 建的可能叫任何名字）→ 動態尋找
function kvOf(env) {
  for (const k of ['KV', 'DATA', 'SIGNUPS', 'BADMINTON']) {
    if (env[k] && typeof env[k].get === 'function') return env[k];
  }
  for (const v of Object.values(env)) {
    if (v && typeof v.get === 'function' && typeof v.put === 'function') return v;
  }
  return null;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const norm = x => ({ id: x.id || crypto.randomUUID(), name: x.name || x.n || '', at: x.at || 0 });

async function readSignups(kv, date) {
  let v = await kv.get('s:' + date, 'json');
  if (v === null && SEED_SIGNUPS[date]) {
    v = SEED_SIGNUPS[date];
    await kv.put('s:' + date, JSON.stringify(v));
  }
  return Array.isArray(v) ? v.map(norm) : [];
}
async function readRoster(kv) {
  let v = await kv.get('roster', 'json');
  if (!Array.isArray(v) || !v.length) {
    v = SEED_ROSTER;
    await kv.put('roster', JSON.stringify(v));
  }
  return v;
}
async function buildState(kv, date, withHist) {
  const [signups, roster] = await Promise.all([readSignups(kv, date), readRoster(kv)]);
  const out = { signups, roster };
  if (withHist) {
    out.history = [];
    const base = new Date(date + 'T00:00:00Z');
    for (let i = 1; i <= 4; i++) {
      const d = new Date(base); d.setUTCDate(d.getUTCDate() - 7 * i);
      const k = d.toISOString().slice(0, 10);
      const s = await readSignups(kv, k);
      if (s.length) out.history.push({ date: k, names: s.map(x => x.name) });
    }
  }
  return out;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (!url.pathname.startsWith('/api/')) {
      return new Response(HTML, { headers: { 'content-type': 'text/html;charset=utf-8', 'cache-control': 'no-cache' } });
    }
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
    const kv = kvOf(env);
    if (!kv) return J({ error: 'KV binding missing — Worker 設定裡要綁一個 KV namespace' }, 500);
    const p = url.pathname.slice(5);
    try {
      if (p === 'state') {
        const date = url.searchParams.get('date') || '';
        if (!DATE_RE.test(date)) return J({ error: 'bad date' }, 400);
        return J(await buildState(kv, date, url.searchParams.get('hist') === '1'));
      }
      if (req.method !== 'POST') return J({ error: 'POST required' }, 405);
      const b = await req.json();
      if (p === 'signup') {
        const date = String(b.date || ''), name = String(b.name || '').trim().slice(0, 20);
        if (!DATE_RE.test(date) || !name) return J({ error: 'bad request' }, 400);
        const s = await readSignups(kv, date);
        if (!s.some(x => x.name === name)) {
          s.push({ id: crypto.randomUUID(), name, at: Date.now() });
          await kv.put('s:' + date, JSON.stringify(s));
        }
        return J(await buildState(kv, date, true));
      }
      if (p === 'cancel') {
        const date = String(b.date || '');
        if (!DATE_RE.test(date) || !b.id) return J({ error: 'bad request' }, 400);
        const s = (await readSignups(kv, date)).filter(x => x.id !== b.id);
        await kv.put('s:' + date, JSON.stringify(s));
        return J(await buildState(kv, date, true));
      }
      if (p === 'addname') {
        const name = String(b.name || '').trim().slice(0, 20);
        if (!name) return J({ error: 'bad request' }, 400);
        const roster = await readRoster(kv);
        if (!roster.includes(name)) {
          roster.push(name);
          roster.sort((a, c) => a.localeCompare(c, 'zh-Hant'));
          await kv.put('roster', JSON.stringify(roster));
        }
        const date = DATE_RE.test(String(b.date || '')) ? b.date : null;
        return J(date ? await buildState(kv, date, false) : { roster });
      }
      return J({ error: 'not found' }, 404);
    } catch (e) {
      return J({ error: String(e) }, 500);
    }
  },
};
'''

worker = worker.replace('__SEED_SIGNUPS__', json.dumps(seed_signups, ensure_ascii=False))
worker = worker.replace('__SEED_ROSTER__', json.dumps(seed_roster, ensure_ascii=False))
worker = worker.replace('__HTML__', json.dumps(html, ensure_ascii=False))
(ROOT / 'worker.js').write_text(worker)
print(f'worker.js generated: {len(worker)} bytes')
