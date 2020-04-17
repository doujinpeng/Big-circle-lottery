export default{
    login (state) {
        if (JSON.parse(window.localStorage.getItem('token'))) {
        state.isLogin = true
        } else {
        state.isLogin = false
        }
    },
    logout (state) {
        state.isLogin = false
        window.localStorage.removeItem('token')
    },
    hasLogin (state, res) {
        state.username = res.data.data.nickname
        state.avatar = res.data.data.avatar
    }
}