<template >
  <div class="roadWrapper">
    <div class="road">
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          finished-text="我是有底线的"
          @load="onLoadList">
          <div v-if="dtWinNumberInfos.length > 0" class="allcontent">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in dtWinNumberInfos"
                :key="index"
                :hide-timestamp="true"
                color="#0bbd87">
                <div class="timeWrapper" @click="handleRoadDetail(activity)">
                  <div class="title">{{activity.title}}</div>
                  <div class="date">
                    <img :src="activity.url" alt="xxx">
                    <!-- <img src="../assets/images/banner_3.png" alt="xxx"> -->
                    <div class="adr">{{activity.address}}</div>
                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <tabbar></tabbar>
  </div>
</template>
<script>
import axios from 'axios'
import tabbar from '../components/tabbar'
import { List } from 'vant'
 
export default {
  components: { 
    tabbar,
    "el-timeline": List,
    "el-timeline-item": List
  },
  data() {
    return {
      nullTip: '空空如也~',
      pageSize: 10, // 每页条数
      pageIndex: 1, // 页码
      dtWinNumberInfos: [], // 请求数据
      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
    }
  },
  created() {
    document.title = '实时路况'
    this.getroadList()
  },
  methods: {
    // 获取资源表单列表
    getroadList(){
      const _self = this
      axios.get('./static/json/list.json').then(res => {
        // console.log(res.data);
        // this.list = res.data.list
        const rows = res.data.list
        const pages = res.data.pages
        if (rows == null || rows.length === 0) {
          // 加载结束
          _self.upFinished = true
          return
        }
        if (_self.pageIndex >= pages) {
          // 最后一页不足10条的情况
          _self.upFinished = true
        }
        // 处理数据
        if (_self.pageIndex === 1) {
          _self.dtWinNumberInfos = rows
        } else {
          _self.dtWinNumberInfos = _self.dtWinNumberInfos.concat(rows)
        }
      }).catch(error => {
        this.$dialog.alert({
           // title:'标题呀',
           message: '获取资源列表异常{' + error + '}'
        }).then(()=>{
          console.log('点击了确认')
        })
        
      }).finally(() => {
        _self.isDownLoading = false
        _self.isUpLoading = false
      })
    },
    onDownRefresh() {
      this.pageIndex = 1
      this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.getroadList() // 加载数据
    },
    // 上拉加载请求方法
    onLoadList() {
      this.pageIndex++
      this.getroadList()
    },
    // 跳转详情页
    handleRoadDetail(activity) {
      this.$router.push({
        path: 'dateil',
        query: {
          id: activity && activity.id
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.roadWrapper {
  background: #fff;
  .road {
    padding: .1rem .23rem 0 .25rem;
    // height: 100%;
    height:calc(100vh - .98rem); //必须有高度
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .allcontent {
      padding: 15px 10px;
      border: 1px solid #fff;
      border-radius: 8px;
      .roadContent {
        padding-top: 10px;
        padding-bottom: 25px;
        padding-left: 15px;
        padding-right: 15px;
        display: flex;
        justify-content: space-between;
        .dataText {
          color: #fff;
          font-size: 14px;
        }
      }
      .timeWrapper {
        width: 100%;
        height: 4.4rem;
        border-bottom: 1px solid #F2F2F2;
        .title{
          font-size: .26rem;
          color: #737478;
          width: 100%;
          height: .7rem;
          line-height: .6rem;
          padding-top: .1rem;
        }
        .date{
          width: 100%;
          height: 3.3rem;
          overflow: hidden;
          position: relative;
          img{
            display: block;
            width: 100%;
          }
          .adr{
            color: #fff;
            font-size: .22rem;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 2;
            height: .65rem;
            padding: .1rem .2rem 0;
            line-height: .5rem;
            width: 100%;
            background-image: linear-gradient(rgba(0,0,0,.0), rgba(0,0,0,.8));
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>