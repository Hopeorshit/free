import { Base } from '../utils/base.js'
class Test extends Base {
  constructor() {
    super();
  }
  
  //获取用户ID,若需要用到wx.upload则需要传入用户id
  //1在店铺信息上传页面先调用这个接口获取用户id然后
  //2店铺信息上传之后返回结构接口有变化，需要将返回的店铺信息写入缓存。在进入发布促销活动的页面后调用缓存，显示店铺图片
  userId(callBack){
    var params = {
      url: 'user/id',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  //发起新的促销活动
  promotionNew(callBack) {
    var params = {
      url: 'promotion/new',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: 'POST',
      data: {
        name:"小东北四人餐",
        count:4,
        zan_count:20,
        end_data:"2019-11-02",
        description:"每人限用一次"
      }
    };
    this.request(params);
  }

  //获取首页促销活动的类表
  //get类型的请求，参数为page 和 pageSize
  promotionList(page,pageSize,callBack) {
    var params = {
      url: 'promotion/list?page=1&page_size=10',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  //促销信息详情
  //注意传入
  promotionDetail(id, callBack) {
    var params = {
      url: 'promotion/detail?id=11',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
  
}
export { Test }