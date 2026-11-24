/** 桌面文件夹分类定义 */
export const CATEGORIES = [
  { id: 'social', label: '社交', emoji: '💬', color: '#e85d75' },
  { id: 'comm', label: '通讯', emoji: '📞', color: '#5b9fd4' },
  { id: 'tools', label: '工具', emoji: '🔧', color: '#6b8f71' },
  { id: 'productivity', label: '效率', emoji: '✅', color: '#c4a35a' },
  { id: 'entertainment', label: '娱乐', emoji: '🎬', color: '#9b6bcc' },
  { id: 'shopping', label: '购物', emoji: '🛒', color: '#e8913a' },
  { id: 'finance', label: '金融', emoji: '💰', color: '#3d9970' },
  { id: 'travel', label: '出行', emoji: '🚗', color: '#4a90a4' },
  { id: 'health', label: '健康', emoji: '❤️', color: '#d9534f' },
  { id: 'reading', label: '阅读', emoji: '📚', color: '#8b6914' },
  { id: 'photo', label: '摄影', emoji: '📷', color: '#7a8b99' },
  { id: 'games', label: '游戏', emoji: '🎮', color: '#6c5ce7' },
  { id: 'system', label: '系统', emoji: '⚙️', color: '#888' },
  { id: 'other', label: '其他', emoji: '📦', color: '#aaa' },
];

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

export const MAX_APPS_PER_FOLDER = 9;
export const DOCK_SLOTS = 4;
