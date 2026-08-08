import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { validateSite } from '../scripts/validate-site.mjs';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const html = readFileSync(path.join(projectRoot, 'src', 'pages', 'index.astro'), 'utf8');

test('the published site contract is valid', () => {
  const result = validateSite();
  assert.ok(result.ids > 0);
  assert.equal(result.inlineScripts, 2);
});

test('primary navigation maps to the three dynamic views', () => {
  for (const view of ['download', 'security', 'support']) {
    assert.match(html, new RegExp(`<section[^>]+id="${view}"`));
    assert.match(html, new RegExp(`<a[^>]+href="#${view}"`));
  }
});

test('footer contains published identity only', () => {
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/i)?.[0] ?? '';
  assert.match(footer, />skayn\.net<\/a>/i);
  assert.match(footer, /© 2026 Skayn/);
  assert.doesNotMatch(footer, /隐私政策|服务条款|服务状态|联系支持/);
});
