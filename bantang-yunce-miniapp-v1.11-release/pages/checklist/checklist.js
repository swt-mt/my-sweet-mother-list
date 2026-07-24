const { loadChecklistState, saveChecklistState, loadSettings, loadAuth } = require('../../utils/storage')
const { createChecklistModel } = require('../../utils/view-model')
const { stageMeta } = require('../../utils/catalog')
const { requireLogin } = require('../../utils/auth')
const { trackEvent } = require('../../utils/analytics')

Page({
  data: {
    keyword: '',
    activeStage: 'all',
    purchaseFilter: 'all',
    expandedSections: {},
    sections: [],
    overview: { total: 0, doneCount: 0, remarkCount: 0, rate: 0 },
    auth: loadAuth(),
    settings: loadSettings(),
    stageTabs: [{ id: 'all', name: '全部' }, ...stageMeta.map(stage => ({ id: stage.id, name: stage.name }))],
    purchaseTabs: [
      { id: 'done', name: '已购' },
      { id: 'todo', name: '未购' },
      { id: 'clear', name: '清空' }
    ]
  },
  onLoad(options = {}) {
    if (options.stage) this.setData({ activeStage: options.stage })
    trackEvent('page_view', { page: 'checklist', stage: options.stage || 'all' })
    this.refresh()
  },
  onShow() { this.refresh() },
  refresh() {
    const checklistState = loadChecklistState()
    const settings = loadSettings()
    const auth = loadAuth()
    const expandedSections = this.data.expandedSections || {}
    const sections = createChecklistModel({
      checklistState,
      settings,
      keyword: this.data.keyword,
      activeStage: this.data.activeStage,
      purchaseFilter: this.data.purchaseFilter
    }).map(section => ({ ...section, expanded: Boolean(expandedSections[section.id]) }))
    const allSections = createChecklistModel({ checklistState, settings, keyword: '', activeStage: 'all' })
    const total = allSections.reduce((sum, section) => sum + section.items.length, 0)
    const doneCount = allSections.reduce((sum, section) => sum + section.items.filter(item => item.done).length, 0)
    const remarkCount = allSections.reduce((sum, section) => sum + section.items.filter(item => String(item.remark || '').trim()).length, 0)
    this.setData({ sections, settings, auth, overview: { total, doneCount, remarkCount, rate: total ? Math.round(doneCount / total * 100) : 0 } })
  },
  onKeywordInput(e) {
    this.setData({ keyword: e.detail.value })
    this.refresh()
  },
  switchStage(e) {
    this.setData({ activeStage: e.currentTarget.dataset.stage })
    this.refresh()
  },
  switchPurchaseFilter(e) {
    const filter = e.currentTarget.dataset.filter
    if (!filter) return
    if (filter === 'clear') {
      this.clearDone()
      return
    }
    this.setData({ purchaseFilter: this.data.purchaseFilter === filter ? 'all' : filter })
    this.refresh()
  },
  toggleSection(e) {
    const id = e.currentTarget.dataset.id
    if (!id) return
    this.setData({ [`expandedSections.${id}`]: !this.data.expandedSections[id] })
    setTimeout(() => this.refresh(), 0)
  },
  toggleDone(e) {
    const id = e.currentTarget.dataset.id
    if (!id) return
    if (!requireLogin('勾选已购', '/pages/auth/auth')) return
    const state = loadChecklistState()
    state[id] = { ...(state[id] || {}), done: !state[id]?.done }
    saveChecklistState(state)
    trackEvent('toggle_done', { id, done: state[id].done })
    this.refresh()
  },
  onRemarkInput(e) {
    const id = e.currentTarget.dataset.id
    if (!id) return
    if (!requireLogin('填写备注', '/pages/auth/auth')) return
    const state = loadChecklistState()
    state[id] = { ...(state[id] || {}), remark: e.detail.value }
    saveChecklistState(state)
    trackEvent('edit_remark', { id })
    this.refresh()
  },
  clearDone() {
    if (!requireLogin('清空已购', '/pages/auth/auth')) return
    const state = loadChecklistState()
    Object.keys(state).forEach(key => {
      if (state[key]) state[key].done = false
    })
    saveChecklistState(state)
    trackEvent('clear_done')
    this.refresh()
  }
})
