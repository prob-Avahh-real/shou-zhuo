import { searchCatalog } from './catalog.js';
import { CATEGORY_BY_ID, CATEGORIES } from './categories.js';
import {
  createApp,
  organizeApps,
  buildOrganizePlan,
  recategorizeAll,
} from './organizer.js';
import { loadApps, saveApps, clearApps } from './storage.js';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const appInput = $('#app-input');
const addBtn = $('#add-app');
const suggestionsEl = $('#suggestions');
const appListEl = $('#app-list');
const folderGridEl = $('#folder-grid');
const dockEl = $('#dock');
const statsEl = $('#stats');
const statusEl = $('#status');
const organizeBtn = $('#organize-btn');
const exportBtn = $('#export-btn');
const resetBtn = $('#reset-btn');
const planModal = $('#plan-modal');
const planText = $('#plan-text');
const closePlanBtn = $('#close-plan');
const copyPlanBtn = $('#copy-plan');
const viewTabs = $$('.view-tab');
const panelApps = $('#panel-apps');
const panelPreview = $('#panel-preview');
const categorySelect = $('#category-override');

let apps = loadApps();
let layout = organizeApps(apps);
let activeFolderIndex = 0;
let activeView = 'apps';
let suggestTimer = null;

function setStatus(text, kind = '') {
  statusEl.textContent = text;
  statusEl.dataset.kind = kind;
}

function persist() {
  saveApps(apps);
  layout = organizeApps(apps);
  renderAll();
}

function renderAll() {
  renderAppList();
  renderPreview();
  renderStats();
}

function renderStats() {
  const { totalApps, folderCount, categoryCount } = layout.stats;
  statsEl.textContent = `${totalApps} 个应用 · ${folderCount} 个文件夹 · ${categoryCount} 类`;
}

function renderAppList() {
  appListEl.innerHTML = '';
  if (!apps.length) {
    appListEl.innerHTML = '<p class="empty">还没有应用，在上方搜索添加</p>';
    return;
  }
  const sorted = [...apps].sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
  for (const app of sorted) {
    const cat = CATEGORY_BY_ID[app.categoryId] ?? CATEGORY_BY_ID.other;
    const row = document.createElement('div');
    row.className = 'app-row';
    row.innerHTML = `
      <div class="app-row-main">
        <span class="app-dot" style="--c:${cat.color}"></span>
        <span class="app-name">${escapeHtml(app.name)}</span>
        <span class="app-cat">${cat.emoji} ${cat.label}</span>
      </div>
      <div class="app-row-meta">${Math.round(app.confidence * 100)}%</div>
      <button type="button" class="icon-btn del" aria-label="删除">×</button>
    `;
    row.querySelector('.del').addEventListener('click', () => {
      apps = apps.filter((a) => a.id !== app.id);
      persist();
      setStatus(`已移除 ${app.name}`, 'ok');
    });
    row.querySelector('.app-row-main').addEventListener('click', () => {
      cycleCategory(app.id);
    });
    appListEl.appendChild(row);
  }
}

function cycleCategory(id) {
  const app = apps.find((a) => a.id === id);
  if (!app) return;
  const ids = CATEGORIES.map((c) => c.id);
  const idx = ids.indexOf(app.categoryId);
  app.categoryId = ids[(idx + 1) % ids.length];
  app.confidence = 1;
  app.reason = '手动调整分类';
  persist();
  setStatus(`${app.name} → ${CATEGORY_BY_ID[app.categoryId].label}`, 'ok');
}

function renderPreview() {
  folderGridEl.innerHTML = '';
  dockEl.innerHTML = '';

  layout.folders.forEach((folder, i) => {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'folder-cell' + (i === activeFolderIndex ? ' active' : '');
    cell.style.setProperty('--folder-color', folder.color);
    cell.innerHTML = `
      <span class="folder-icon">${folder.emoji}</span>
      <span class="folder-label">${escapeHtml(folder.label)}</span>
      <span class="folder-count">${folder.apps.length}</span>
    `;
    cell.addEventListener('click', () => {
      activeFolderIndex = i;
      renderPreview();
    });
    folderGridEl.appendChild(cell);
  });

  const folder = layout.folders[activeFolderIndex];
  const detail = $('#folder-detail');
  if (folder) {
    detail.innerHTML = `
      <h3>${folder.emoji} ${escapeHtml(folder.label)}</h3>
      <div class="mini-icons">
        ${folder.apps.map((a) => `<span class="mini-icon" title="${escapeHtml(a.name)}">${initials(a.name)}</span>`).join('')}
      </div>
    `;
  } else {
    detail.innerHTML = '<p class="empty">添加应用后点「收桌」生成分类</p>';
  }

  for (const app of layout.dock) {
    const d = document.createElement('div');
    d.className = 'dock-icon';
    d.textContent = initials(app.name);
    d.title = app.name;
    dockEl.appendChild(d);
  }
}

