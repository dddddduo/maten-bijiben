let baseurl = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    baseurl = 'http://meitai.com/'
}else{
    // 生产环境
    baseurl = 'https://mitechsys.mitech-ndt.com/'
}

export default baseurl