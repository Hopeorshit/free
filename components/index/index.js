// components/index/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    good:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    image:"",
    title:"",
    dianzanshu:Number,
    date:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (event) {
      this.triggerEvent('goodtap', {
        bid: this.properties.good.id
      }, {})
      wx.navigateTo({
        url: '../../pages/IndexDetail/IndexDetail?bid=' + this.properties.good.id,
      })
    }
  }
})
