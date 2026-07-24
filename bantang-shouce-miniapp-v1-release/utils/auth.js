const { loadAuth } = require('./storage')

function isLoggedIn() {
  return Boolean(loadAuth().loggedIn)
}

function redirectToLogin(url = '/pages/auth/auth') {
  wx.navigateTo({ url })
}

function requireLogin(action = '继续使用', url = '/pages/auth/auth') {
  if (isLoggedIn()) return true
  wx.showModal({
    title: '需要登录',
    content: `先注册或登录后，再${action}。`,
    confirmText: '去登录',
    cancelText: '先看看',
    success(res) {
      if (res.confirm) redirectToLogin(url)
    }
  })
  return false
}

module.exports = { isLoggedIn, redirectToLogin, requireLogin }
