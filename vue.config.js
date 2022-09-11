module.exports = {
  // publicPath: '/k-music/',
  publicPath: './',

  // publicPath: '/MyNeteaseMusic/',

  
  css: {
    loaderOptions: {
      sass: {
        //全局引入变量和mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";

        `,
      },
    },
  },
  // devServer: {
  //   proxy: 'http://1.117.229.35:3000/'
  // }
}
