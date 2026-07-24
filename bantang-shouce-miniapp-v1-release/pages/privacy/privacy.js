const { loadAuth } = require('../../utils/storage')
const { trackEvent } = require('../../utils/analytics')

Page({
  data: {
    auth: loadAuth()
  },
  onLoad() {
    trackEvent('page_view', { page: 'privacy' })
  },
  onShow() {
    this.setData({ auth: loadAuth() })
  }
})
