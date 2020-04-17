<template>
  <div class='container'>
    <div class="conApp">
      <img class="banner-bj" src="../assets/images/zp-1.jpg" alt="">
      <div class="activity">
        <img class="title-img" src="../assets/images/xingyun.png" alt="">
        <div class="wheel">
          <img class="bj-img" src="../assets/images/zhuanpan.png" alt="">
          <div class="wheel-pan">
            <div class="wheel-bg" :class="{freeze: freeze}" :style="`transform: rotate(${wheelDeg}deg)`">
                <div class="prize-list">
                    <div class="prize-item-wrapper" v-for="(item,index) in prizeList" :key="index">
                        <div class="prize-item" :style="`transform: rotate(${(360/ prizeList.length) * index}deg)`">
                            <div class="prize-name"></div>
                            <div class="prize-icon">
                              <span v-show="!item.icon">{{ item.name }}</span>
                              <img v-show="!item.name" :src="item.icon">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wheel-pointer" @click="onClickRotate"></div>
          </div>
        </div>
        <div class="activ">
          <div>活动规则</div>
          <h2>活动时间</h2>
          <p>{{active.time}}</p>
          <h2>参与资格</h2>
          <p><span v-html="active.has"></span></p>
          <h2>活动奖励</h2>
          <p class="box">{{active.success}}</p>
          <img src="../assets/images/liwubox.png" alt="">
        </div>
      </div>
    </div>

    <tabbar></tabbar>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapState, mapMutations } from 'vuex'
import wx from "weixin-js-sdk";
import tabbar from '../components/tabbar'
import axios from 'axios'
import {commonShare, shareTitle, shareUrl, shareImg, shareDesc} from "@/common/share";

export default {
  name: 'index',
  data() {
    return {
      active: '',
      freeze: false,
      clickType: true,
      wheelDeg: 0,
      prizeNumber: 10,
      prizeListOrigin: [],
      // list: [
      //   {
      //     url: './static/images/youhui.png',
      //     title: "优惠生活",
      //     name: ''
      //   },
      //   {
      //     url: './static/images/liping.png',
      //     title: "礼品兑换",
      //     name: ''
      //   },
      //   {
      //     url: './static/images/icon_3.png',
      //     title: "便利社区",
      //     name: ''
      //   },
      //   {
      //     url: './static/images/icon_4.png',
      //     title: "我的账户",
      //     name: 'activity'
      //   }
      // ]
    };
  },
  components: { tabbar},
  computed: {
    prizeList() {
      return this.prizeListOrigin.slice(0, this.prizeNumber)
    }
  },
  methods: {
    post(){
      axios.get('./static/json/activity.json').then(res => {
        // console.log(res.data);
        this.prizeListOrigin = res.data.list
        this.active = res.data.active
        // console.log(this.prizeListOrigin)
      }, response => {
        this.$dialog.alert({
           // title:'标题呀',
           message: '获取资源列表异常'
        }).then(()=>{
          console.log('点击了确认')
        })
      });
    },
    onClickRotate() {
      if(this.clickType){
        this.clickType =false
      }else{
        return false
      }
      const {wheelDeg, prizeList} = this;
      const random = Math.floor(Math.random() * (prizeList.length));
      console.log(random);
      this.wheelDeg = wheelDeg - wheelDeg % 360 + 8 * 360 + (360 - 360 / prizeList.length * random);
      setTimeout(() => {
        this.clickType = true
        this.$dialog.alert({
           // title:'标题呀',
           message:prizeList[random].title
        }).then(()=>{
          console.log('点击了确认')
        })
      }, 5000);
    }
  },
  watch: {
    prizeNumber() {
      this.freeze = true
      this.wheelDeg = 0

      setTimeout(() => {
        this.freeze = false
      }, 0)
    }
  },
  created(){
    this.post()
  }
}
</script>

<style  lang='scss' rel='stylesheet/scss' scoped>
.container{
  width: 100%;
  // height: 100vh;
  background: #F7F7F7;
  overflow: hidden;
  .conApp{
    width: 100%;
    height:calc(100vh - .98rem); //必须有高度
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;

    .banner-bj{
      display: block;
      width: 100%;
    }
    .activity{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      .title-img{
        width: 5.64rem;
        height: 2.04rem;
        display: block;
        margin: .5rem auto 0;
      }
      .wheel{
        width: 6.6rem;
        height: 6.96rem;
        display: block;
        margin: 0 auto;
        position: relative;
        .bj-img{
          display: block;
          width: 100%;
        }
        .wheel-pan{
          position: absolute;
          width: 5.41rem;
          height: 5.41rem;
          top: .55rem;
          left: .7rem;
          overflow: hidden;
        }
      }
    }

  }
  

}
.wheel-pointer {
  width: 1.97rem;
  height: 2.44rem;
  border-radius: 1000px;
  // background: yellow;
  background-image: url("../assets/images/zhuanpan-row.png");
  background-size: 100% 100%;
  position: absolute;
  left: 51%;
  top: 45%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 60px;
  z-index: 8;
}
.wheel-bg {
  width: 100%;
  height: 100%;
  border-radius: 1000px;
  overflow: hidden;
  transition: transform 5s ease-in-out;
  background-image: url("../assets/images/b-w.png");
  background-size: 100% 100%;
}

.freeze {
  transition: none;
  // background: red;
}

.prize-list {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
}

.prize-item-wrapper {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2.7rem;
    height: 2.7rem;
}

.prize-item {
    width: 100%;
    height: 100%;
    transform-origin: bottom;
}

.prize-name {
    padding: .2rem 0;
}

.prize-icon {
  img{
    width: 1rem;
    height: 1rem;
  }
  span{
    display: block;
    width: .3rem;  
    margin: 0 auto;  
    line-height: .3rem;
    font-size: .28rem;
    color: #02464c;
    font-weight: bold;
    text-align: center;
  }
}
.activ{
  width: 7rem;
  display: block;
  margin: 0 auto;
  background: rgba(255, 150, 166, 0.5);
  padding: .4rem .4rem .4rem .46rem;
  position: relative;
  div{
    text-align: center;
    background-image: url("../assets/images/title.png");
    background-size: 100% 100%;
    width: 2.76rem;
    height: .6rem;
    margin: 0 auto;
    font-size: .4rem;
    color: #f64a43;
    line-height: .6rem;
    // font-weight: bold;
  }
  h2{
    font-size: .3rem;
    color: #fff;
    line-height: .34rem;
    font-weight: bold;
    margin-top: .45rem;
  }
  P{
    font-size: .26rem;
    color: #fff;
    line-height: .34rem;
    margin-top: .1rem;
  }
  .box{
    width: 4.5rem;
  }
  img{
    width: 2.25rem;
    height: 2.23rem;
    position: absolute;
    bottom: -.6rem;
    right: -.1rem;
  }
}
</style>
