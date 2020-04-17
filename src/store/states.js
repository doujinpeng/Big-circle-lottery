export default {
  isLogin: JSON.parse(window.localStorage.getItem('token')) ? 1 : 0,
  username: '',
  avatar: ''
}