Component({
  properties: {
    subtitle: { type: String, value: '给妈妈的孕产准备工具' },
    compact: { type: Boolean, value: false },
    auth: { type: Object, value: { loggedIn: false, method: '', name: '', avatar: '' } },
    loginUrl: { type: String, value: '/pages/auth/auth' }
  },
  methods: {
    onAuthTap() {
      const url = this.properties.loginUrl || '/pages/auth/auth'
      wx.navigateTo({ url })
    },
    getNameInitial(name) {
      return String(name || '妈').trim().slice(0, 1) || '妈'
    }
  }
})
