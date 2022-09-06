import axios from '@/config/request.js'

function categroyList() {
  return axios.request({
    url: '/blog/categories/list',
    method: 'get'
  })
}

export default {
  categroyList
}
