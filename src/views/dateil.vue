<template>
  <div class='container'>
    <div class="swiperk" id="header-boxl">
      <swipe class="my-swipe" :auto="5000">
          <swipe-item class="slide" v-for="(item,index) in list" :key="index">
            <img :src="item.url" alt="">
            <p>{{address}}</p>
          </swipe-item>
      </swipe>
    </div>
    <!-- 模块1 -->
    <div class="modular">
      <div class="modular-t">
        <h1>特色服务</h1>
        <h4>优惠不停，惊喜不断</h4>
      </div>
      <div class="modular-b">
        <div class="left postr">
          <div class="img-title top-box1">
            <h2 style="color:#f968b5">七夕有礼</h2>
            <h4>花积分兑换浪漫</h4>
          </div>
          <img src="../assets/images/dateil_1.png" alt="">
        </div>
        <div class="right">
          <div class="right-t postr">
            <div class="img-title top-box2">
              <h2 style="color:#77c953">境外自由行</h2>
              <h4>精选路线 999元起</h4>
            </div>
            <img src="../assets/images/dateil_2.png" alt="">
          </div>
          <div class="right-b">
            <div class="postr">
              <div class="img-title top-box3">
                <h2 style="color:#555">积分兑换</h2>
                <h4>生日当日优惠兑换</h4>
              </div>
              <img src="../assets/images/dateil_3.png" alt="">
            </div>
            <div class="postr">
              <div class="img-title top-box3">
                <h2 style="color:#5a88de">推荐办卡</h2>
                <h4>好礼送不停</h4>
              </div>
              <img src="../assets/images/dateil_4.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模块2 -->
    <div class="modular">
      <div class="modular-t">
        <h1>特约商户</h1>
        <h4>让你的生活更精彩</h4>
      </div>
      <div class="modular-btwo">
        <div class="left postr">
          <div class="img-title top-box3">
            <h2 style="color:#2eded4">快递业务积分兑换</h2>
          </div>
          <img src="../assets/images/dateil_5.png" alt="">
        </div>
        <div class="right postr">
          <div class="img-title top-box3">
            <h2 style="color:#77c953">华彩人生抢兑礼</h2>
          </div>
          <img src="../assets/images/dateil_6.png" alt="">
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
  computed: {
    ...mapState(['isLogin'])
  },
  components: { tabbar},
  data () {
    return {
      list: [],
      address: ''
    }
  },
  destroyed () {

  },
  mounted() {
    // 微信分享
    commonShare(this, shareTitle, shareUrl, shareImg, shareDesc);
  },
  
  methods: {
    get(){
      axios.get('./static/json/dateil.json').then(res => {
        // console.log(res.data);
        this.list = res.data.list
        this.address = res.data.address
      }, response => {
        this.$dialog.alert({
           // title:'标题呀',
           message: '获取资源列表异常'
        }).then(()=>{
          console.log('点击了确认')
        })
      });
      
    },
  },
  created() {
    // this.userId = window.localStorage.getItem('userId')
    this.get()
  },
}
</script>

<style  lang='scss' rel='stylesheet/scss' scoped>
@import 'vue-swipe/dist/vue-swipe.css';
.container{
  width: 100%;
  // height: 100vh;
  background: #F7F7F7;
  overflow: hidden;
  // padding: .18rem;
  .swiperk{
    width: 100%;
    height: 3.55rem;
    img{
      display: block;
      width: 100%;
      // height: 3.20rem;
    }
    p{
      color: #fff;
      font-size: .26rem;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
      height: .7rem;
      padding: 0 .28rem;
      line-height: .7rem;
      width: 100%;
      background-image: linear-gradient(rgba(0,0,0,.0), rgba(0,0,0,.8));
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
  .modular{
    width: 100%;
    height: auto;
    .modular-t{
      width: 100%;
      height: .85rem;
      padding: .35rem 0 0 .25rem;
      display: flex;
      // align-items: center;
      h1{
        color: #d71218;
        font-size: .3rem;
        font-weight: bold;
        line-height: .3rem;
      }
      h4{
        color: #333;
        font-size: .2rem;
        line-height: .2rem;
        margin-top: .1rem;
        margin-left: .15rem;
      }
    }
    .modular-b{
      width: 100%;
      display: flex;
      height: 3.23rem;
      overflow: hidden;
      img{
        display: block;
        width: 100%;
      }
      .left{
        width: 2.84rem;
        height: 100%;
        border-right: 1px solid #FAFAFA;
        background: #fff;
      }
      .right{
        width: 4.66rem;
        height: 100%;
        overflow: hidden;

        .right-t{
          width: 100%;
          height: 1.28rem;
          border-bottom: 1px solid #FAFAFA;
          overflow: hidden;
        }
        .right-b{
          width: 100%;
          height: 1.96rem;
          display: flex;
          div:nth-child(1){
            width: 2.24rem;
            height: 100%;
            border-right: 1px solid #FAFAFA;
            overflow: hidden;
            
          }
          div:nth-child(2){
            width: 2.42rem;
            height: 100%;
          }
        }
      }
    }
    .modular-btwo{
      width: 100%;
      display: flex;
      height: 2.34rem;
      overflow: hidden;
      img{
        display: block;
        width: 100%;
      }
      .left{
        width: 50%;
        height: 100%;
        border-right: 1px solid #FAFAFA;
      }
      .right{
        width: 50%;
        height: 100%;
      }
    }
    .postr{
      position: relative;
      .img-title{
        position: absolute;
        top: 0;
        left: .24rem;
        h2{
          font-size: .24rem;
          font-weight: 600;
        }
        h4{
          font-size: .18rem;
          color: #888;
        }
      }
      .top-box1{
        top: .3rem;
      }
      .top-box2{
        top: .35rem;
      }
      .top-box3{
        top: .2rem;
      }
    }
  }
}
</style>
