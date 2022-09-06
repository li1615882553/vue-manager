import request from "../config/request";

export function ywxtMenus() {
  return request({
    url: `app/ywxts`,
    method: 'get'
  })
}

export function getMenus(code){
  return request({
    url: `app/menu/${code}`,
    method: 'get'
  })
}