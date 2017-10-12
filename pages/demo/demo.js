// pages/demo/demo.js
Page({
  data: {
    isShowModal: false,
    animationData: {}
  },
  showModalEventFn () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation
    this.setData({
      animationData: animation.export(),
      isShowModal: true
    })
    setTimeout(function () {
      animation.opacity(1).step()
      this.setData({
        animationData: animation.export(),
        isShowModal: true
      })
    }.bind(this), 100)
  },
  
  hideModalEventFn () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.opacity(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 100)
    setTimeout(function () {
      this.setData({
        isShowModal: false
      })
    }.bind(this), 400)
  }
})