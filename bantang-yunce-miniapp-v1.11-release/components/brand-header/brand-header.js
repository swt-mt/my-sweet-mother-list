const { saveAuth } = require('../../utils/storage')

Component({
  properties: {
    subtitle: { type: String, value: '给妈妈的孕产准备工具' },
    compact: { type: Boolean, value: false },
    auth: { type: Object, value: { loggedIn: false, method: '', name: '', avatar: '' } },
    loginUrl: { type: String, value: '/pages/auth/auth' }
  },
  methods: {
    onAuthTap() {
      const auth = this.properties.auth || {}
      if (auth.loggedIn && !auth.avatar) {
        this.chooseLoggedInAvatar(auth)
        return
      }
      if (auth.loggedIn) {
        wx.showToast({ title: '已登录', icon: 'none' })
        return
      }
      const url = this.properties.loginUrl || '/pages/auth/auth'
      wx.navigateTo({ url })
    },
    chooseLoggedInAvatar(auth) {
      wx.showModal({
        title: '访问本地媒体文件',
        content: '是否允许半糖孕册访问本地相册，用于选择头像图片？',
        confirmText: '允许',
        cancelText: '取消',
        success: res => {
          if (!res.confirm) return
          const choose = wx.chooseMedia || wx.chooseImage
          if (wx.chooseMedia) {
            wx.chooseMedia({
              count: 1,
              mediaType: ['image'],
              sourceType: ['album', 'camera'],
              sizeType: ['compressed'],
              success: result => {
                const file = result.tempFiles && result.tempFiles[0]
                if (file && file.tempFilePath) this.saveAvatar(auth, file.tempFilePath)
              }
            })
            return
          }
          choose({
            count: 1,
            sourceType: ['album', 'camera'],
            sizeType: ['compressed'],
            success: result => {
              const path = result.tempFilePaths && result.tempFilePaths[0]
              if (path) this.saveAvatar(auth, path)
            }
          })
        }
      })
    },
    saveAvatar(auth, avatar) {
      const nextAuth = { ...auth, avatar }
      saveAuth(nextAuth)
      this.setData({ auth: nextAuth })
      this.triggerEvent('authchange', { auth: nextAuth })
      wx.showToast({ title: '头像已更新', icon: 'success' })
    },
    getNameInitial(name) {
      return String(name || '妈').trim().slice(0, 1) || '妈'
    }
  }
})