function initials(name) {
  return name.slice(0, 1);
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function showSuggestions(query) {
  const list = searchCatalog(query);
  suggestionsEl.innerHTML = '';
  if (!query.trim() && !list.length) {
    suggestionsEl.hidden = true;
    return;
  }
  suggestionsEl.hidden = false;
  for (const item of list) {
    const cat = CATEGORY_BY_ID[item.category];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'suggest-item';
    btn.innerHTML = `<span>${escapeHtml(item.name)}</span><span>${cat.emoji}</span>`;
    btn.addEventListener('click', () => addAppByName(item.name, item.category));
    suggestionsEl.appendChild(btn);
  }
}

function addAppByName(name, categoryId) {
  const exists = apps.some((a) => a.name.toLowerCase() === name.trim().toLowerCase());
  if (exists) {
    setStatus(`${name} 已在列表中`, 'warn');
    return;
  }
  apps.push(createApp(name, categoryId ? { categoryId } : {}));
  appInput.value = '';
  suggestionsEl.hidden = true;
  persist();
  setStatus(`已添加 ${name}`, 'ok');
}

function runOrganize() {
  apps = recategorizeAll(apps);
  activeFolderIndex = 0;
  persist();
  setView('preview');
  setStatus('收桌完成 — 查看整理预览', 'ok');
  folderGridEl.classList.add('animate-in');
  setTimeout(() => folderGridEl.classList.remove('animate-in'), 600);
}

function setView(view) {
  activeView = view;
  viewTabs.forEach((t) => t.classList.toggle('active', t.dataset.view === view));
  panelApps.hidden = view !== 'apps';
  panelPreview.hidden = view !== 'preview';
}

function openPlan() {
  planText.textContent = buildOrganizePlan(layout);
  planModal.hidden = false;
}

addBtn.addEventListener('click', () => {
  const name = appInput.value.trim();
  if (!name) return;
  const cat = categorySelect.value || undefined;
  addAppByName(name, cat || undefined);
});

appInput.addEventListener('input', () => {
  clearTimeout(suggestTimer);
  suggestTimer = setTimeout(() => showSuggestions(appInput.value), 120);
});

appInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

organizeBtn.addEventListener('click', runOrganize);
exportBtn.addEventListener('click', openPlan);
resetBtn.addEventListener('click', () => {
  if (!confirm('清空全部应用并恢复示例列表？')) return;
  clearApps();
  apps = loadApps();
  activeFolderIndex = 0;
  persist();
  setStatus('已重置', 'ok');
});

closePlanBtn.addEventListener('click', () => { planModal.hidden = true; });
planModal.querySelector('.modal-backdrop').addEventListener('click', () => { planModal.hidden = true; });

copyPlanBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(planText.textContent);
    setStatus('整理方案已复制', 'ok');
  } catch {
    setStatus('复制失败，请手动选择文本', 'warn');
  }
});

viewTabs.forEach((tab) => {
  tab.addEventListener('click', () => setView(tab.dataset.view));
});

window.onWearableGesture = (name, detail) => {
  if (name === 'shake') runOrganize();
  else if (name === 'tap') appInput.focus();
  else if (name === 'swing') openPlan();
  else if (name === 'tilt') {
    const dir = detail?.dir;
    if (dir === 'up' || dir === 'left') {
      activeFolderIndex = Math.max(0, activeFolderIndex - 1);
      if (activeView !== 'preview') setView('preview');
      renderPreview();
    } else if (dir === 'down' || dir === 'right') {
      activeFolderIndex = Math.min(layout.folders.length - 1, activeFolderIndex + 1);
      if (activeView !== 'preview') setView('preview');
      renderPreview();
    }
  }
};

renderAll();
setStatus('添加你的 App，然后点「收桌」');
