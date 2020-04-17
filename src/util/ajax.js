 
/* jshint esversion: 6 */
import axios from 'axios'
// import storage from 'good-storage'
import router from '@/router/index.js'
import { Message } from 'element-ui'
let qs = require('qs')
import {debounce} from './public'
const api = require('@/config/config.js')
axios.defaults.withCredentials = false  // 跨域
let config = {
  baseURL: '/', 
  timeout: 20000, // Timeout
  showLoading: true,
  withCredentials: false, // Check cross-site Access-Control
};
axios.create(config);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
// axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use( // 利用axios拦截器鉴权和写公共的错误分支
  function (config) {
    // config.headers['Authorization'] = getCookie('token');
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
)

function isError(response) {
  let err =  false;
  if(response.data.code && response.data.code != 0 && response.data.code != 1) {
    err = true
  }

  if(response.data.error_code && response.data.error_code != 0 && response.data.error_code != 1) {
   err = true;
  }

  if(response.data.err_code && response.data.err_code != 0 && response.data.err_code != 1) {
   err = true
  }

  if(response.data.success && response.data.success === false) {
    err = true
   }

}

// respone拦截器
axios.interceptors.response.use(
  response => {
    isError(response);
    return response;
  },
  error => {
    // 超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      Message.error('请求超时')
      return Promise.reject(error)
    }
    // 错误提示
    if (error && error.response) {
      switch (error.response.status) {
        // case 400:
        //   alert('请求错误')
        //   break
        // case 403:
        //   debounce(() => {Message.error('拒绝访问')})
        //   break
        // case 404:
        //   debounce(() => {Message.error(`请求地址出错: ${error.response.config.url}`)})
        //   break
        // case 405:
        //   debounce(() => {Message.error('方法不被允许')})
        //   break
        // case 408:
        //   debounce(() => {Message.error('请求超时')})
        //   break
        // case 415:
        //   debounce(() => {Message.error('415错误')})
        //   break
        // case 500:
        //   debounce(() => {Message.error('服务器内部错误')})
        //   break
        // case 501:
        //   debounce(() => {Message.error('服务未实现')})
        //   break
        // case 502:
        //   debounce(() => {Message.error('网关错误')})
        //   break
        // case 503:
        //   debounce(() => {Message.error('服务不可用')})
        //   break
        // case 504:
        //   debounce(() => {Message.error('网关超时')})
        //   break
        // case 505:
        //   debounce(() => {Message.error('HTTP版本不受支持')})
        //   break
        // default:
      }
      return Promise.reject(error)
    }
    if (error.response && error.response.status === 401) {
        Message.error('未知错误,请重新登录')
        // router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'indices' })
        }}).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPut (url, params = {}, type = '') {
    return new Promise((resolve, reject) => {
      axios.put(url, qs.stringify(params, type)).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}, type = '') {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(params, type)).then(res => {
        resolve(res.data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  fetchPostJson (url, params) {
    let headers = {headers: {'Content-Type': 'application/json'}}
    return new Promise((resolve, reject) => {
      axios.post(url, params, headers).then(res => {
        resolve(res.data)
      }).catch(error => {
        console.log(error, 'error')
        reject(error)
      })
    })
  },
  fetchPostForm (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(params, {arrayFormat: 'indices', allowDots: true})).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPostFile (url, formData) {
    let headers = {headers: {'Content-Type': 'multipart/form-data'}}
    return new Promise((resolve, reject) => {
      axios.post(url, formData, headers).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}