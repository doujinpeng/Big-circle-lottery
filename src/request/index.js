import axios from 'axios'

const $http = axios.create({
  baseURL: ''
})
//这里是配置请求头的部分
$http.interceptors.request.use(config => {
  var xtoken = JSON.parse(window.localStorage.getItem('token'))
  // console.log(xtoken)
  if (xtoken) {
    xtoken = 'Bearer' + xtoken
    // console.log(xtoken)
    config.headers['Authorization'] = xtoken
  }
  return config
})
$http.interceptors.response.use(res => {
  return res
})
export default $http
