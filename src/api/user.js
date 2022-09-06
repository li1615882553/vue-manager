import request from "../config/request";

export function login({ username, password }) {
  return request({
    url: `user/login`,
    method: 'post',
    data: {
      username
    }
  })
}

export function logout() {
  return request({
    url: `user/logout`,
    method: 'get',
  })
}

export function getUserInfo(token) {
  return request({
    url: `user/getUserInfo/${token}`,
    method: 'get'
  })
}