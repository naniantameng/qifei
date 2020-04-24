//index.js
//获取应用实例
const app = getApp()
let _this;
Page({
	data: {
		isShow: false,
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		location: {}
	},
	onShow: function () {
		_this = this;
		app.getLocation().then(res => {
			_this.setData({
				isShow: true
			})
			_this.getWeather(res);
		})
	},
	onLoad: function () {
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},
	getWeather(data) {
		app.Weaher.getCgWeather('now', {
		  location: `${data.longitude},${data.latitude}`
		}).then(res => {
			console.log(res);
			this.setData({
				location: res.HeWeather6[0]
			})
		})
	}
})
