const { sections, stageMeta, flatItems, parseBrand, findItemById } = require('./catalog')
const { loadVersionInfo } = require('./storage')

function sortItems(a, b) {
  const left = Array.isArray(a) ? { week: a[2], group: a[3], name: a[1] } : a
  const right = Array.isArray(b) ? { week: b[2], group: b[3], name: b[1] } : b
  return left.week - right.week || String(left.group || '').localeCompare(String(right.group || ''), 'zh-CN') || String(left.name || '').localeCompare(String(right.name || ''), 'zh-CN')
}

function cloneStageMeta() {
  return stageMeta.map(meta => ({ ...meta }))
}

function createOverviewModel({ checklistState = {}, feedbackCount = 0 } = {}) {
  const total = flatItems.length
  const doneCount = flatItems.filter(item => checklistState[item.id] && checklistState[item.id].done).length
  const remarkCount = flatItems.filter(item => String((checklistState[item.id] && checklistState[item.id].remark) || '').trim()).length
  const stageCards = cloneStageMeta().map(meta => {
    const items = flatItems.filter(item => item.sectionId === meta.id)
    const done = items.filter(item => checklistState[item.id] && checklistState[item.id].done).length
    return { ...meta, count: items.length, done, rate: items.length ? Math.round((done / items.length) * 100) : 0 }
  })
  const stats = [
    { label: '清单项目', value: total },
    { label: '已勾选购买', value: doneCount },
    { label: '备注数量', value: remarkCount },
    { label: '反馈记录', value: feedbackCount }
  ]
  return { total, doneCount, remarkCount, rate: total ? Math.round((doneCount / total) * 100) : 0, stageCards, stats }
}

function createChecklistModel({ checklistState = {}, settings = {}, keyword = '', activeStage = 'all', purchaseFilter = 'all' } = {}) {
  const normalizedKeyword = String(keyword || '').trim().toLowerCase()
  return cloneStageMeta().map(meta => {
    const section = sections.find(node => node.id === meta.id)
    const items = section.items.slice().sort(sortItems).map(item => {
      const [id, name, week, group, tip, brand] = item
      const state = checklistState[id] || {}
      const pieces = parseBrand(brand)
      const quantity = findItemById(id)?.quantity || '按需'
      const summaryText = `${group}；${tip}`
      return {
        id,
        name,
        week,
        group,
        tip,
        summaryText,
        quantity,
        brandLabels: pieces.brands,
        done: Boolean(state.done),
        remark: state.remark || '',
        searchBlob: [name, week + '周', group, summaryText, pieces.brands, quantity, state.remark || ''].join(' ').toLowerCase()
      }
    }).filter(item => {
      const keywordMatch = !normalizedKeyword || item.searchBlob.includes(normalizedKeyword)
      const stageMatch = activeStage === 'all' || activeStage === meta.id
      const purchaseMatch = purchaseFilter === 'all' || (purchaseFilter === 'done' ? item.done : !item.done)
      return keywordMatch && stageMatch && purchaseMatch
    })
    return { ...meta, visible: items.length > 0, count: items.length, items, compact: Boolean(settings.compactMode) }
  }).filter(section => section.visible)
}

function buildExportText({ profile = {}, checklistState = {} } = {}) {
  const doneItems = flatItems.filter(item => checklistState[item.id] && checklistState[item.id].done)
  const lines = [
    '半糖孕册清单摘要',
    `预产期：${profile.dueDate || '未填写'}`,
    `当前孕周：${profile.week || '未填写'}`,
    `分娩偏好：${profile.deliveryMode || '未填写'}`,
    `目标医院：${profile.hospital || '未填写'}`,
    '',
    `已购项目：${doneItems.length}`
  ]
  doneItems.forEach(item => lines.push(`- ${item.name}（${item.quantity}）`))
  return lines.join('\n')
}

function createAdminModel({ checklistState = {}, feedbackList = [], analytics = {} } = {}) {
  const total = flatItems.length
  const done = flatItems.filter(item => checklistState[item.id] && checklistState[item.id].done).length
  const versionInfo = loadVersionInfo()
  const normalizedFeedback = feedbackList.map(item => {
    const type = item.type || (item.form && item.form.type) || 'feature'
    const content = item.content || (item.form && item.form.content) || ''
    const reply = String(item.reply || '').trim()
    return {
      ...item,
      id: item.id || `fb_${Date.now()}`,
      type,
      typeLabel: feedbackTypeLabel(type),
      userName: item.userName || item.loginName || '未登录用户',
      content,
      reply,
      handled: Boolean(reply),
      statusText: reply ? reply : '处理中'
    }
  })
  const handledCount = normalizedFeedback.filter(item => item.handled).length
  const feedbackStats = [
    { label: '总反馈量', value: normalizedFeedback.length },
    { label: '已处理量', value: handledCount },
    { label: '未处理量', value: normalizedFeedback.length - handledCount }
  ]
  const feedbackTypes = [
    { id: 'content', name: '内容纠错' },
    { id: 'brand', name: '品牌补充' },
    { id: 'feature', name: '功能建议' },
    { id: 'bug', name: '使用问题' }
  ]
  const feedbackGroups = feedbackTypes.map(type => {
    const items = normalizedFeedback.filter(item => item.type === type.id)
    const handled = items.filter(item => item.handled).length
    return { ...type, total: items.length, handled, rate: items.length ? Math.round((handled / items.length) * 100) : 0, items }
  })
  const kpis = [
    { label: 'PV', value: analytics.pv || 0 },
    { label: 'UV', value: Object.keys(analytics.visitors || {}).length },
    { label: '完成率', value: `${total ? Math.round((done / total) * 100) : 0}%` },
    { label: '反馈数', value: normalizedFeedback.length }
  ]
  const funnel = [
    { label: '进入首页', value: 100 },
    { label: '打开清单', value: 84 },
    { label: '完成勾选', value: 61 },
    { label: '写备注', value: 37 },
    { label: '提交反馈', value: 18 }
  ]
  return { kpis, total, done, feedbackList: normalizedFeedback.slice(0, 8), feedbackStats, feedbackGroups, funnel, versionInfo }
}

function feedbackTypeLabel(type) {
  const map = { feature: '功能建议', content: '内容纠错', brand: '品牌补充', bug: '使用问题', other: '其他' }
  return map[type] || type || '功能建议'
}

module.exports = { createOverviewModel, createChecklistModel, buildExportText, createAdminModel }
