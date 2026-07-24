const { loadChecklistState, loadFeedbackList } = require('../../utils/storage')
const { createOverviewModel } = require('../../utils/view-model')
const { stageMeta, flatItems } = require('../../utils/catalog')
const { trackEvent } = require('../../utils/analytics')

Page({
  data: { stageCards: [], stats: [], completionRate: 0, highlightCards: [] },
  onLoad() { trackEvent('page_view', { page: 'index' }); this.refresh() },
  onShow() { this.refresh() },
  refresh() {
    const checklistState = loadChecklistState()
    const overview = createOverviewModel({ checklistState, feedbackCount: loadFeedbackList().length })
    const highlightCards = stageMeta.map((stage, index) => {
      const items = flatItems.filter(item => item.sectionId === stage.id)
      const done = items.filter(item => checklistState[item.id] && checklistState[item.id].done).length
      const title = stage.title
      return { id: stage.id, order: index + 1, name: stage.name, title, count: items.length, done, rate: items.length ? Math.round(done / items.length * 100) : 0 }
    })
    const stats = [
      { label: '清单项目', value: overview.total },
      { label: '孕周提醒', value: '3 阶段' },
      { label: '用途、量级、品牌建议、说明', value: '4项说明' }
    ]
    this.setData({ stageCards: overview.stageCards, stats, completionRate: overview.rate, highlightCards })
  },
  goChecklist() { wx.reLaunch({ url: '/pages/checklist/checklist' }) },
  goMine() { wx.reLaunch({ url: '/pages/mine/mine' }) },
  openStage(e) { const { stage } = e.currentTarget.dataset; if (stage) wx.reLaunch({ url: `/pages/checklist/checklist?stage=${stage}` }) }
})
