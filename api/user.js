import fly from './http'

// app版本号
export function getVersionApi(params){
	return fly.get('/app.php?getVersion', params).then(res => res)
}
// https://mkmngsys.mitech-ndt.com/admin.php?m=app&c=Login&a=verify
export function getVerifyApi(params){
	return fly.get('/admin.php?m=app&c=Login&a=verify', params).then(res => res)
}
// 查询用户状态(是否有待审核)
export function indexStatusApi(params){
	return fly.post('/admin.php?m=app&c=index&a=status', params).then(res => res)
}

// 登录接口
export function getLoginApi(params){
	return fly.post('/admin.php?m=app&a=login&c=login', params).then(res => res)
}

// 添加公告
export function noticeAddApi(params){
	return fly.post('/admin.php?m=app&c=index&a=noticeAdd', params).then(res => res)
}

// 获取公告
export function noticeInfoApi(params){
	return fly.get('/admin.php?m=app&c=index&a=noticeInfo', params).then(res => res)
}

// 排行榜数据
export function LeaderboardDataApi(params){
	return fly.get('/admin.php?m=app&a=index&c=index', params).then(res => res)
}

// ====================================================================================================
// 资金管理列表
export function fundManagementApi(params){
	return fly.post('/admin.php?m=app&a=financeList&c=Finance', params).then(res => res)
}

// 资金申请
export function financeAddApi(params){
	return fly.post('/admin.php?m=app&c=Finance&a=financeAdd', params).then(res => res)
}

// 资金申请---批复
export function replySetApi(params){
	return fly.post('/admin.php?m=app&a=replySet&c=Finance', params).then(res => res)
}
// 资金申请---支付
export function financePayApi(params){
	return fly.post('/admin.php?m=app&c=Finance&a=financePay', params).then(res => res)
}
// 资金申请---详情
export function financeInfoApi(params){
	return fly.post('/admin.php?m=app&c=Finance&a=financeInfo', params).then(res => res)
}

// 资金申请---修改
export function financeEditApi(params){
	return fly.post('/admin.php?m=app&c=Finance&a=financeEdit', params).then(res => res)
}


// ====================================================================================================
// 客户列表
export function customerApi(params){
	return fly.post('/admin.php?m=app&a=cusList&c=Cus', params).then(res => res)
}

// 客户列表-可查看人员列表
export function userCustomerApi(params){
	return fly.post('/admin.php?m=app&a=userList&c=Cus', params).then(res => res)
}

// 客户分配人员列表
export function adminUserListApi(params){
	return fly.post('/admin.php?m=app&c=Cus&a=adminUserList', params).then(res => res)
}

// 区域列表
export function areaListApi(params){
	return fly.post('/admin.php?m=app&c=Cus&a=areaList', params).then(res => res)
}
// 设置提醒
export function cusSetRemindApi(params){
	return fly.post('/admin.php?m=app&c=Cus&a=cusSetRemind', params).then(res => res)
}

// 添加客户
export function userCustomerAddApi(params){
	return fly.post('/admin.php?m=app&a=cusAdd&c=Cus', params).then(res => res)
}

// 客户详情
export function CusDetailInfoApi(params){
	return fly.post('/admin.php?m=app&a=CusDetail&c=Cus', params).then(res => res)
}

// 客户修改
export function cusEditApi(params){
	return fly.post('/admin.php?m=app&a=cusEdit&c=Cus', params).then(res => res)
}

// 删除客户
export function CusDelApi(params){
	return fly.post('/admin.php?m=app&a=cusDel&c=Cus', params).then(res => res)
}

// 通用资料
export function fileListApi(params){
	return fly.post('/admin.php?m=app&c=Cus&a=getPublicFileList', params).then(res => res)
}

// 通用资料--根据id查找
export function gePublictFileByIdApi(params){
	return fly.post('/admin.php?m=app&a=gePublictFileById&c=Cus', params).then(res => res)
}

// 修改往来记录
export function upConApi(params){
	return fly.post('/admin.php?m=app&c=Cus&a=upCon', params).then(res => res)
}

// 删除往来记录
export function contentDelApi(params){
	return fly.post('/admin.php?m=app&a=contentDel&c=Cus', params).then(res => res)
}

// 客户名称-差重复
export function cusReptitionApi(params){
	return fly.post('/admin.php?m=app&c=Cus&a=reptition', params).then(res => res)
}

// 客户名称-差重复
export function wenshuListApi(params){
	return fly.post('/admin.php?m=app&c=order&a=wenshuList', params).then(res => res)
}

// 通用资料,专属资料,文书.审核
export function fileTrialApi(params){
	return fly.post('/admin.php?m=app&c=Cus&a=fileTrial', params).then(res => res)
}

// 客户名称-转渠道
export function cusToDitchApi(params){
	return fly.post('/admin.php?m=app&c=Cus&a=cusToDitch', params).then(res => res)
}

