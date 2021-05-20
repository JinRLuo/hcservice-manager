import axios from 'axios'
import qs from 'qs'
import Router from '../router'
import store from '../store'
// 根据环境不同引入不同api地址
// create an axios instance
const service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

//request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    console.log(res);
    if(res.status == 'fail' && res.data.errCode == 20003) {
      store.commit('CLEAR_ADMIN_INFO');
      Router.replace('/');
      return Promise.resolve(res);
    } else {
      return Promise.resolve(res);
    }

  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export function get(url, params) {
  return service.get(url, {
    params
  });
}

export function post(url, data) {
  return service.post(url, qs.stringify(data, { indices: false }), {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  });
}

export function postFile(url, fd) {
  return service.post(url, fd, {
    headers: {'Content-Type': 'multipart/form-data'}
  });
}

export default service
