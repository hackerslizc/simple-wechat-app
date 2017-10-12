//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    cells:[]
  },
  //事件处理函数
  tapName: function(event) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.navigateTo({
      url: '../detail/detail?id='+event.currentTarget.id
    })
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 100000
    })
    wx.request({
        url: "https://cn.bing.com/HPImageArchive.aspx", 
        data: {
          format: "js",
          idx: "10",
          n: "20",
          nc: "1484033664561",
          pid: "hp",
          video: "10"
        }, 
        method: "GET", 
        success: function(res) {
            wx.hideToast()
            var cells = [],
                imgs = res.data.images;
            imgs.forEach((item) => {
              var imgsrc = 'https://cn.bing.com'+item.url;
              cells.push({
                id: item.hsh,
                src: imgsrc, 
                title: item.copyright, 
                date: that.setTimeFormat(item.enddate)
              });
            })
            that.setData({
              cells: cells
            });
        },
        fail: function(err){
          console.log(err)
        }
    });
    // 测试数据
    // that.setData({
    //   cells: [{
    //     id: "58f3197a155858e7c5243905733c200f",
    //     src: "https://cn.bing.com/az/hprichbg/rb/BelarusDeer_ZH-CN10349578779_1920x1080.jpg",
    //     title: "雪地里的红鹿 (© Getty Images)",
    //     date: _date
    //   },{
    //     id: "81b0b2b1e4d0ebe64b5c99548e4b68a5",
    //     src: "https://cn.bing.com/az/hprichbg/rb/BelarusDeer_ZH-CN10349578779_1920x1080.jpg",
    //     title: "雪地里的红鹿 (© Getty Images)",
    //     date: _date
    //   },{
    //     id: "b98247ef044d28fb92b72b5582879822",
    //     src:"https://cn.bing.com/az/hprichbg/rb/BelarusDeer_ZH-CN10349578779_1920x1080.jpg",
    //     title: "雪地里的红鹿 (© Getty Images)",
    //     date: _date
    //   }]
    // });
  },

  setTimeFormat: function(time){
    var fullTime = time,
        _years = fullTime.substr(0,4),
        _month = fullTime.substr(4,2),
        _day = fullTime.substr(6,2);
    return _years + ' - ' + _month + ' - ' + _day;
  }
})
