Component({
  properties: {
    current: { type: String, value: 'index' }
  },
  data: {
    items: [
      { id: 'index', label: '首页', path: '/pages/index/index' },
      { id: 'checklist', label: '清单', path: '/pages/checklist/checklist' },
      { id: 'mine', label: '我的', path: '/pages/mine/mine' }
    ]
  },
  methods: {
    go(e) {
      const { path } = e.currentTarget.dataset
      if (!path) return
      wx.reLaunch({ url: path })
    }
  }
})
