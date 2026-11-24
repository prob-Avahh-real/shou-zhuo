import test from 'node:test';
import assert from 'node:assert/strict';
import { categorizeApp, createApp, organizeApps, buildOrganizePlan, recategorizeAll } from '../src/organizer.js';
import { searchCatalog, findInCatalog } from '../src/catalog.js';

test('categorizeApp recognizes 微信 as social', () => {
  const r = categorizeApp('微信');
  assert.equal(r.categoryId, 'social');
  assert.equal(r.confidence, 1);
});

test('categorizeApp infers shopping from keyword', () => {
  const r = categorizeApp('某某商城');
  assert.equal(r.categoryId, 'shopping');
  assert.ok(r.confidence > 0.4);
});

test('createApp assigns id and name', () => {
  const app = createApp('支付宝');
  assert.equal(app.name, '支付宝');
  assert.equal(app.categoryId, 'finance');
  assert.ok(app.id);
});

test('organizeApps groups by category', () => {
  const apps = [
    createApp('微信'),
    createApp('QQ'),
    createApp('支付宝'),
    createApp('淘宝'),
  ];
  const layout = organizeApps(apps);
  assert.ok(layout.folders.length >= 2);
  assert.equal(layout.stats.totalApps, 4);
  const socialFolder = layout.folders.find((f) => f.label.startsWith('社交'));
  assert.ok(socialFolder);
  assert.equal(socialFolder.apps.length, 2);
});

test('buildOrganizePlan includes dock and folders', () => {
  const apps = [createApp('微信'), createApp('电话'), createApp('Safari'), createApp('相机')];
  const layout = organizeApps(apps);
  const plan = buildOrganizePlan(layout);
  assert.match(plan, /收桌整理方案/);
  assert.match(plan, /Dock/);
});

test('recategorizeAll updates categories', () => {
  const apps = [{ id: '1', name: '抖音', categoryId: 'other', confidence: 0, reason: '' }];
  const updated = recategorizeAll(apps);
  assert.equal(updated[0].categoryId, 'social');
});

test('searchCatalog finds partial match', () => {
  const results = searchCatalog('微');
  assert.ok(results.some((a) => a.name === '微信'));
});

test('findInCatalog resolves alias', () => {
  const app = findInCatalog('WeChat');
  assert.ok(app);
  assert.equal(app.name, '微信');
});
