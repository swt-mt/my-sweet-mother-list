const { loadAuth, saveAuth, clearAuth } = require('../../utils/storage')
const { trackEvent } = require('../../utils/analytics')

Page({
  data: {
    auth: loadAuth(),
    mode: 'wechat',
    agreePrivacy: false,
    hasReadPrivacy: false,
    wechatName: '',
    wechatAvatar: '',
    phoneNumber: '',
    smsCode: '',
    codeSent: false,
    hint: '请先阅读并同意隐私协议，再完成注册或登录。'
  },
  onLoad(options = {}) {
    this.setData({
      auth: loadAuth(),
      mode: options.mode === 'phone' ? 'phone' : 'wechat'
    })
    trackEvent('page_view', { page: 'auth', mode: this.data.mode })
  },
  onShow() {
    this.setData({ auth: loadAuth() })
  },
  switchMode(e) {
    this.setData({ mode: e.currentTarget.dataset.mode })
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
  onPhoneInput(e) {
    this.setData({ phoneNumber: e.detail.value, codeSent: false })
  },
  onCodeInput(e) {
    this.setData({ smsCode: e.detail.value })
  },
  sendSmsCode() {
    const phone = String(this.data.phoneNumber || '').trim()
    if (!/^1\d{10}$/.test(phone)) {
      wx.showToast({ title: '请输入正确手机号', icon: 'none' })
      return
    }
    this.setData({ codeSent: true })
    trackEvent('auth_send_code')
    wx.showToast({ title: '验证码已发送', icon: 'success' })
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
      method: '微信登录',
      name,
      avatar: String(this.data.wechatAvatar || '').trim(),
      phone: '',
      createdAt: new Date().toISOString()
    }
    saveAuth(auth)
    this.setData({ auth })
    trackEvent('auth_login', { method: 'wechat' })
    wx.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 300)
  },
  loginWithPhone() {
    const phone = String(this.data.phoneNumber || '').trim()
    const code = String(this.data.smsCode || '').trim()
    if (!this.ensurePrivacyReady()) return
    if (!/^1\d{10}$/.test(phone)) {
      wx.showToast({ title: '请输入手机号', icon: 'none' })
      return
    }
    if (!this.data.codeSent) {
      wx.showToast({ title: '请先发送验证码', icon: 'none' })
      return
    }
    if (!code) {
      wx.showToast({ title: '请输入验证码', icon: 'none' })
      return
    }
    const auth = {
      loggedIn: true,
      method: '手机号登录',
      name: `妈妈${phone.slice(-4)}`,
      avatar: '',
      phone,
      createdAt: new Date().toISOString()
    }
    saveAuth(auth)
    this.setData({ auth })
    trackEvent('auth_login', { method: 'phone' })
    wx.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 300)
  },
  logout() {
    clearAuth()
    this.setData({ auth: loadAuth() })
    trackEvent('auth_logout')
    wx.showToast({ title: '已退出登录', icon: 'success' })
  }
})
