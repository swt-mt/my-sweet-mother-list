const { loadFeedbackList, saveFeedbackList, loadAuth } = require('../../utils/storage')
const { flatItems } = require('../../utils/catalog')
const { recordFeedback, trackEvent } = require('../../utils/analytics')

const feedbackTypes = [
  { id: 'feature', name: '功能建议' },
  { id: 'content', name: '内容纠错' },
  { id: 'brand', name: '品牌补充' },
  { id: 'bug', name: '使用问题' },
  { id: 'other', name: '其他' }
]

Page({
  data: {
    feedbackTypes,
    pageSources: [
      { id: 'index', name: '首页' },
      { id: 'checklist', name: '清单页' },
      { id: 'mine', name: '我的' },
      { id: 'auth', name: '注册登录页' },
      { id: 'feedback', name: '意见反馈页' }
    ],
    itemNames: ['比如：叶酸/进度条/备注框等', ...flatItems.map(item => item.name), '进度条', '备注框', '登录页', '隐私协议'],
    sourceLabel: '首页',
    itemLabel: '比如：叶酸/进度条/备注框等',
    form: { type: 'feature', source: 'index', itemName: '比如：叶酸/进度条/备注框等', content: '', contact: '' },
    images: [],
    feedbackRecords: [],
    source: 'index',
    itemId: '',
    focusFeedbackId: '',
    presetName: ''
  },
  onLoad(options = {}) {
    const source = options.source || 'index'
    const sourceLabel = (this.data.pageSources.find(item => item.id === source) || this.data.pageSources[0]).name
    const itemLabel = options.itemId ? this.resolveItemName(options.itemId) : '比如：叶酸/进度条/备注框等'
    this.setData({ source, itemId: options.itemId || '', focusFeedbackId: options.feedbackId || '', sourceLabel, itemLabel, presetName: options.itemId ? itemLabel : '' })
    this.refreshRecords()
    trackEvent('page_view', { page: 'feedback', source })
  },
  onShow() { this.refreshRecords() },
  refreshRecords() {
    const list = loadFeedbackList().map(item => ({
      ...item,
      statusText: item.reply ? item.reply : '处理中',
      highlighted: Boolean(this.data.focusFeedbackId && item.id === this.data.focusFeedbackId)
    }))
    this.setData({ feedbackRecords: list.slice(0, 8) })
  },
  resolveItemName(itemId) {
    const item = flatItems.find(entry => entry.id === itemId)
    return item ? item.name : '比如：叶酸/进度条/备注框等'
  },
  onTypeChange(e) { this.setData({ 'form.type': e.detail.value }) },
  onSourceChange(e) {
    const source = this.data.pageSources[Number(e.detail.value)]
    if (!source) return
    this.setData({ 'form.source': source.id, sourceLabel: source.name })
  },
  onItemChange(e) {
    const itemName = this.data.itemNames[Number(e.detail.value)] || '比如：叶酸/进度条/备注框等'
    this.setData({ 'form.itemName': itemName, itemLabel: itemName })
  },
  onContentInput(e) { this.setData({ 'form.content': e.detail.value }) },
  onContactInput(e) { this.setData({ 'form.contact': e.detail.value }) },
  chooseImage() {
    wx.chooseImage({
      count: 3 - this.data.images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => { this.setData({ images: this.data.images.concat(res.tempFilePaths).slice(0, 3) }) }
    })
  },
  previewImage(e) { wx.previewImage({ current: e.currentTarget.dataset.src, urls: this.data.images }) },
  submit() {
    const content = String(this.data.form.content || '').trim()
    if (!content) {
      wx.showToast({ title: '先写一点反馈', icon: 'none' })
      return
    }
    const auth = loadAuth()
    const feedbackList = loadFeedbackList()
    const payload = {
      id: `fb_${Date.now()}`,
      ...this.data.form,
      userName: auth.loggedIn ? (auth.name || '妈妈') : '未登录用户',
      source: this.data.form.source || this.data.source,
      itemId: this.data.itemId || '',
      images: this.data.images.slice(0, 3),
      createdAt: new Date().toISOString(),
      status: '处理中',
      reply: ''
    }
    feedbackList.unshift(payload)
    saveFeedbackList(feedbackList)
    recordFeedback(payload)
    trackEvent('submit_feedback', { type: payload.type, source: payload.source })
    this.setData({ form: { type: 'feature', source: this.data.source || 'index', itemName: this.data.presetName || '比如：叶酸/进度条/备注框等', content: '', contact: '' }, images: [] })
    this.refreshRecords()
    wx.showToast({ title: '反馈已提交', icon: 'success' })
  }
})
