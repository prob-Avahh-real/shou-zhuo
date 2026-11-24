/**
 * 常见应用目录 — 名称、别名、默认分类
 * iOS 沙盒无法枚举已装应用，靠此库 + 用户输入完成分类
 */
export const APP_CATALOG = [
  // 社交
  { name: '微信', aliases: ['WeChat', 'weixin'], category: 'social' },
  { name: 'QQ', aliases: ['腾讯QQ'], category: 'social' },
  { name: '微博', aliases: ['Weibo'], category: 'social' },
  { name: '抖音', aliases: ['TikTok', 'Douyin'], category: 'social' },
  { name: '小红书', aliases: ['RED', 'Xiaohongshu'], category: 'social' },
  { name: 'Instagram', aliases: [], category: 'social' },
  { name: 'Facebook', aliases: ['Meta'], category: 'social' },
  { name: 'Twitter', aliases: ['X'], category: 'social' },
  { name: 'Telegram', aliases: [], category: 'social' },
  { name: 'WhatsApp', aliases: [], category: 'social' },
  { name: 'Discord', aliases: [], category: 'social' },
  { name: 'LinkedIn', aliases: [], category: 'social' },
  { name: 'Soul', aliases: [], category: 'social' },
  { name: '陌陌', aliases: ['Momo'], category: 'social' },
  { name: '探探', aliases: ['Tantan'], category: 'social' },

  // 通讯
  { name: '电话', aliases: ['Phone', '通话'], category: 'comm' },
  { name: '信息', aliases: ['Messages', '短信'], category: 'comm' },
  { name: '邮件', aliases: ['Mail', 'Gmail', 'Outlook'], category: 'comm' },
  { name: 'FaceTime', aliases: ['视频通话'], category: 'comm' },
  { name: '钉钉', aliases: ['DingTalk'], category: 'comm' },
  { name: '企业微信', aliases: ['WeCom', 'Work WeChat'], category: 'comm' },
  { name: '飞书', aliases: ['Feishu', 'Lark'], category: 'comm' },
  { name: 'Teams', aliases: ['Microsoft Teams'], category: 'comm' },
  { name: 'Zoom', aliases: [], category: 'comm' },

  // 工具
  { name: '计算器', aliases: ['Calculator'], category: 'tools' },
  { name: '备忘录', aliases: ['Notes', '便签'], category: 'tools' },
  { name: '文件', aliases: ['Files', '文件管理'], category: 'tools' },
  { name: '快捷指令', aliases: ['Shortcuts'], category: 'tools' },
  { name: '翻译', aliases: ['Translate', 'Google Translate'], category: 'tools' },
  { name: '扫描全能王', aliases: ['CamScanner'], category: 'tools' },
  { name: '1Password', aliases: [], category: 'tools' },
  { name: '密码', aliases: ['Passwords'], category: 'tools' },
  { name: '测距仪', aliases: ['Measure'], category: 'tools' },
  { name: '指南针', aliases: ['Compass'], category: 'tools' },
  { name: '语音备忘录', aliases: ['Voice Memos'], category: 'tools' },
  { name: '时钟', aliases: ['Clock', '闹钟'], category: 'tools' },

  // 效率
  { name: '日历', aliases: ['Calendar'], category: 'productivity' },
  { name: '提醒事项', aliases: ['Reminders'], category: 'productivity' },
  { name: 'Notion', aliases: [], category: 'productivity' },
  { name: 'Todoist', aliases: [], category: 'productivity' },
  { name: 'Things', aliases: [], category: 'productivity' },
  { name: 'Obsidian', aliases: [], category: 'productivity' },
  { name: '石墨文档', aliases: ['Shimo'], category: 'productivity' },
  { name: '腾讯文档', aliases: [], category: 'productivity' },
  { name: 'WPS', aliases: ['WPS Office'], category: 'productivity' },
  { name: 'Pages', aliases: [], category: 'productivity' },
  { name: 'Numbers', aliases: [], category: 'productivity' },
  { name: 'Keynote', aliases: [], category: 'productivity' },

  // 娱乐
  { name: '哔哩哔哩', aliases: ['Bilibili', 'B站'], category: 'entertainment' },
  { name: '优酷', aliases: ['Youku'], category: 'entertainment' },
  { name: '爱奇艺', aliases: ['iQIYI'], category: 'entertainment' },
  { name: '腾讯视频', aliases: [], category: 'entertainment' },
  { name: 'Netflix', aliases: [], category: 'entertainment' },
  { name: 'YouTube', aliases: [], category: 'entertainment' },
  { name: 'Spotify', aliases: [], category: 'entertainment' },
  { name: 'Apple Music', aliases: ['音乐'], category: 'entertainment' },
  { name: 'QQ音乐', aliases: [], category: 'entertainment' },
  { name: '网易云音乐', aliases: ['NetEase Cloud Music'], category: 'entertainment' },
  { name: '喜马拉雅', aliases: ['Ximalaya'], category: 'entertainment' },
  { name: '小宇宙', aliases: ['Podcast'], category: 'entertainment' },
  { name: '播客', aliases: ['Podcasts'], category: 'entertainment' },

  // 购物
  { name: '淘宝', aliases: ['Taobao'], category: 'shopping' },
  { name: '京东', aliases: ['JD'], category: 'shopping' },
  { name: '拼多多', aliases: ['PDD', 'Pinduoduo'], category: 'shopping' },
  { name: '天猫', aliases: ['Tmall'], category: 'shopping' },
  { name: '闲鱼', aliases: ['Xianyu'], category: 'shopping' },
  { name: 'Amazon', aliases: ['亚马逊'], category: 'shopping' },
  { name: '美团', aliases: ['Meituan'], category: 'shopping' },
  { name: '饿了么', aliases: ['Ele.me'], category: 'shopping' },
  { name: '盒马', aliases: ['Hema'], category: 'shopping' },
  { name: '得物', aliases: ['Poizon'], category: 'shopping' },

  // 金融
  { name: '支付宝', aliases: ['Alipay'], category: 'finance' },
  { name: 'Wallet', aliases: ['钱包', 'Apple Pay'], category: 'finance' },
  { name: '招商银行', aliases: ['CMB'], category: 'finance' },
  { name: '工商银行', aliases: ['ICBC'], category: 'finance' },
  { name: '建设银行', aliases: ['CCB'], category: 'finance' },
  { name: '中国银行', aliases: ['BOC'], category: 'finance' },
  { name: '同花顺', aliases: [], category: 'finance' },
  { name: '东方财富', aliases: [], category: 'finance' },
  { name: 'Robinhood', aliases: [], category: 'finance' },

  // 出行
  { name: '地图', aliases: ['Maps', 'Apple Maps'], category: 'travel' },
  { name: '高德地图', aliases: ['Amap', 'Gaode'], category: 'travel' },
  { name: '百度地图', aliases: ['Baidu Maps'], category: 'travel' },
  { name: 'Google Maps', aliases: [], category: 'travel' },
  { name: '滴滴', aliases: ['DiDi'], category: 'travel' },
  { name: '12306', aliases: ['铁路12306'], category: 'travel' },
  { name: '携程', aliases: ['Ctrip'], category: 'travel' },
  { name: '飞猪', aliases: ['Fliggy'], category: 'travel' },
  { name: '航旅纵横', aliases: [], category: 'travel' },
  { name: 'Uber', aliases: [], category: 'travel' },

  // 健康
  { name: '健康', aliases: ['Health', 'Apple Health'], category: 'health' },
  { name: 'Keep', aliases: [], category: 'health' },
  { name: '薄荷健康', aliases: [], category: 'health' },
  { name: '悦跑圈', aliases: [], category: 'health' },
  { name: 'Strava', aliases: [], category: 'health' },
  { name: '健身', aliases: ['Fitness'], category: 'health' },
  { name: '睡眠', aliases: ['Sleep'], category: 'health' },
  { name: '正念', aliases: ['Mindfulness'], category: 'health' },

  // 阅读
  { name: '微信读书', aliases: ['WeRead'], category: 'reading' },
  { name: 'Kindle', aliases: [], category: 'reading' },
  { name: 'Books', aliases: ['图书', 'Apple Books'], category: 'reading' },
  { name: '今日头条', aliases: ['Toutiao'], category: 'reading' },
  { name: '知乎', aliases: ['Zhihu'], category: 'reading' },
  { name: '豆瓣', aliases: ['Douban'], category: 'reading' },
  { name: 'News', aliases: ['新闻', 'Apple News'], category: 'reading' },

  // 摄影
  { name: '相机', aliases: ['Camera'], category: 'photo' },
  { name: '照片', aliases: ['Photos'], category: 'photo' },
  { name: '美图秀秀', aliases: ['Meitu'], category: 'photo' },
  { name: 'Snapseed', aliases: [], category: 'photo' },
  { name: 'VSCO', aliases: [], category: 'photo' },
  { name: 'Lightroom', aliases: [], category: 'photo' },

  // 游戏
  { name: 'Game Center', aliases: ['游戏中心'], category: 'games' },
  { name: '王者荣耀', aliases: ['Honor of Kings'], category: 'games' },
  { name: '和平精英', aliases: ['PUBG'], category: 'games' },
  { name: '原神', aliases: ['Genshin Impact'], category: 'games' },
  { name: 'Steam', aliases: [], category: 'games' },

  // 系统
  { name: '设置', aliases: ['Settings'], category: 'system' },
  { name: 'App Store', aliases: ['应用商店'], category: 'system' },
  { name: 'Safari', aliases: ['浏览器'], category: 'system' },
  { name: 'Chrome', aliases: [], category: 'system' },
  { name: 'iCloud', aliases: [], category: 'system' },
  { name: '查找', aliases: ['Find My'], category: 'system' },
  { name: '家庭', aliases: ['Home'], category: 'system' },
];

