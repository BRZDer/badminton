#!/usr/bin/env python3
"""跨引擎實測第二場：名牌與場線對位、收合、12 人展開。用法：webkit_check.py [URL]"""
import sys
from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8899/index.html?demo=1'

PROBE = """
() => {
  const names = ['米革力','木每女臣','女ネ申','亻｜㣊 金名','阝可氵原','艹艹 一一 羋羋',
                 '阿彰','小林','阿翔','阿德','阿凱','小美'];
  const measure = () => {
    const card = document.getElementById('court2Card');
    const cr = card.getBoundingClientRect();
    const svg = card.querySelector('.court-svg').getBoundingClientRect();
    const slots = [...card.querySelectorAll('.slots > *')].slice(0, 4);
    return {
      svgRatio: +(svg.height / svg.width).toFixed(4),
      cardH: Math.round(cr.height),
      fullH: Math.round(cr.width * 570 / 610),
      unlocked: card.className.includes('unlocked'),
      slotPos: slots.map(s => {
        const r = s.getBoundingClientRect();
        return [((r.left + r.right) / 2 - cr.left) / cr.width,
                ((r.top + r.bottom) / 2 - cr.top) / cr.width];
      })
    };
  };
  const out = {};
  for (const n of [6, 11, 12]) {
    signups = names.slice(0, n).map((x, i) => ({id: 'w' + i, name: x, at: i + 1, pos: i + 1}));
    render();
    out[n] = measure();
  }
  return out;
}
"""

TOL = 0.002  # 次像素捨入容差


def check(engine_name, launcher):
    pg = launcher.new_page(viewport={'width': 390, 'height': 844})
    pg.goto(URL, wait_until='networkidle')
    res = pg.evaluate(PROBE)
    pg.close()

    ref = res['12']['slotPos']
    ok = True
    print(f'\n===== {engine_name} =====')
    print('  SVG 比例（應皆 0.9344）:', {k: v['svgRatio'] for k, v in res.items()})
    for k in ('6', '11'):
        worst = max(abs(a[i] - b[i]) for a, b in zip(res[k]['slotPos'], ref) for i in (0, 1))
        good = worst <= TOL
        ok &= good
        print(f'  {k} 人 名牌對位與完整球場一致: {good}（最大誤差 {worst:.5f}）')
    for k, want in (('6', False), ('11', False), ('12', True)):
        full = abs(res[k]['cardH'] - res[k]['fullH']) < 2
        good = full == want
        ok &= good
        print(f'  {k} 人 {"完整展開" if want else "收合"}: {good}'
              f'（卡片 {res[k]["cardH"]} / 完整 {res[k]["fullH"]}）')
    ok &= all(v['svgRatio'] == 0.9344 for v in res.values())
    print(f'  → {engine_name} {"全部通過" if ok else "有問題"}')
    return ok


with sync_playwright() as p:
    allok = True
    for name, bt in (('WebKit (Safari 引擎)', p.webkit), ('Chromium', p.chromium)):
        b = bt.launch()
        allok &= check(name, b)
        b.close()

print('\n總結:', '兩個引擎全過' if allok else '仍有問題')
sys.exit(0 if allok else 1)
