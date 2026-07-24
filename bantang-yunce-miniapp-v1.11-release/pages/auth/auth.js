const { loadAuth, saveAuth, clearAuth } = require('../../utils/storage')
const { trackEvent } = require('../../utils/analytics')

Page({
  data: {
    auth: loadAuth(),
    agreePrivacy: false,
    hasReadPrivacy: false,
    wechatName: '',
    wechatAvatar: '',
    hint: '请先阅读并同意隐私协议，再完成注册或登录。'
  },
  onLoad() {
    if (this.redirectIfLoggedIn()) return
    this.setData({ auth: loadAuth() })
    trackEvent('page_view', { page: 'auth', mode: 'wechat' })
  },
  onShow() {
    if (this.redirectIfLoggedIn()) return
    this.setData({ auth: loadAuth() })
  },
  redirectIfLoggedIn() {
    const auth = loadAuth()
    if (!auth.loggedIn) return false
    this.setData({ auth })
    wx.showToast({ title: '已登录', icon: 'none' })
    setTimeout(() => {
      if (getCurrentPages().length > 1) {
        wx.navigateBack()
        return
      }
      wx.redirectTo({ url: '/pages/mine/mine' })
    }, 150)
    return true
  },
  leaveAuthPage() {
    if (getCurrentPages().length > 1) {
      wx.navigateBack()
      return
    }
    wx.redirectTo({ url: '/pages/mine/mine' })
  },
  openPrivacy() {
    this.setData({ hasReadPrivacy: true })
    wx.navigateTo({ url: '/pages/privacy/privacy' })
  },
  toggleAgree(e) {
    const checked = Boolean(e.detail.value)
    if (checked && !this.data.hasReadPrivacy) {
      this.setData({ agreePrivacy: false })
      wx.showToast({ title: '请先阅读隐私协议', icon: 'none' })
      wx.navigateTo({ url: '/pages/privacy/privacy' })
      return
    }
    this.setData({ agreePrivacy: checked })
  },
  onWechatNameInput(e) {
    this.setData({ wechatName: e.detail.value })
  },
  chooseAvatar() {
    wx.showModal({
      title: '访问本地媒体文件',
      content: '是否允许半糖孕册访问本地相册，用于选择头像图片？',
      confirmText: '允许',
      cancelText: '取消',
      success: res => {
        if (!res.confirm) return
        const choose = wx.chooseMedia || wx.chooseImage
        if (wx.chooseMedia) {
          wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            sizeType: ['compressed'],
            success: result => {
              const file = result.tempFiles && result.tempFiles[0]
              if (file && file.tempFilePath) this.setData({ wechatAvatar: file.tempFilePath })
            }
          })
          return
        }
        choose({
          count: 1,
          sourceType: ['album', 'camera'],
          sizeType: ['compressed'],
          success: result => {
            const path = result.tempFilePaths && result.tempFilePaths[0]
            if (path) this.setData({ wechatAvatar: path })
          }
        })
      }
    })
  },
  ensurePrivacyReady() {
    if (!this.data.hasReadPrivacy) {
      wx.showToast({ title: '请先阅读隐私协议', icon: 'none' })
      wx.navigateTo({ url: '/pages/privacy/privacy' })
      return false
    }
    if (!this.data.agreePrivacy) {
      wx.showToast({ title: '请勾选同意隐私协议', icon: 'none' })
      return false
    }
    return true
  },
  loginWithWechat() {
    const name = String(this.data.wechatName || '').trim()
    if (!this.ensurePrivacyReady()) return
    if (!name) {
      wx.showToast({ title: '请输入昵称', icon: 'none' })
      return
    }
    const auth = {
      loggedIn: true,
      method: '微信账号登录',
      name,
      avatar: String(this.data.wechatAvatar || '').trim(),
      createdAt: new Date().toISOString()
    }
    saveAuth(auth)
    this.setData({ auth })
    trackEvent('auth_login', { method: 'wechat' })
    wx.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => this.leaveAuthPage(), 300)
  },
  logout() {
    clearAuth()
    this.setData({ auth: loadAuth() })
    trackEvent('auth_logout')
    wx.showToast({ title: '已退出登录', icon: 'success' })
  }
})
