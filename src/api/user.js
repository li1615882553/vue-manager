import request from "@/config/request";
import cookieAuthInfo from "@/util/cook";

export function login({ username, password }) {
  return request({
    url: `user/login`,
    method: 'post',
    data: {
      username
    }
  })
}

//因为mock无法获取header, 所以需要将token通过参数传输
export function logout() {
  return request({
    url: `user/logout/${cookieAuthInfo.token}`,
    method: 'get',
  })
}

export function getUserInfo(token) {
  return request({
    url: `user/getUserInfo/${token}`,
    method: 'get'
  })
}