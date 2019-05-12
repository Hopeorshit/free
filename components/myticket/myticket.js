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
    },
    typeto:{
      type:Number,
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
    ticket:function(){
     
      if (this.properties.typeto==1)
      {
        wx.navigateTo({
          url: '/pages/ticket/ticket',
      })}
      else{
        if (this.properties.typeto == 3)
        {wx.navigateTo({
          url: '/pages/SJXX/sjxx',
        })}
        else{
          wx.navigateTo({
            url: '/pages/SJRZ/sjzr',
          })
        }
      }

    }
  }
})
