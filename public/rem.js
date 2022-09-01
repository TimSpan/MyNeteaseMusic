function remSize() {
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth //不管哪种方式 一定可以获取的设备的宽度
  if (deviceWidth >= 750) {
    deviceWidth = 750
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320
  }
  //等分成10份,750px --->1rem = 100px 350px ---> 1rem = 50px
  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
  //设置字体大小.因为字体大小要随着rem的改变去改变
  //设置为16px.  16/50 = 0.32rem.我们的设备宽度是以375px为准
  document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
remSize()
window.onresize = function () {
  remSize()
}
