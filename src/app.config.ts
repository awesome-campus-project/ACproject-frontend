export default {
  pages: [
    
    'pages/home/index',
    'pages/mine/index',

    'pages/order/index',
    'pages/order-edit/index',
    
    'pages/login/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#9c9d9e",
    selectedColor: "#0089ff",
    // backgroundColor: "#24292F",
    borderStyle: "white",
    custom: false,
    list: [
      {
        pagePath: "pages/home/index",
        text: "大厅",
        iconPath: "assets/tab/wiki.png",
        selectedIconPath: "assets/tab/wiki_active.png"
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: "assets/tab/about.png",
        selectedIconPath: "assets/tab/about_active.png"
      }
    ]
  },
}
