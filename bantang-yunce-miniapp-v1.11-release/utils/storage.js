const STORAGE_KEYS = {
  checklistState: 'bantangYunceChecklistState',
  profile: 'bantangYunceProfile',
  settings: 'bantangYunceSettings',
  analytics: 'bantangYunceAnalytics',
  feedback: 'bantangYunceFeedbackList',
  adminUnlocked: 'bantangYunceAdminUnlocked',
  visitorId: 'bantangYunceVisitorId',
  auth: 'bantangYunceAuth',
  versionInfo: 'bantangYunceVersionInfo'
}

const DEFAULT_PROFILE = {
  dueDate: '2026-10-01',
  week: '24',
  stage: 'pregnancy',
  hospital: '待填写',
  deliveryMode: '顺产准备'
}

const DEFAULT_SETTINGS = {
  showBrandSource: true,
  compactMode: false,
  reminderTime: '20:30',
  fontScale: '标准'
}

const DEFAULT_AUTH = {
  loggedIn: false,
  method: '',
  name: '',
  avatar: '',
  createdAt: ''
}

const DEFAULT_VERSION_INFO = {
  version: 'v0.4.0',
  releaseTime: '2026-07-23',
  updatesText: '新增注册登录、头像选择和隐私协议阅读校验。\n优化反馈管理，支持回复状态、处理统计和分类进度。\n清单更新为 82 项，并保留勾选、备注和品牌建议。'
}

function readJSON(key, fallback) {
  try {
    const value = wx.getStorageSync(key)
    return value === '' || value === undefined || value === null ? fallback : value
  } catch (err) {
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    wx.setStorageSync(key, value)
  } catch (err) {}
  return value
}

function mergeProfile(profile = {}) {
  return { ...DEFAULT_PROFILE, ...profile }
}

function mergeSettings(settings = {}) {
  return { ...DEFAULT_SETTINGS, ...settings }
}

function mergeAuth(auth = {}) {
  return { ...DEFAULT_AUTH, ...auth, loggedIn: Boolean(auth && auth.loggedIn) }
}

function normalizeVersionUpdates(input) {
  if (Array.isArray(input)) {
    return input.map(line => String(line || '').trim()).filter(Boolean)
  }
  return String(input || '')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
}

function mergeVersionInfo(versionInfo = {}) {
  const source = versionInfo || {}
  const updatesText = source.updatesText !== undefined
    ? String(source.updatesText || '')
    : normalizeVersionUpdates(source.updates).join('\n')
  return {
    ...DEFAULT_VERSION_INFO,
    ...source,
    updates: normalizeVersionUpdates(updatesText || source.updates),
    updatesText
  }
}

function loadChecklistState() {
  return readJSON(STORAGE_KEYS.checklistState, {}) || {}
}

function saveChecklistState(state) {
  return writeJSON(STORAGE_KEYS.checklistState, state || {})
}

function loadProfile() {
  return mergeProfile(readJSON(STORAGE_KEYS.profile, {}) || {})
}

function saveProfile(profile) {
  return writeJSON(STORAGE_KEYS.profile, mergeProfile(profile || {}))
}

function loadSettings() {
  return mergeSettings(readJSON(STORAGE_KEYS.settings, {}) || {})
}

function saveSettings(settings) {
  return writeJSON(STORAGE_KEYS.settings, mergeSettings(settings || {}))
}

function loadFeedbackList() {
  return readJSON(STORAGE_KEYS.feedback, []) || []
}

function saveFeedbackList(list) {
  return writeJSON(STORAGE_KEYS.feedback, Array.isArray(list) ? list : [])
}

function loadAnalytics() {
  const fallback = { pv: 0, visitors: {}, events: [] }
  const analytics = readJSON(STORAGE_KEYS.analytics, fallback) || fallback
  analytics.pv = Number(analytics.pv || 0)
  analytics.visitors = analytics.visitors && typeof analytics.visitors === 'object' ? analytics.visitors : {}
  analytics.events = Array.isArray(analytics.events) ? analytics.events : []
  return analytics
}

function saveAnalytics(analytics) {
  return writeJSON(STORAGE_KEYS.analytics, analytics || { pv: 0, visitors: {}, events: [] })
}

function loadVersionInfo() {
  return mergeVersionInfo(readJSON(STORAGE_KEYS.versionInfo, {}) || {})
}

function saveVersionInfo(versionInfo) {
  return writeJSON(STORAGE_KEYS.versionInfo, mergeVersionInfo(versionInfo || {}))
}

function isAdminUnlocked() {
  return Boolean(readJSON(STORAGE_KEYS.adminUnlocked, false))
}

function setAdminUnlocked(value) {
  return writeJSON(STORAGE_KEYS.adminUnlocked, Boolean(value))
}

function ensureVisitorId() {
  let visitorId = readJSON(STORAGE_KEYS.visitorId, '')
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`
    writeJSON(STORAGE_KEYS.visitorId, visitorId)
  }
  return visitorId
}

function loadAuth() {
  return mergeAuth(readJSON(STORAGE_KEYS.auth, {}) || {})
}

function saveAuth(auth) {
  return writeJSON(STORAGE_KEYS.auth, mergeAuth(auth || {}))
}

function clearAuth() {
  return writeJSON(STORAGE_KEYS.auth, { ...DEFAULT_AUTH })
}

module.exports = {
  STORAGE_KEYS,
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
  DEFAULT_AUTH,
  DEFAULT_VERSION_INFO,
  readJSON,
  writeJSON,
  mergeProfile,
  mergeSettings,
  mergeAuth,
  mergeVersionInfo,
  loadChecklistState,
  saveChecklistState,
  loadProfile,
  saveProfile,
  loadSettings,
  saveSettings,
  loadFeedbackList,
  saveFeedbackList,
  loadAnalytics,
  saveAnalytics,
  loadVersionInfo,
  saveVersionInfo,
  loadAuth,
  saveAuth,
  clearAuth,
  isAdminUnlocked,
  setAdminUnlocked,
  ensureVisitorId
}
