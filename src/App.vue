<template>
  <div id="app">
    <!-- <div class="fixedDiv"></div> -->
    <router-view/>
  </div>
</template>

<script>
import {getLogin} from "@/api/index.js"
export default {
  name: 'App',
  data () {
    return {
      code: ''
    }
  },
  mounted() {
    if(!window.localStorage.getItem('userId')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
      // this.getCode()
      
    } else {
      this.getCode()
      console.log(window.localStorage.getItem('userId'))
        // 别的业务逻辑
    }
  },
  methods: {
    getCode () { // 非静默授权，第一次有弹框
      this.code = ''
      var local = window.location.href // 获取页面url
      // var local = 'https://hui.zxdata.net/' // 获取页面url
      // console.log(local)
      // return;
      var appid = 'wx561c89760cf2ac27' 
      this.code = this.getUrlCode().code // 截取code
      if (this.code == null || this.code === '') { // 如果没有code，则去请求
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      } else {
        // 你自己的业务逻辑
        var then = this;
        console.log(this.code)
        let params = {
          code: this.code
        }
        getLogin(params, res => {
          console.log(res)
          if(res.success){
            // var userId = res.data.userId
            // window.localStorage.setItem('userId',userId)
            // console.log(res)
          }
        }, error => {
        
        })
      }
    },
    getUrlCode() { // 截取url中的code方法
      var url = location.search
      this.winUrl = url
      var theRequest = new Object()
      if (url.indexOf("?") != -1) {
        var str = url.substr(1)
        var strs = str.split("&")
        for(var i = 0; i < strs.length; i ++) {
          theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
        }
      }
      return theRequest
    }
  },
  created() {
    // console.log(2222)
  },
}
</script>

<style>
#app {
  /* background: #D7E3D4; */
}
html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,
em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,
caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,
ruby,section,summary,time,mark,audio,video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  outline: none;
  font-weight: normal;
  box-sizing: border-box;
}
body {
  font-family:"Microsoft Yahei", "微软雅黑", "Hiragino Sans GB", "冬青黑体", "Arial", "Helvetica", "SimHei", "黑体", "STXihei", "华文细黑", sans-serif;
  margin: 0 auto;
  color: #4c4c4c;
  background: #F7F7F7;
  -ms-text-size-adjust: 100%; 
  -webkit-text-size-adjust: 100%; /*修正手持设备字体变化*/
  -webkit-font-smoothing: antialiased;
  width: 100%;
  height: 100%;
}

ol,
ul,li{
  list-style: none;
}
strong {
  font-weight: normal;
}

input {
  outline: none;
  vertical-align:middle;
}

input[type="text"],
input[type="button"],
input[type="submit"],
input[type="reset"] {
  -webkit-appearance: none;
  font-family:inherit;
  /*font-size:100%;*/
  outline:none;
}

textarea {
  -webkit-appearance: none;
  border-radius: 0;
  resize: none;
}

img{border:0px;vertical-align:middle;-ms-interpolation-mode:bicubic;} 
.list_pic img{width: 100%; border:0px;vertical-align:middle;-ms-interpolation-mode:bicubic;} 

::-moz-selection {
  background: #F7F7F7;
  color: #fff;
  text-shadow: none;
}

::selection {
  background: #F7F7F7;
  color: #fff;
  text-shadow: none;
}

a {
  text-decoration: none;
  /* blr: expression(this.onFocus=this.blur());
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s; */
  transition: 0.3s;
}

a:link,
a:visited {
  text-decoration: none;
}

a:active,
a:hover {
  text-decoration: none;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  line-height: 0px;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1;
}
.fl{float:left;}
.fr{float:right;}

/*滚动条样式*/
i{font-style: normal;}
::-webkit-scrollbar-track-piece {
  width: 0px;
  background-color: #f0f0f0;
}

::-webkit-scrollbar {
  width: 0px;
  background-color: #103c7c;
}

::-webkit-scrollbar-thumb {
  width: 0px;
  background-color: #333;
}

::-webkit-scrollbar-thumb:hover {
  width: 0px;
  background-color: #103c7c;
}

.fixedDiv{
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100vh;
  background: #FFEDED;
  border:.18rem solid rgba(214,124,146,1);
}
</style>
