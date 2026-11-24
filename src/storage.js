import { createApp } from './organizer.js';

const STORAGE_KEY = 'shou-zhuo-apps-v1';

const DEFAULT_NAMES = [
  '微信', '支付宝', '抖音', '淘宝', '地图', '设置', '相机', '哔哩哔哩',
  '网易云音乐', '12306', 'Keep', '备忘录', 'Safari', '邮件', '日历',
];

/** @returns {import('./organizer.js').UserApp[]} */
export function loadApps() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_NAMES.map((name) => createApp(name));
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_NAMES.map((name) => createApp(name));
    return parsed;
  } catch {
    return DEFAULT_NAMES.map((name) => createApp(name));
  }
}

/** @param {import('./organizer.js').UserApp[]} apps */
export function saveApps(apps) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export function clearApps() {
  localStorage.removeItem(STORAGE_KEY);
}