/** 关键词 → 分类（用于未知应用名推断） */
export const KEYWORD_RULES = [
  { category: 'social', keywords: ['聊', '社区', 'share', 'social', 'friend', '交友', '直播'] },
  { category: 'comm', keywords: ['call', 'mail', 'message', '会议', '通话', '语音', 'video call'] },
  { category: 'tools', keywords: ['tool', 'scan', 'calc', 'password', 'vpn', '工具', '扫描', '压缩'] },
  { category: 'productivity', keywords: ['todo', 'task', 'note', 'doc', 'sheet', 'office', '日程', '文档', '表格'] },
  { category: 'entertainment', keywords: ['video', 'music', 'tv', 'movie', 'stream', '视频', '音乐', '影视', '播'] },
  { category: 'shopping', keywords: ['shop', 'buy', 'mall', 'store', 'market', '购', '商城', '外卖', '团购'] },
  { category: 'finance', keywords: ['bank', 'pay', 'wallet', 'stock', 'fund', '银行', '支付', '理财', '证券'] },
  { category: 'travel', keywords: ['map', 'nav', 'taxi', 'ride', 'train', 'flight', '地图', '导航', '出行', '酒店'] },
  { category: 'health', keywords: ['health', 'fit', 'run', 'sleep', 'med', '健康', '运动', '医', '瑜伽'] },
  { category: 'reading', keywords: ['book', 'read', 'news', 'magazine', '书', '阅读', '新闻', '小说'] },
  { category: 'photo', keywords: ['photo', 'camera', 'edit', 'filter', '相机', '修图', '相册'] },
  { category: 'games', keywords: ['game', 'play', 'arcade', '游戏', '棋牌'] },
  { category: 'system', keywords: ['setting', 'config', 'store', 'browser', '设置', '系统'] },
];

/** 建议放 Dock 的高频应用 */
export const DOCK_CANDIDATES = [
  '电话', '信息', 'Safari', '相机', '微信', '支付宝', '地图', '邮件',
  'Phone', 'Messages', 'Camera', 'Maps', 'Mail', 'WeChat', 'Alipay',
];

export function searchCatalog(query, limit = 12) {
  const q = query.trim().toLowerCase();
  if (!q) return APP_CATALOG.slice(0, limit);
  const scored = [];
  for (const app of APP_CATALOG) {
    const names = [app.name, ...app.aliases].map((s) => s.toLowerCase());
    let score = 0;
    for (const n of names) {
      if (n === q) score = 100;
      else if (n.startsWith(q)) score = Math.max(score, 80);
      else if (n.includes(q)) score = Math.max(score, 50);
    }
    if (score > 0) scored.push({ app, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.app);
}

export function findInCatalog(name) {
  const n = name.trim().toLowerCase();
  return APP_CATALOG.find(
    (a) => a.name.toLowerCase() === n || a.aliases.some((x) => x.toLowerCase() === n),
  );
}
