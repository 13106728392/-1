//index.js
//获取应用实例，获取全局的app.js的属性值
const app = getApp()

Page({
    data:{
      text:'你好啊，傻',
      returnDate:'',
      index:1,
      src:null,
      imgUrls: [
        "https://cdn.it120.cc/apifactory/2017/10/30/b07ee85fa64f0c68aa9a45fba20ec689.jpg",
        "https://cdn.it120.cc/apifactory/2017/10/30/94ed2ab19dc0ed01e65ac2fbd9e87147.jpg"
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 2000,
      duration: 1000,
      animation: {},
      hidden: true,
      nocancel: false
    },
    onLoad(){
      console.log('我是onLoad生命周期函数,相当于vue的beforeCreader');
      let that = this;

      wx.request({
        url: 'https://api.it120.cc/' + app.globalData.subDomain + '/banner/list',
        data: {
          key: 'mallName'
        },
        success: function (res) {
          if (res.data.code == 404) {
            wx.showModal({
              title: '提示',
              content: '请在后台添加 banner 轮播图片',
              showCancel: false
            })
          } else {
            that.setData({
              banners: res.data.data
            });
          }
        }
      })
    },
    onReady(){
      console.log('我是onReady生命周期函数')


      wx.startCompass({
        success:()=>{
          debugger
          wx.onCompassChange((res) => {
            console.log(res);
            debugger;
          })
        }
      })
     




      wx.showLoading();
      // wx.hideToast();
      wx.request({
        url: `${app.globalData.BaseUrl}/test1`,
        success:(res)=>{
          wx.hideLoading();

          // wx.showToast({
          //   title: '成功',
          //   icon: 'success',
          //   duration: 2000
          // })
          console.log(res);
          this.setData({
            returnDate: res['data']['cparagraph']
          })
        }
      });
  }, 
    onShow(){
      console.log('onShow生命周期函数，被显示的时候触发');
     
    },
    onHide(){
      console.log('被隐藏的时候触发')
    },
    //监听用户下拉刷新时使用的函数，要做在app.json中进行配置
    onPullDownRefresh(){
      console.log('你下拉了')
    },
    onShareAppMessage(res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '自定义转发标题',
        //转发的路径，id后面是参数
        path: '/page/user?id=123'
      }
    },
  onclick(){
    console.log('原来你真的是个傻嗨啊')
  },
    //滚动事件
    onPageScroll(){

    },
  goOther(){
    wx.navigateTo({
      url: '/pages/newtest/test',
    })
  },
  takePhoto() {
    wx.navigateTo({
      url: '/pages/weekBox/weekBoxs',
    })
  },
  error(e) {
    console.log(e.detail)
  },
  //点击图片跳转到详情页
  tapBanner: function (e) {
    //参数e里面包含了，改节点的所以的信息，
    console.log(e);
    if (e.currentTarget.dataset.id != 0) {
      //路由跳转
      wx.navigateTo({
        //带参数传参数过去
        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
      })
    }
  },

  rotate: function () {
    //顺时针旋转10度
    //
    this.animation.rotate(150).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },
 //动画效果 
  touch: function () {
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 1000,
      /**
       * http://cubic-bezier.com/#0,0,.58,1  
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       *  http://www.tuicool.com/articles/neqMVr
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      timingFunction: 'ease-in',
      // 延迟多长时间开始
      delay: 100,
      /**
       * 以什么为基点做动画  效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      transformOrigin: 'left top 0'
    })
    //顺时针旋转10度
    this.animation.rotate(150).step().scale(2).step().rotate(0).step().scale(1).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },

  //点击打开弹框
  cancel: function () {
    this.setData({
      hidden: !this.data.hidden
    });
  },
  confirm: function () {
    this.setData({
      nocancel: !this.data.nocancel
    });
    console.log("clicked confirm");
  },
  danmu(){
    //跳转到手持弹幕
    wx.navigateTo({
      url: '/pages/danmu/danmu'
    })
  },
  dishu(){
    //打地鼠
    wx.navigateTo({
      url: '/pages/dishu/dishu'
    })
  },
  huaban(){
    //画板
    wx.navigateTo({
      url: '/pages/huaban/huaban'
    })
  },
  huakuai(){
    //滑块
    wx.navigateTo({
      url: '/pages/wxDrawer/index'
    })
  },
  tab(){
    //滑块
    wx.navigateTo({
      url: '/pages/scrollableTabView/index'
    })
  },
  donghua(){
    //动画
    wx.navigateTo({
      url: '/pages/donghua/donghua'
    })
  },
  tuwen(){
    //文本编辑器
    wx.navigateTo({
      url: '/pages/wenben/wenben'
    })
  }
});
