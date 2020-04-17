import ajax from '@/util/ajax' //引入axios的封装方法
import api from '@/config/config'
// import api from '@/config/index.js'

export const getLogin = (params, success, error) => {
    return ajax.fetchPostJson(api.api_url + '/wechat/login', params).then(res => {
        success(res)
    }).catch(error)
}


// 用户信息
export const userUpdate = (params, success, error) => {
    // console.log(params, 'params')
    return ajax.fetchPostJson(api.api_url + '/user/update', params).then(res => {
        success(res)
    }).catch(error)
}





