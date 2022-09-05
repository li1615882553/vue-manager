import request from "../config/request";

export function ywxtMenus() {
    return request({
      url: `app/ywxtMenus`,
      method: 'get'
    })
  }