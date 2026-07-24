const { loadSettings } = require('./utils/storage')

App({
  globalData: { appName: '半糖手册', appTagline: '给妈妈的孕产准备工具' },
  onLaunch() {
    wx.setStorageSync('bantangYunceSettings', loadSettings())
  }
})
