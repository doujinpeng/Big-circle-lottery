let api_url = ''

if (process.env.NODE_ENV === 'development') {
    // 测试地址
    // api_url = ''
    api_url = ''
} else {
    // 正式地址
    api_url = ''
}

module.exports = {
    api_url: api_url
}