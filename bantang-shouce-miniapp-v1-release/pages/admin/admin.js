const {
  loadChecklistState,
  loadFeedbackList,
  saveFeedbackList,
  loadAnalytics,
  saveVersionInfo,
  isAdminUnlocked,
  setAdminUnlocked
} = require('../../utils/storage')
const { createAdminModel } = require('../../utils/view-model')
const { trackEvent } = require('../../utils/analytics')

function buildVersionDraft(versionInfo = {}) {
  return {
    version: versionInfo.version || '',
    releaseTime: versionInfo.releaseTime || '',
    updatesText: versionInfo.updatesText || (Array.isArray(versionInfo.updates) ? versionInfo.updates.join('\n') : '')
  }
}

Page({
  data: {
    unlocked: false,
    password: '',
    expandedGroups: { content: true, brand: true, feature: true, bug: true },
    replyDrafts: {},
    versionDraft: { version: '', releaseTime: '', updatesText: '' },
    summary: { kpis: [], funnel: [], feedbackStats: [], feedbackGroups: [], versionInfo: { updates: [], updatesText: '' } }
  },
  onLoad() {
    this.setData({ unlocked: isAdminUnlocked() })
    trackEvent('page_view', { page: 'admin' })
    this.refresh({ syncVersionDraft: true })
  },
  onShow() {
    this.refresh()
  },
  refresh(options = {}) {
    const summary = createAdminModel({
      checklistState: loadChecklistState(),
      feedbackList: loadFeedbackList(),
      analytics: loadAnalytics()
    })
    summary.feedbackGroups = summary.feedbackGroups.map(group => ({
      ...group,
      expanded: this.data.expandedGroups[group.id] !== false,
      items: group.items.map(item => ({ ...item, replyValue: this.data.replyDrafts[item.id] || item.reply }))
    }))
    const nextData = { summary }
    if (options.syncVersionDraft) {
      nextData.versionDraft = buildVersionDraft(summary.versionInfo)
    }
    this.setData(nextData)
  },
  onPasswordInput(e) {
    this.setData({ password: e.detail.value })
  },
  unlock() {
    if (this.data.password !== 'bantang2026') {
      wx.showToast({ title: '密码不正确', icon: 'none' })
      return
    }
    setAdminUnlocked(true)
    this.setData({ unlocked: true, password: '' })
    trackEvent('admin_unlock')
    this.refresh({ syncVersionDraft: true })
  },
  toggleFeedbackGroup(e) {
    const type = e.currentTarget.dataset.type
    if (!type) return
    this.setData({ [`expandedGroups.${type}`]: !this.data.expandedGroups[type] })
    setTimeout(() => this.refresh(), 0)
  },
  onReplyInput(e) {
    const id = e.currentTarget.dataset.id
    if (!id) return
    this.setData({ [`replyDrafts.${id}`]: e.detail.value })
  },
  submitReply(e) {
    const id = e.currentTarget.dataset.id
    if (!id) return
    const reply = String(this.data.replyDrafts[id] || '').trim()
    if (!reply) {
      wx.showToast({ title: '请先填写回复', icon: 'none' })
      return
    }
    const list = loadFeedbackList().map(item => {
      if (item.id !== id) return item
      return { ...item, reply, repliedAt: new Date().toISOString(), status: '已回复' }
    })
    saveFeedbackList(list)
    trackEvent('admin_reply_feedback', { id })
    wx.showToast({ title: '回复已提交', icon: 'success' })
    this.refresh()
  },
  onVersionFieldInput(e) {
    const field = e.currentTarget.dataset.field
    if (!field) return
    this.setData({ [`versionDraft.${field}`]: e.detail.value })
  },
  saveVersion() {
    const draft = this.data.versionDraft || {}
    const version = String(draft.version || '').trim()
    const releaseTime = String(draft.releaseTime || '').trim()
    const updatesText = String(draft.updatesText || '').trim()
    if (!version || !releaseTime || !updatesText) {
      wx.showToast({ title: '请完整填写版本信息', icon: 'none' })
      return
    }
    const normalizedUpdatesText = updatesText
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean)
      .join('\n')
    saveVersionInfo({ version, releaseTime, updatesText: normalizedUpdatesText })
    trackEvent('admin_save_version', { version })
    wx.showToast({ title: '版本已保存', icon: 'success' })
    this.refresh({ syncVersionDraft: true })
  },
  openFeedbackDetail(e) {
    const id = e.currentTarget.dataset.id
    if (!id) return
    wx.navigateTo({ url: `/pages/feedback/feedback?feedbackId=${id}` })
  },
  relock() {
    setAdminUnlocked(false)
    this.setData({ unlocked: false })
  }
})
