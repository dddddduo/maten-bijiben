let baseurl = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    baseurl = 'http://mkmngsys.mitech-ndt.com/'
}else{
    // 生产环境
    baseurl = 'https://mkmngsys.mitech-ndt.com/'
}

export default baseurl