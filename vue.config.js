module.exports = {
  publicPath:'/k-music/',
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
}
