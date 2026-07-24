const { loadAnalytics, saveAnalytics, ensureVisitorId, loadFeedbackList } = require('./storage')

function trackEvent(type, payload = {}) {
  const analytics = loadAnalytics()
  const visitorId = ensureVisitorId()
  const now = Date.now()
  analytics.pv += 1
  analytics.visitors[visitorId] = now
  analytics.events.unshift({ id: `evt_${now}_${Math.random().toString(16).slice(2, 8)}`, type, payload, ts: now })
  analytics.events = analytics.events.slice(0, 200)
  saveAnalytics(analytics)
  return analytics
}

function recordFeedback(payload) { return trackEvent('feedback_submit', payload) }

module.exports = { trackEvent, recordFeedback, loadAnalytics, loadFeedbackList }
