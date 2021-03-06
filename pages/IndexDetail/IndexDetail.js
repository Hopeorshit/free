// pages/IndexDetail/IndexDetail.js
import { GoodModel } from '../../model/index-model.js'
let goodModel = new GoodModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  good:Object,
  bid:""
  
  },

  /**
   * 生命周期函数--监听页面加载
   *//*bid是点击首页列表传递的good.id值 book传入的数据是数组项*/
  onLoad: function (options) {
    let bid = options.bid
      this.setData({
        good: goodModel.getHotList()[bid-1],
        bid:bid
      })
    
  },
  address:function(){
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },
  goLaunch:function(){
    wx.navigateTo({
      url: '/pages/launch/launch',
    })

  },
  goCanyu:function(){
    var good = JSON.stringify(this.data.good)
    wx.navigateTo({
      url: '../../pages/canyu-after/canyu-after?good=' + good,
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})