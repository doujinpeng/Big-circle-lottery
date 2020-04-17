<template>
 <div class="content">
    <!-- tab -->
    <div class="tab">
      <div :class="'left'+ (checkLeftMode ? ' active':'')" @click="checkLeftSuccess">
        <span>{{checkLeft}}</span>
      </div>
      <div :class="'left'+ (checkRightMode ? ' active':'')" @click="checkRightSuccess">
        <span>{{checkRight}}</span>
      </div>
    </div>

    <!-- 支行选择 -->
    <div class="mode" v-show="checkLeftType" @click="checkLeftSuccess"></div>
    <ul class="chantList" v-show="checkLeftType">
      <li v-for="(item ,index) in list2" :key="index" @click="chantLeftClick(item,index)">
        <span :class="(index2 === index ? 'active':'')">{{item.title}}</span>
      </li>
    </ul>

    <!-- 分类选择 -->
    <div class="mode" v-show="checkRightType" @click="checkRightSuccess"></div>
    <ul class="chantList" v-show="checkRightType">
      <li v-for="(item ,index) in list3" :key="index" @click="chantRightClick(item,index)">
        <span :class="(index3 === index ? 'active':'')">{{item.title}}</span>
      </li>
    </ul>

    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
      <ul class="scroll-ul">
        <!-- 循环key报错 接后端替换id 报错取消 -->
        <li v-for="(item,index) in listdata" :key="index">
          <div class="li-l">
            <img :src="item.url" alt="xxx">
          </div>
          <div class="li-r">
            <div class="title">{{item.title}}</div>
            <div class="cen">{{item.cen}}</div>
            <div class="name">{{item.name}}</div>
            <div class="adr">地址：{{item.address}}</div>
          </div>
        </li>
        <li v-for="(item,index) in downdata" :key="index">
          <div class="li-l">
            <img :src="item.url" alt="xxx">
          </div>
          <div class="li-r">
            <div class="title">{{item.title}}</div>
            <div class="cen">{{item.cen}}</div>
            <div class="name">{{item.name}}</div>
            <div class="adr">地址：{{item.address}}</div>
          </div>
        </li>
      </ul>
    </v-scroll>

    <tabbar></tabbar>
 </div>
</template>
<script>
import Scroll from '../components/scroll';
import axios from 'axios'
import tabbar from '../components/tabbar'

