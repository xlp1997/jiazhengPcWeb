// const baseUrl = 'http://192.168.3.56:8080';//本地测试
const baseUrl = 'http://www.jiazheng52.com';//本地测试

// www.jiazheng52.com
const config = {
    serviceInfo: baseUrl + '/jz-pc-web/serviceInfoController/findInfo.do',//服务岗位接口
    sysDictOrder: baseUrl + '/jz-pc-web/sysDictController/findOrderInfo.do',//订单数字字典接口
    sysDictPersonal: baseUrl + '/jz-pc-web/sysDictController/findPersonalInfo.do',//阿姨数字字典接口
    orderList: baseUrl + '/jz-pc-web/orderController/findAllInfo.do',//订单列表接口
    auntList: baseUrl + '/jz-pc-web/personalUserController/findAllInfo.do',//阿姨列表接口
    newsList: baseUrl + '/jz-pc-web/webInformationInfoController/findAllInfo.do',//咨询列表接口

    
}
//需要让外部拿到
export default config;