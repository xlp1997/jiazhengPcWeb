import axios from 'axios'
// qs 是对 post 请求 data 进行处理，不然后台接收不了数据
// 因为axios post请求默认Content-type是 application/json
import qs from 'qs'
axios.defaults.timeout = 5000 // 5s没响应则认为该请求失败
axios.defaults.baseURL = 'http://192.168.3.56:8080'
axios.defaults.withCredentials = true	// 跨域时如果要带上cookie话则需要设置withCrendentials

// http request 拦截器 所有请求发出前都需要执行以下代码
axios.interceptors.request.use(
  request => {
    request.data = qs.stringify(request.data) //这里就用qs对data就行处理
    request.headers = {
      'Content-Type': 'application/x-www-form-urlencoded' //设置header覆盖content-type
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 *  封装get方法 跟 post 方法
 *  @param url
 *  @param params
 *  @returns {Promise}
 */
 
// 这种写法是导出后可以通过在main.js中使用Vue.use(http) 挂载到vue实例上
export default {
  install: (Vue) => {
    Vue.prototype.$get = (url, params = {}) => {
      return new Promise((resolve, reject) => {
        axios.get(url, {params})
          .then(response => resolve(response.data))
          .catch(error => reject(error))
      })
    }
    Vue.prototype.$post = (url, params = {}) => {
      return new Promise((resolve, reject) => {
        axios.post(url, params)
          .then(response => resolve(response.data))
          .catch(error => reject(error))
      })
    }
  }
}
 