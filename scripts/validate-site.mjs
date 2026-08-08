import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const indexPath = path.join(projectRoot, 'src', 'pages', 'index.astro');

const matches = (text, pattern) => [...text.matchAll(pattern)];

export function validateSite() {
  const html = readFileSync(indexPath, 'utf8');
  const cname = readFileSync(path.join(projectRoot, 'public', 'CNAME'), 'utf8').trim();

  assert.match(html, /^<!doctype html>/i, 'the home page must declare an HTML5 doctype');
  assert.match(html, /<html\b[^>]*\blang="zh-CN"/i, 'document language must be zh-CN');
  assert.match(html, /<meta\s+charset="utf-8"\s*\/>/i, 'UTF-8 charset declaration is required');
  assert.match(
    html,
    /<meta\s+name="viewport"\s+content="[^"]+"\s*\/>/i,
    'viewport metadata is required',
  );
  assert.match(
    html,
    /<meta\s+name="description"\s+content="[^"]+"\s*\/>/i,
    'description metadata is required',
  );
  assert.match(
    html,
    /<link\s+rel="canonical"\s+href="https:\/\/skayn\.net\/"\s*\/>/i,
    'canonical URL must be https://skayn.net/',
  );
  assert.doesNotMatch(html, /skayn\.com/i, 'the unavailable skayn.com domain must not appear');
  assert.equal(cname, 'skayn.net', 'public/CNAME must publish the approved domain');

  const ids = matches(html, /\bid="([^"]+)"/g).map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'element IDs must be unique');

  const internalTargets = matches(html, /href="#([^"]+)"/g).map((match) => match[1]);
  for (const target of internalTargets) {
    assert.ok(ids.includes(target), `internal link target #${target} must exist`);
  }

  const localReferences = matches(html, /\b(?:href|src)="([^"]+)"/g)
    .map((match) => match[1])
    .filter((reference) => !/^(?:#|https?:|mailto:|tel:|data:)/i.test(reference));
  for (const reference of localReferences) {
    const cleanReference = reference.split(/[?#]/, 1)[0];
    const normalizedReference = cleanReference.replace(/^\.\//, '');
    const assetRoot =
      cleanReference.startsWith('/') || !normalizedReference.includes('/')
        ? path.join(projectRoot, 'public')
        : path.dirname(indexPath);
    const relativeAssetPath = cleanReference.startsWith('/')
      ? normalizedReference
      : normalizedReference;
    assert.ok(
      existsSync(path.join(assetRoot, relativeAssetPath)),
      `local asset ${cleanReference} must exist`,
    );
  }

  const inlineScripts = matches(html, /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)
    .map((match) => match[1])
    .filter((source) => source.trim().length > 0);
  for (const [index, source] of inlineScripts.entries()) {
    assert.doesNotThrow(() => new Function(source), `inline script ${index + 1} must parse`);
  }

  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/i)?.[0] ?? '';
  assert.ok(footer, 'site footer must exist');
  assert.match(footer, /href="https:\/\/skayn\.net\/"/i, 'footer must link to skayn.net');
  assert.doesNotMatch(footer, /href="#/i, 'footer must not duplicate primary in-page navigation');

  return {
    ids: ids.length,
    inlineScripts: inlineScripts.length,
    internalLinks: internalTargets.length,
    localReferences: localReferences.length,
  };
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const result = validateSite();
  console.log(
    `Site validation passed: ${result.ids} IDs, ${result.internalLinks} internal links, ` +
      `${result.localReferences} local assets, ${result.inlineScripts} inline scripts.`,
  );
}
