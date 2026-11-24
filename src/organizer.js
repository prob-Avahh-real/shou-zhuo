import { findInCatalog, KEYWORD_RULES, DOCK_CANDIDATES } from './catalog.js';
import { CATEGORY_BY_ID, MAX_APPS_PER_FOLDER, DOCK_SLOTS, CATEGORIES } from './categories.js';

/**
 * 为单个应用推断分类
 * @returns {{ categoryId: string, confidence: number, reason: string }}
 */
export function categorizeApp(name) {
  const trimmed = name.trim();
  if (!trimmed) return { categoryId: 'other', confidence: 0, reason: '空名称' };

  const known = findInCatalog(trimmed);
  if (known) {
    return {
      categoryId: known.category,
      confidence: 1,
      reason: `识别为「${known.name}」`,
    };
  }

  const lower = trimmed.toLowerCase();
  let best = { categoryId: 'other', score: 0, keyword: '' };
  for (const rule of KEYWORD_RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw.toLowerCase()) && kw.length > best.score) {
        best = { categoryId: rule.category, score: kw.length, keyword: kw };
      }
    }
  }
  if (best.score > 0) {
    const label = CATEGORY_BY_ID[best.categoryId]?.label ?? best.categoryId;
    return {
      categoryId: best.categoryId,
      confidence: Math.min(0.85, 0.4 + best.score * 0.08),
      reason: `名称含「${best.keyword}」→ ${label}`,
    };
  }

  return { categoryId: 'other', confidence: 0.2, reason: '未匹配规则，归入其他' };
}

/**
 * @typedef {{ id: string, name: string, categoryId: string, confidence: number, reason: string, pinned?: boolean }} UserApp
 */

export function createApp(name, overrides = {}) {
  const { categoryId, confidence, reason } = categorizeApp(name);
  return {
    id: crypto.randomUUID?.() ?? `app-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: name.trim(),
    categoryId: overrides.categoryId ?? categoryId,
    confidence: overrides.categoryId ? 1 : confidence,
    reason: overrides.categoryId ? '手动指定分类' : reason,
    pinned: false,
    ...overrides,
  };
}

/**
 * 将应用列表整理为文件夹布局
 * @param {UserApp[]} apps
 * @param {{ maxPerFolder?: number }} opts
 */
export function organizeApps(apps, opts = {}) {
  const maxPer = opts.maxPerFolder ?? MAX_APPS_PER_FOLDER;
  const byCategory = new Map();

  for (const app of apps) {
    const cat = app.categoryId || 'other';
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat).push(app);
  }

  /** @type {{ id: string, label: string, emoji: string, color: string, apps: UserApp[] }[]} */
  const folders = [];

  for (const cat of CATEGORIES) {
    const list = byCategory.get(cat.id);
    if (!list?.length) continue;
    list.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
    for (let i = 0; i < list.length; i += maxPer) {
      const chunk = list.slice(i, i + maxPer);
      const suffix = list.length > maxPer ? ` ${Math.floor(i / maxPer) + 1}` : '';
      folders.push({
        id: `${cat.id}-${i}`,
        label: cat.label + suffix,
        emoji: cat.emoji,
        color: cat.color,
        apps: chunk,
      });
    }
  }

  const dock = pickDockApps(apps);

  return {
    folders,
    dock,
    stats: {
      totalApps: apps.length,
      folderCount: folders.length,
      categoryCount: byCategory.size,
    },
  };
}

function pickDockApps(apps) {
  const pinned = apps.filter((a) => a.pinned);
  const pool = pinned.length ? pinned : apps.filter((a) =>
    DOCK_CANDIDATES.some((d) =>
      a.name.toLowerCase() === d.toLowerCase() ||
      a.name.includes(d),
    ),
  );
  const seen = new Set();
  const dock = [];
  for (const app of pool) {
    if (seen.has(app.id)) continue;
    seen.add(app.id);
    dock.push(app);
    if (dock.length >= DOCK_SLOTS) break;
  }
  return dock;
}

/**
 * 生成可执行的整理步骤（iOS 需手动拖放）
 */
export function buildOrganizePlan(layout) {
  const lines = [];
  lines.push('📱 收桌整理方案');
  lines.push('');
  lines.push('说明：iOS 不允许第三方直接移动桌面图标，请按下列步骤手动整理（约 5–10 分钟）。');
  lines.push('');

  if (layout.dock.length) {
    lines.push('① Dock 栏（底部固定 4 个）');
    layout.dock.forEach((a, i) => lines.push(`   ${i + 1}. ${a.name}`));
    lines.push('');
  }

  lines.push(`② 创建 ${layout.folders.length} 个文件夹`);
  layout.folders.forEach((folder, fi) => {
    lines.push(`   ${fi + 1}. 文件夹「${folder.emoji} ${folder.label}」`);
    folder.apps.forEach((a) => lines.push(`      · ${a.name}`));
  });
  lines.push('');
  lines.push('③ 操作提示');
  lines.push('   · 长按图标 → 编辑主屏幕 → 拖入文件夹');
  lines.push('   · 同类 App 收进同一文件夹后，主屏幕只留文件夹 + Dock');
  lines.push('   · 不常用 App 可移到 App 资源库（拖到最右屏）');
  lines.push('');
  lines.push(`共 ${layout.stats.totalApps} 个应用 → ${layout.stats.folderCount} 个文件夹`);

  return lines.join('\n');
}

export function recategorizeAll(apps) {
  return apps.map((app) => {
    const { categoryId, confidence, reason } = categorizeApp(app.name);
    return { ...app, categoryId, confidence, reason };
  });
}
