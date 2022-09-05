import request from "../config/request";

export function login(username) {
  return request({
    url: `login`,
    method: 'post',
    data: {
      username
    }
  })
}

export function logout() {
  return request({
    url: `logout`,
    method: 'get',
  })
}

export function getUserInfo(token) {
  return request({
    url: `user/getUserInfo`,
    method: 'post',
    data: {
      token
    }
  })
}