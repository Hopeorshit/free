// pages/PageFirst/PageFirst.js
import { GoodModel } from '../../model/index-model.js'
let goodModel = new GoodModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_selected: "/images/index-selected.png",
    index: "/images/index.png",
    launch: "/images/launch.png",
    my_selected: "/images/my-selected.png",
    my: "/images/my.png",
    unuse_selected: "/images/unuse-selected.png",
    unuse: "/images/unuse.png",
    current:1,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  nagivateTo1: function () {
  this.setData({
    current:1
  })
  },

  nagivateTo2: function () {
    wx.navigateTo({
      url: '/pages/launch/launch',
    })
  },
  nagivateTo3: function () {
    this.setData({
      current:3
    })
  },
  nagivateTo4: function () {
    this.setData({
      current:4
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