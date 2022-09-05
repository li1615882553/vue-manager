import axios from 'axios'
import router from '@/router'

const CancelToken = axios.CancelToken;
let source = CancelToken.source();
let pendingRequest = [];
const HTTP_CONST = {
  OK: 400,
  ERROR: 500,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
}

/**
 * 拦截器设置
 */
const REQUEST_INTERCEPTORS_HANDLER = config => {
  config.cancelToken = source.token;
  addRequestMark(config) && source.cancel();
  source = CancelToken.source();
  return config;
}

const RESPONSE_ERROR_INTERCEPTORS = error => {
  if (axios.isCancel(error)) {
    error.selfCancel = true;
    return Promise.reject(error);
  }
  removeRequestMark(error.config, "response");

  const statusCode = error.response && error.response.status
  if (statusCode === HTTP_CONST.UNAUTHORIZED) {
    pendingRequest.forEach(item => {
      item.source.cancel();
    })
    this.pendingRequest.splice(0, this.pendingRequest.length());
    reLogin();
  }
  return Promise.reject(error);
}

/**
 * axios配置
 */
const instance = axios.create({
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT || 1000 * 60,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json' 
  }
})
// 默认请求为切换路由时 自动取消
instance.defaults.routeChangeCancel = true;
// 添加请求拦截器
instance.interceptors.request.use(
  REQUEST_INTERCEPTORS_HANDLER,
  error => {
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    removeRequestMark(response.config);
    return response.data;
  },
  RESPONSE_ERROR_INTERCEPTORS
)


/**
 * request唯一标识:   url + method + params data
 */
function getRequestMark(config, reqOrResp = 'request') {
  return config.url +
    config.method +
    (JSON.stringify(config.params) || '') +
    (reqOrResp === 'response' && config.data ? config.data : JSON.stringify(config.data) || '');
}
/**
 * 向 pendingRequest 中添加请求
 * @returns true:重复请求  false: 非重复请求
 */
function addRequestMark(config) {
  const url = getRequestMark(config);
  if (pendingRequest.findIndex(item => item.url === url) === -1) {
    pendingRequest.push({ url, source, routeChangeCancel: config.routeChangeCancel });
    return false;
  }
  return true;
}

/**
 * 从 pendingRequest 中移除已经完成的请求
 */
function removeRequestMark(config, reqOrResp = 'requset') {
  const url = getRequestMark(config, reqOrResp);
  const index = pendingRequest.findIndex(item => item.url === url);
  if (index !== -1) {
    pendingRequest.splice(index, 1);
  }
}

/**
 * 后端返回401信息,强制重新登录
 */
function reLogin() {
  router.push('/login')
}

export default instance;