export default{
  data () {
    return {
      checkLeft: '选择支行',
      checkRight: '分类',
      checkLeftType: false,
      checkRightType: false,
      checkLeftMode: false,
      checkRightMode: false,
      
      
      list: [],
      list2: [],
      list3: [
        
      ],
      index2: '',
      index3: '',

      counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
      num : 10, // 一次显示多少条
      pageSize : '', // 总页码
      listdata: [], // 下拉更新数据存放数组
      downdata: [], // 上拉更多的数据存放数组
    }
  },
  mounted(){
    this.getList();
  },
  methods:{
    getList(){
      var _self = this;
      axios.get('./static/json/merchantList.json').then(res => {
        console.log(res)
        _self.listdata = res.data.list;
      }).catch(error => {
        this.$dialog.alert({
            // title:'标题呀',
            message: '获取资源列表异常'
        }).then(()=>{
          console.log('点击了确认')
        })
      }).finally(() => {
        
      })
    },
    onRefresh(done) {
        this.getList();
        done() 
    },
    onInfinite(done) {
      var _self = this;
      axios.get('./static/json/merchantList.json').then(res => {
        // console.log(res)
        _self.counter++;
        // console.log(_self.counter)
        const rows = res.data.list
        const pages = res.data.pages
        if (_self.counter === 1) {
          _self.downdata = rows
        } else {
          // console.log(rows)
          // 循环报错原因是:key 
          // 可以用ID循环
          // 转后端不会出现报错
          for(var i =0;i<rows.length;i++){
            _self.downdata.push(rows[i])
          }
        }
        if(_self.counter == pages){
          // this.$el.querySelector('.load-more').style.display = 'none';
          this.$el.querySelector('.load-more').innerHTML = '<span>没有更多了</span>';
          return;
        }
        done()
      }).catch(error => {
        this.$dialog.alert({
            // title:'标题呀',
            message: '获取资源列表异常'
        }).then(()=>{
          console.log('点击了确认')
        })
      }).finally(() => {
        
      })
    },

    // 点击选取支行
    checkLeftSuccess(){
      if(this.checkLeftType){
        this.checkLeftType = false
      }else{
        this.checkLeftType = true
        this.checkRightType = false

      }
    },
    chantLeftClick(e,index){
      // console.log(e.id)
      if(e.id == 0){
        this.checkLeft = "选择支行"
        this.index2 = ''
        this.checkLeftMode = false
      }else{
        this.checkLeft=e.title
        this.index2 = index
        this.checkLeftMode = true
      }
      this.checkLeftType = false
      this.pageClick()
    },
    // 点击选取分类
    checkRightSuccess(){
      if(this.checkRightType){
        this.checkRightType = false
      }else{
        this.checkRightType = true
        this.checkLeftType = false
      }
    },
    chantRightClick(e,index){
      // console.log(e)
      if(e.id == 0){
        this.checkRight = "分类"
        this.index3 = ''
        this.checkRightMode = false
      }else{
        this.checkRight=e.title
        this.index3 = index
        this.checkRightMode = true
      }
      this.checkRightType = false
      this.pageClick()
    },

    // 选择类别取消类别回到第一页
    pageClick(){
      this.pageIndex = 1
      this.upFinished = false
      this.getroadList()
    }
  },
  components: {
    tabbar,
    'v-scroll': Scroll
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.content{
  background: #fff;
}
.tab{
    width: 100%;
    height: .8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E4E1E1;
    .left{
      border-right: 1px solid #E4E1E1;
    }
    div{
      width: 50%;
      height: 100%;
      text-align: center;
      line-height: .8rem;
      font-size: .3rem;
      color: #737478;
      display: flex;
      align-items: center;
      justify-content: center;

      img{
        width: .34rem;
        height: .34rem;
        margin-left: .14rem;
      }
    }
    .active{
      color: #f14449;
    }
  }
  .mode{
    position: fixed;
    z-index: 999999999999999;
    top: .8rem;
    left: 0;
    width: 100%;
    height: calc(100% - 1.78rem); //必须有高度
    background: rgba($color: #000, $alpha: .5);
  }
  
  .chantList{
    width: 100%;
    height: 5rem;
    background: #fff;
    position: fixed;
    z-index: 9999999999999999;
    top: .8rem;
    left: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    li{
      width: 100%;
      padding: 0 .24rem;
      color: #737478;
      font-size: .24rem;
      line-height: .7rem;
      border-bottom: 1px solid #f2f2f2;
      .active{
        color: #f14449;
      }
    }
  }
  .scroll-ul{
    padding: .1rem .23rem 0 .25rem;
    // height: 100%;
    // height:calc(100vh - 1.78rem); //必须有高度
    li{
      width: 100%;
      height: 2.6rem;
      //  @include flexbox();
      //  @include justify-content(space-between);
      border-bottom: 1px solid #E4E1E1;
      padding: .2rem 0;
      display: flex;
      justify-content: space-between;
      .li-l{
        width: 2.18rem;
        height: 2.18rem;
        overflow: hidden;
        border: 1px solid #E4E1E1;
        img{
          display: block;
          width: 100%;
        }
      }
      .li-r{
        width: 4.5rem;
        .title{
          font-size: .28rem;
          color: #333;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .cen{
          color: #737478;
          font-size: .2rem;
          height: .88rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          line-height: .26rem;
          padding-top: .1rem;
        }
        .name{
          color: #737478;
          font-size: .24rem;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          line-height: .26rem;
          padding-top: .3rem;

        }
        .adr{
          color: #737478;
          font-size: .22rem;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          line-height: .26rem;
          padding-top: .06rem;

        }
      }
    }
  }
  
</style>