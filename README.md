# vue-music

## 项目介绍
本项目使用 vue、element-ui、axios 等技术，以网易云音乐PC客户端为模板实现了功能较为完善的网页播放器

## 实现情况
账号、视频、直播等相关内容均未实现

未考虑兼容性、移动端适配等问题

- 搜索面板及搜索结果面板
- 发现面板（只包含轮播图和推荐歌单）
- 创建的歌单（只包含收藏的音乐）
- 收藏的歌单
- 播放器（包括底部播放器以及点击封面弹出的歌词页面）
- 专辑页面（复用歌单页面）
- 歌手页面（正在施工）

## 项目运行
> 本项目需要 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)（版本：4.0.9） 在端口3000运行
```
$ npm install
$ npm run serve
```