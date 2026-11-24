# 收桌 (Shou Zhuo)

自动整理分类 iPhone / Android 桌面应用。

## 说明

iOS **不允许**第三方 App 直接移动主屏幕图标。收桌的做法是：

1. 录入 / 搜索你的 App 列表（内置 120+ 常见中外应用）
2. 规则引擎自动分类（社交、工具、购物、金融…）
3. 生成文件夹布局预览 + 逐步整理方案
4. 复制方案后，在「编辑主屏幕」模式下手动拖放完成

Android 同样以「整理方案 + 预览」为主；后续可扩展为应用内启动器视图。

## 目标平台

| 平台 | 方式 | 产出 |
|------|------|------|
| iOS | Capacitor → Xcode | IPA |
| Android | Capacitor → Gradle | APK |
| 手表 | 窄屏 CSS | 同 APK |
| 戒指 | 摇一摇收桌 / 倾斜切文件夹 | DeviceOrientation |
| 手杖 | 轻点聚焦输入 / 摆动导出 | DeviceMotion |

## 功能

- 应用搜索与手动添加
- 一键「收桌」：自动归类并生成文件夹
- 点击应用行可循环调整分类
- 整理预览（仿主屏幕文件夹 + Dock）
- 导出可复制整理步骤

## 命令

```bash
npm install
npm test
npm start          # 本地预览 http://localhost:5191
npm run apk:debug  # Android debug APK
```

## 同步

改 HTML/JS 后：`npm run build`，再 `npx cap sync android`。

## Harness / Loop（助手）

- 遵循根 `/Users/skat/AGENTS.md`：**Harness Engineering** + **Loop Engineering**
- Guide = 本文件；Sensor = 下方验证命令；同类失误第二次须沉淀规则或测试（棘轮）
- 开干前写清 **Done**；每切片过验证环；显式停止（成功 / 上限 / 无进展 / 人审）
- 详解：`docs/HARNESS_ENGINEERING.md`、`docs/LOOP_ENGINEERING.md`

## 验证环 / Done

```bash
npm install
npm test          # 若有
npm run build     # 或 build:web
npx cap sync android   # 若有 android/
# 可选：JAVA_HOME=…/openjdk@17 npm run apk:debug
```

**Done 示例**：测试通过（若有）+ web 产物进 `www/`/`dist/` + `cap sync` 无报错。可选穿戴未做可搁置，不纳入强制 Done。
