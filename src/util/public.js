
// 函数防抖
export function debounce (callback) {
    if(window.timer) {
      clearTimeout(window.timer)
    }
    window.timer = setTimeout(() => {
      callback()
    },500)
  }