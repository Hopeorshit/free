// components/myticket/myticket.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    use:{
      type:String,
      value:""
    },
    src:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    ticket:function(){wx.navigateTo({
      url: '/pages/ticket/ticket',
    })
  }}
})
