# widget iframe 的使用

1. 在 settings 里设置 iframe 的根 URL
2. 在 widget 页面点击“复制 iframe 代码”
3. 将代码复制到要使用的 html 文件即可

开发时的思路：

- 1 根据 `render.html`，`renderCtrl.js` 的思路，制作 render 页面
  - 注：widget 的数据用 `./dashboard/getWidgetList.do` 接口的数据，而不是 `dashboard/getBoardData.do` 的数据
- 2 在 widget 配置界面生成 iframe 代码，URL 为刚才制作的页面
