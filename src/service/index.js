import Vue from 'vue'
import axios from 'axios'
import api from './api.js'
import router from '@/router'

// const appId = 10001029;

// const BASE_URL = window.location.origin
const BASE_URL = process.env.NODE_ENV === 'development'
  ? `${window.location.origin}/proxyApi`
    // ? 'http://devcloud.vpclub.cn'
    : window.location.origin;

console.log(BASE_URL)

// axios.defaults.baseURL = BASE_URL;
axios.defaults.headers['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
    //显示loading
    // Vue.$vux.loading.show('loading')
    return config
}, error => {
    return Promise.reject(error)
})


axios.interceptors.response.use(response => {
  //隐藏loading
  // Vue.$vux.loading.hide()

  if (!response || response.status !== 200) console.log('网络错误');
  // if (!response || response.status !== 200) return Vue.$vux.alert.show('网络错误');
  let returnCode = response.data.ResultCode ? response.data.ResultCode * 1 : response.data.returnCode * 1;
  let message = response.data.Message ? response.data.Message : response.data.message;

  // code统一处理
  switch (returnCode) {
    case 1000:
    case 2018:
    case 1002:
      return response.data;
      break;
    case 1003:
      console.log('数据错误')
      // Vue.$vux.alert.show('数据错误')
      break;
    case 1004:
      console.log('服务器繁忙，请喝杯茶休息一会儿')
      // Vue.$vux.alert.show('服务器繁忙，请喝杯茶休息一会儿')
      break;
    case 1006:
      console.log('参数不全')
      // Vue.$vux.alert.show('参数不全')
      break;
    case 1007:
      console.log('请求超时')
      // Vue.$vux.alert.show('请求超时')
      break;
    case 1009:
      console.log('登陆状态已失效')
      // Vue.$vux.toast.show({ text: '登陆状态已失效', type: 'text', width: '10em' })
      router.push('/Login')
      break;
    default :
      // console.log(message)
      // Vue.$vux.alert.show(message)
  }
  
  return response.data;
}, error => {
  // Vue.$vux.loading.hide()
  let err = JSON.parse(JSON.stringify(error));
  // console.log(err)

  if(err.response.status == 401){
    // console.log(router)
    // Vue.$vux.toast.show({ text: '登陆状态已失效', type: 'text', width: '10em' })
    router.push('/Login')
    return
  }
  if(err.code){
    // Vue.$vux.alert.show(err.code)
  }else{
    // Vue.$vux.alert.show(err.response.statusText || err.message)
  }
  return Promise.reject(error)
})

const httpServer = (url, method, data, baseURL) => {
  let apiUrl
  if(url.split('/').length == 3){//为了解决该接口动态变化的问题
    let [key1, key2, key3] = url.split('/');
    apiUrl = api[key1][key2] + key3;
  }else if(url.split('/').length == 5){//为了解决该接口动态变化的问题
    let [key1, key2, key3, key4, key5] = url.split('/');
    apiUrl = api[key1][key2] + key3 + '/' + key4 + '/' + key5;
  }else{
    let [key1, key2] = url.split('/');
    apiUrl = api[key1][key2];
  }
  if(!apiUrl){
    console.log('api列表未发现此接口，请检查！')
    // return Vue.$vux.toast.show('api列表未发现此接口，请检查！')
  }
  
    let myData = {
        // appId: appId, // 公共参数
        ...data
    }

  let options = { //http默认配置
    // baseURL: baseURL ? baseURL : BASE_URL,
    baseURL: BASE_URL,
    method: method,
    headers: {
      'Authorization': 'Bearer ' +  (sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '')
    },
        url: apiUrl,
        timeout: 10000,
        params: myData,
        data: myData
    }

    if (method == 'get') {
        delete options.data
    } else {
        delete options.params
    }
// console.log(options)
    return axios(options)
}



export default httpServer
