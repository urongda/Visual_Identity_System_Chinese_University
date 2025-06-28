# 🏫 中国高校视觉形象识别系统导航

欢迎使用中国高校视觉形象识别系统导航项目！这是一个为全国高校师生打造的便捷工具，让您快速访问各校视觉形象资源。

---

## 🌟 项目简介

本项目的核心目标是创建一个开放、友好且功能完善的中国高校视觉形象识别系统（VIS）资源导航平台。我们收集整理了全国高校的视觉形象识别系统网址和官网链接，按教育部公布的学校识别码排序，方便您快速找到所需资源。

通过这个项目，您可以直接访问：
- 各高校的官方视觉形象识别系统（VIS）
- 大学官网首页
- 校徽、标识等矢量素材资源

---

## 项目特色

- 🚀 一键直达各高校VIS及官方网站
- 🔍 按校名搜索
- 📂 开放JSON数据结构（方便二次开发）
- 🎨 页面美观

---

## 💻 技术亮点

本项目采用现代前端技术栈打造极致的用户体验：

- 🧠 [Juris.js (JavaScript Unified Reactive Interface Solution)](https://github.com/jurisjs/juris)
  - 创新的对象优先架构
  - 精确控制的反应式编程
  - 简洁可调试的JavaScript原生体验
- 🎨 [TailwindCSS](https://tailwindcss.com/)
  - 现代化UI设计
  - 响应式布局适配所有设备
  - 极致的性能优化
- ⚡ 轻量级架构
  - 无需复杂构建工具
  - 直接浏览器运行

---

## 🚀 快速开始

立即体验完整功能：

### 方法1：在线预览

访问我们的演示站点：[https://vis.urongda.com/](https://vis.urongda.com/)

### 方法2：本地运行

克隆项目：
```bash
git clone https://github.com/urongda/Visual_Identity_System_Chinese_University.git
cd Visual_Identity_System_Chinese_University
```

启动本地服务器（选一种方式）：
```bash
# Python 3
python3 -m http.server

# 或使用 Node.js（已安装live-server的话）
npx live-server
```

打开浏览器访问：http://localhost:8000

---

## 📂 数据结构

所有高校数据存储在项目根目录的 `schools.json` 文件中：

```json
[
  {
    "title": "清华大学",
    "slug": 4111010009,
    "vis": "https://news.tsinghua.edu.cn",
    "website": "https://www.tsinghua.edu.cn/"
  },
  {
    "title": "北京大学",
    "slug": 4111010001,
    "vis": "https://vi.pku.edu.cn",
    "website": "https://www.pku.edu.cn/"
  }
  // ...更多高校数据
]
```
- `title`: 学校名称
- `slug`: 教育部学校识别码
- `vis`: 视觉形象识别系统网址
- `website`: 学校官网网址

小贴士：当`vis`字段为空时，界面将显示禁用按钮，清晰表明该校暂无VIS资源。

---

## 🔍 使用指南

- 在项目主页顶部搜索框中输入学校名称或代码进行过滤
- 点击排序按钮可切换排序方式（按名称或学校代码）
- 使用按钮直接访问VIS系统或官网

---

## 👥 加入贡献队伍

我们一起打造最好的高校资源导航平台！

### 如何参与贡献：
- 📝 完善高校数据：添加或更新 `schools.json` 中的学校信息
- 🎨 界面改进：优化UI/UX，增加新功能
- 🐞 问题排查：提交Bug报告或修复问题
- 🌐 多语言支持：帮助翻译界面内容
- 📚 文档完善：改进说明文档或添加使用教程

### 参与流程：
1. Fork 本项目仓库
2. 创建新分支 (`git checkout -b feature/your-feature`)
3. 提交修改 (`git commit -am '添加神奇的功能'`)
4. 推送修改 (`git push origin feature/your-feature`)
5. 创建 Pull Request

---

## 📚 资源推荐

校徽矢量素材下载：[urongda.com](https://www.urongda.com)



---

## 📜 许可协议

本项目采用 [MIT License](https://opensource.org/licenses/MIT)。这意味着您可以自由使用、修改和分发代码，只需在衍生项目中保留原作者的许可声明。

---

为中国高校师生和设计者社区倾情打造 ❤️