Page({
	data: {
		item: {}
	},
	onLoad: function(options) {
		this.getJson(options.id);
	},
	getJson: function(id){
		var that = this;
		wx.request({
			url: "https://cn.bing.com/HPImageArchive.aspx", 
			data: {
				format: "js",
				idx: "10",
				n: "10",
				nc: "1484033664561",
				pid: "hp",
				video: "10"
			}, 
			method: "GET", 
			success: function(res) {
				wx.hideToast();
				var imgs = res.data.images;
				imgs.forEach((item) => {
					var item = Object.assign(item, {url:'https://cn.bing.com'+item.url})
					if(item.hsh === id){
						that.setData({
							item: item
						});
					}
				})
			},
			fail: function(err){
			}
		});
	}
})