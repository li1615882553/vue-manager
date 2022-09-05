import Mock from 'mockjs';
import "./menu"
//延时200-600毫秒请求到数据
Mock.setup({
  timeout: '200-600'
})
let userList = ['admin', 'viewer'];
let userInfo = {}. userToken = {}, userAuth = {
  'admin': ['admin','blog'],
  'viewer':['blog']
};

Mock.mock('app/ywxtMenus', {
  "mtime": "@datetime",//随机生成日期时间
  "score|1-800": 800,//随机生成1-800的数字
  "rank|1-100": 100,//随机生成1-100的数字
  "stars|1-5": 5,//随机生成1-5的数字
  "nickname": "@cname",//随机生成中文名字
});

Mock.mock('user/login', 'post', (data) => {
  if(userList.indexOf(data.username) === -1){
    return {
      status: 1,
      msg: "未找到当前用户信息"
    }
  }
  const token = Math.random().slice(2);
  userInfo[data.username] =token;
  userToken[token] = data.username;
  return {
    status: 0,
    username: data.username,
    token: userInfo[data.username]
  }
});

Mock.mock('user/getUserInfo', 'post', (data) => {
  if(userToken[data.token]){
    let username = userToken[data.token];
    return {
      username,
      "sysList": userAuth[username]
    }
  }
  
});