// ====================================================================================================
// 查看价格
export function priceListApi(params){
	return fly.post('/admin.php?m=app&c=Product&a=priceList', params).then(res => res)
}


// ====================================================================================================
// 渠道列表
export function ditchListApi(params){
	return fly.post('/admin.php?m=app&c=Ditch&a=ditchList', params).then(res => res)
}

// 添加渠道
export function ditchAddApi(params){
	return fly.post('/admin.php?m=app&c=Ditch&a=ditchAdd', params).then(res => res)
}

// 删除渠道
export function ditchDelApi(params){
	return fly.post('/admin.php?m=app&c=Ditch&a=ditchDel', params).then(res => res)
}

// 渠道详情
export function ditchInfoApi(params){
	return fly.post('/admin.php?m=app&c=Ditch&a=ditchInfo', params).then(res => res)
}

// 修改渠道
export function ditchEditApi(params){
	return fly.post('/admin.php?m=app&c=Ditch&a=ditchEdit', params).then(res => res)
}

// 渠道报备
export function setReportApi(params){
	return fly.post('/admin.php?m=app&c=Ditch&a=setReport', params).then(res => res)
}


// 渠道-业务记录内容修改
export function DitchContentEditApi(params){
	return fly.post('/admin.php?m=app&a=contentEdit&c=Ditch', params).then(res => res)
}

// 渠道-业务记录内容修改
export function DitchContentDelApi(params){
	return fly.post('/admin.php?m=app&a=contentDel&c=Ditch', params).then(res => res)
}

// 渠道客户转移到终端
export function moveToCusApi(params){
	return fly.post('/admin.php?m=app&c=Ditch&a=moveToCus', params).then(res => res)
}


// ====================================================================================================
// 出库单列表
export function orderListApi(params){
	return fly.post('/admin.php?m=app&c=Order&a=orderList', params).then(res => res)
}

// 出库单-快速填单列表
export function orderFastApi(params){
	return fly.post('/admin.php?m=app&c=Order&a=orderFast', params).then(res => res)
}

// 添加出库单
export function orderAddApi(params){
	return fly.post('/admin.php?m=app&c=Order&a=orderAdd', params).then(res => res)
}
// 修改出库单
export function orderEditApi(params){
	return fly.post('/admin.php?m=app&c=Order&a=orderEdit', params).then(res => res)
}

// 添加订单-获取产品名称,型号列表
export function ordergetLmApi(params){
	return fly.post('/admin.php?m=app&c=Order&a=getLm', params).then(res => res)
}

// 添加出库单- 根据型号获取市场价格
export function getPriceApi(params){
	return fly.post('/admin.php?m=app&c=Order&a=getPrice', params).then(res => res)
}

// 出库单详情
export function orderInfoApi(params){
	return fly.post('/admin.php?m=app&c=Order&a=orderInfo', params).then(res => res)
}


// 报价单列表
export function pdfListApi(params){
	return fly.post('/admin.php?m=app&c=Product&a=pdfList', params).then(res => res)
}

// 生成报价单
export function quotationCreateApi(params){
	return fly.post('/admin.php?m=app&a=quotationCreate&c=Product', params).then(res => res)
}

// 报价单详情
export function quotationInfoApi(params){
	return fly.post('/admin.php?m=app&a=quotationInfo&c=Product', params).then(res => res)
}

// 根据商品型号查询商品详情
export function getGoodsByModelApi(params){
	return fly.post('/admin.php?m=app&c=product&a=getGoodsByModel', params).then(res => res)
}
// 根据商品名称查询商品详情
export function getGoodsByNameApi(params){
	return fly.post('/admin.php?m=app&c=Product&a=getGoodsByName', params).then(res => res)
}

// 审核PDF文件, 报价单, 销售合同等
export function pdfCheckApi(params){
	return fly.post('/admin.php?m=app&c=product&a=pdfCheck', params).then(res => res)
}

// 客户专属资料列表
export function businessPrivateApi(params){
	return fly.post('/admin.php?m=app&c=Cus&a=businessPrivate', params).then(res => res)
}

// 删除客户专属、通用、文书资料
export function cusdataFileDelApi(params){
	return fly.post('/admin.php?m=app&c=Cus&a=cusdataFileDel', params).then(res => res)
}


// 应聘者列表
export function ApplicantListApi(params){
	return fly.post('/admin.php?m=app&c=Ads&a=ApplicantList', params).then(res => res)
}
// 应聘者详情
export function ApplicantInfoApi(params){
	return fly.post('/admin.php?m=app&c=Ads&a=ApplicantInfo', params).then(res => res)
}

// 应聘者添加
export function ApplicantAddApi(params){
	return fly.post('/admin.php?m=app&c=Ads&a=ApplicantAdd', params).then(res => res)
}

// 应聘者修改
export function ApplicantEditApi(params){
	return fly.post('/admin.php?m=app&c=Ads&a=ApplicantEdit', params).then(res => res)
}