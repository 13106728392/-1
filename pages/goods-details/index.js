// pages/goods-details/goods-details.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    goodsDetail: {},
    swiperCurrent: 0,
    hasMoreSelect: false,
    selectSize: "选择：",
    selectSizePrice: 0,
    totalScoreToPay: 0,
    shopNum: 0,
    hideShopPopup: true,
    buyNumber: 0,
    buyNumMin: 1,
    buyNumMax: 0,
    propertyChildIds: "",
    propertyChildNames: "",
    canSubmit: false, //  选中规格尺寸时候是否允许加入购物车
    shopCarInfo: {},
    shopType: "addShopCar",//购物类型，加入购物车或立即购买，默认为加入购物车
    animation:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //如果有参数的话，就会在这里以对象的形式传过来
    console.log(options);
    let that = this;
    wx.showLoading();
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/detail',
      data: {
        id: options.id
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res); 
        var selectSizeTemp = "";
        if (res.data.data.properties) {
          for (var i = 0; i < res.data.data.properties.length; i++) {
            selectSizeTemp = selectSizeTemp + " " + res.data.data.properties[i].name;
          }
          that.setData({
            hasMoreSelect: true,
            selectSize: that.data.selectSize + selectSizeTemp,
            selectSizePrice: res.data.data.basicInfo.minPrice,
            totalScoreToPay: res.data.data.basicInfo.minScore
          });
        }
        if (res.data.data.basicInfo.pingtuan) {
          that.pingtuanList(e.id)
        }
        that.data.goodsDetail = res.data.data;
        console.log(that.data.goodsDetail)
        if (res.data.data.basicInfo.videoId) {
          that.getVideoSrc(res.data.data.basicInfo.videoId);
        }
        that.setData({
          goodsDetail: res.data.data,
          selectSizePrice: res.data.data.basicInfo.minPrice,
          totalScoreToPay: res.data.data.basicInfo.minScore,
          buyNumMax: res.data.data.basicInfo.stores,
          buyNumber: (res.data.data.basicInfo.stores > 0) ? 1 : 0
        });
      }
    })
  
    this.reputation(options.id);
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

  },
  reputation: function (goodsId) {
    //加载评论
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/reputation',
      data: {
        goodsId: goodsId
      },
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data.data);
          
          that.setData({
            reputation: res.data.data
          });
        }
      }
    })
  },
  //点击加入加入购物车
  toAddShopCar: function () {
    this.setData({
      shopType: "addShopCar"
    })
    this.bindGuiGeTap();
  },
  /**
 * 规格选择弹出框
 */
  bindGuiGeTap: function () {
    this.setData({
      hideShopPopup: false,
    })
  },
  closePopupTap(){
    this.setData({
      hideShopPopup: true
    })
  },
  //数量减
  numJianTap(){
    if (this.data.buyNumber==0){
      this.data.buyNumber=0
    }else{
      this.data.buyNumber--;
    }
    this.setData({
      buyNumber: this.data.buyNumber
    })
  },
  //数量加
  numJiaTap(){
    this.data.buyNumber++
    this.setData({
      buyNumber: this.data.buyNumber
    })
  },
  //尺码点击
  labelItemTap(e){
    // .childsCurGoodsgoodsDetail
    let that = this;
   
    var childs = that.data.goodsDetail.properties[e.currentTarget.dataset.propertyindex].childsCurGoods;
    console.log(childs);
    //先清空全部样式
    for (var i = 0; i < childs.length; i++) {
      that.data.goodsDetail.properties[e.currentTarget.dataset.propertyindex].childsCurGoods[i].active = false;
    }
    //单独添加到点击的样式
    that.data.goodsDetail.properties[e.currentTarget.dataset.propertyindex].childsCurGoods[e.currentTarget.dataset.propertychildindex].active = true;
    // debugger
    this.setData({
      goodsDetail: that.data.goodsDetail,
     
    })  
  }
})