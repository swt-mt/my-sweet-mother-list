const { loadChecklistState, saveChecklistState, loadProfile, saveProfile, loadSettings, saveSettings, loadFeedbackList, loadAuth, clearAuth } = require('../../utils/storage')
const { createOverviewModel, buildExportText } = require('../../utils/view-model')
const { stageMeta, flatItems } = require('../../utils/catalog')
const { requireLogin } = require('../../utils/auth')
const { trackEvent } = require('../../utils/analytics')

Page({
  data: {
    profile: loadProfile(),
    settings: loadSettings(),
    auth: loadAuth(),
    summary: { total: 0, doneCount: 0, remarkCount: 0, rate: 0 },
    stageCards: []
  },
  onLoad() { trackEvent('page_view', { page: 'mine' }); this.refresh() },
  onShow() { this.refresh() },
  refresh() {
    const checklistState = loadChecklistState()
    const profile = loadProfile()
    const settings = loadSettings()
    const auth = loadAuth()
    const feedbackList = loadFeedbackList()
    const overview = createOverviewModel({ checklistState, feedbackCount: feedbackList.length })
    this.setData({
      profile,
      settings,
      auth,
      summary: { total: overview.total, doneCount: overview.doneCount, remarkCount: overview.remarkCount, rate: overview.rate },
      stageCards: stageMeta.map(stage => {
        const items = flatItems.filter(item => item.sectionId === stage.id)
        const done = items.filter(item => checklistState[item.id] && checklistState[item.id].done).length
        return { id: stage.id, name: stage.name, count: items.length, done, rate: items.length ? Math.round(done / items.length * 100) : 0 }
      })
    })
  },
  onProfileInput(e) {
    if (!requireLogin('编辑孕产信息', '/pages/auth/auth')) return
    const field = e.currentTarget.dataset.field
    if (!field) return
    const profile = { ...this.data.profile, [field]: e.detail.value }
    this.setData({ profile })
    saveProfile(profile)
  },
  onSettingsToggle(e) {
    if (!requireLogin('切换页面设置', '/pages/auth/auth')) {
      this.refresh()
      return
    }
    const field = e.currentTarget.dataset.field
    if (!field) return
    const settings = { ...this.data.settings, [field]: Boolean(e.detail.value) }
    this.setData({ settings })
    saveSettings(settings)
  },
  copySummary() {
    if (!requireLogin('复制准备摘要', '/pages/auth/auth')) return
    wx.setClipboardData({
      data: buildExportText({ profile: this.data.profile, checklistState: loadChecklistState() }),
      success: () => {
        wx.showModal({
          title: '准备摘要已复制',
          content: '摘要已经复制到剪贴板，可以直接粘贴给家人、医生或陪产人查看。',
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#78927d'
        })
      }
    })
  },
  restoreDefault() {
    if (!requireLogin('恢复默认状态', '/pages/auth/auth')) return
    wx.showModal({
      title: '恢复默认状态？',
      content: '将重置个人信息、清空已购勾选和备注内容，操作后本机数据会回到初始状态。',
      cancelText: '取消',
      confirmText: '确认恢复',
      confirmColor: '#c97766',
      success: (res) => {
        if (!res.confirm) return
        const state = loadChecklistState()
        Object.keys(state).forEach(key => { state[key].done = false; state[key].remark = '' })
        saveChecklistState(state)
        const profile = { dueDate: '2026-10-01', week: '24', stage: 'pregnancy', hospital: '待填写', deliveryMode: '顺产准备' }
        const settings = { showBrandSource: true, compactMode: false, fontScale: '标准' }
        saveProfile(profile)
        saveSettings(settings)
        this.setData({ profile, settings })
        this.refresh()
        trackEvent('restore_default')
        wx.showToast({ title: '已恢复默认', icon: 'success' })
      }
    })
  },
  goFeedback() {
    if (!requireLogin('提交反馈', '/pages/auth/auth')) return
    wx.navigateTo({ url: '/pages/feedback/feedback?source=mine' })
  },
  goAuth() {
    wx.navigateTo({ url: '/pages/auth/auth' })
  },
  logout() {
    clearAuth()
    this.refresh()
    wx.showToast({ title: '已退出登录', icon: 'success' })
  }
})
