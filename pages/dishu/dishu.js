// pages/dishu/dishu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic1: '../../accest/boll.jpg',
    pic2:'../../accest/lvcao.jpg',
    interval: "" ,     //定时器
    speed:2000,
    isStart:false,
    showNum:0,
    buttonClicked:false,
    isClick:false,
    picList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let arr =[];
    for(let i = 0;i<9;i++){
      arr.push({ url2: '../../accest/lvcao.jpg'})
    }
    this.setData({
      picList:arr
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
  //开始
  start(){
    clearInterval(this.data.setInter);
    this.setData({
      isClick:true
    })
    this.data.setInter= setInterval(()=>{  
      let num = parseInt(Math.random() * 9);
      let arr = JSON.parse(JSON.stringify(this.data.picList)); 
      for (let i = 0; i < arr.length ;i++){
        let item = arr[i];
        item['url2'] = this.data['pic2'];
        if(i == num){
          item['url2']=this.data.pic1;
        }
      }
      // this.changeNum();
      this.setData({
        picList: arr,
        isStart:true,
        isClick:false
      })
    },this.data.speed);
  },
  stop(){
    clearInterval(this.data.setInter);
    let newArr =this.data.picList;
    newArr.forEach(item=>{
      item['url2']=this.data.pic2;
    })
    this.setData({
      isStart: false,
      picList:newArr
    })
  },
  tapBanner(e){
    if(!this.data.isStart){
      this.stop();
      return false;
    }
    if (e['target']['dataset']['id'] !='../../accest/lvcao.jpg'){
      if(this.data.isClick){
        return false;
      }
      let add =this.data.showNum+1;
      if(add%10==0 && this.data.speed!=200){
        this.setData({
          speed: this.data.speed-300
        });
        this.start();
      }
      this.setData({
        showNum: add,
        isClick:true
      })
    }else{
      this.changeNum();
    }
  },
  changeNum(){
    if (this.data.isStart) {
      if (this.data.showNum == 0) {
        wx.showToast({
          title: '游戏结束',
          icon: 'success',
          duration: 2000,
          mask: true
        })
        this.stop();
        return false;
      }
      this.setData({
        showNum: this.data.showNum - 1,
      })
    }
  }
})