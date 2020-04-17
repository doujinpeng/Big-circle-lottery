<template>
  <div class="bottom">
    <div class="li" v-for="(item, index) in tabList" :key="index">
      <router-link class="link" tag="span" :to="{name: item.name}">
        <img :src="item.url" :class="'icons' + ' icons'+index" alt="">
        <p>{{item.title}}</p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: ["list"],
  data(){
    return{
      tabList: [
        {
          url: './static/images/icon_1.png',
          title: "优惠生活",
          name: 'index'
        },
        {
          url: './static/images/icon_2.png',
          title: "合作商户",
          name: 'merchantList'
        },
        {
          url: './static/images/icon_3.png',
          title: "便利社区",
          name: ''
        },
        {
          url: './static/images/icon_4.png',
          title: "我的账户",
          name: 'activity'
        }
      ]
    }
  },
  created() {
    if(this.list){
      this.tabList = this.list
    }
  },
}
</script>

<style lang="scss" type="text/css" scoped>
  .bottom{
    width: 100%;
    position: fixed;
    height: .98rem;
    display: flex;
    bottom: 0;
    left: 0;
    z-index: 999999999999;
    background: #FAFAFA;
    border-top: 1px solid #E6E6E6;
    .li{
      width: 25%;
      height: 100%;
      padding: .1rem 0;
      .link{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        
        .icons0{
          display: block;
          width: .42rem;
          height: .34rem;
        }
        .icons1{
          display: block;
          width: .39rem;
          height: .38rem;
        }
        .icons2{
          display: block;
          width: .39rem;
          height: .38rem;
        }
        .icons3{
          display: block;
          width: .32rem;
          height: .39rem;
        }
        p{
          width: 100%;
          display: block;
          color: #737478;
          font-size: .22rem;
          text-align: center;
          margin-top: .04rem;
        }
      }
    }
    .li:nth-child(n+2){
      border-left: 1px solid #E6E6E6;
    }
  }
</style>
