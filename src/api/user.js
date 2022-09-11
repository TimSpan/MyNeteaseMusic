import request from './base'
//手机登录
export function getPhoneLogin(phone,password) {
  return request({
    method: 'GET',
    url: `/login/cellphone?phone=${phone}&captcha=${password}`,
  })
}

//获取验证码
export function getCode(code){
  return request({
    method:"GET",
    url:`/captcha/sent?phone=${code}`
  })
}

//获取用户详情
export function getLoginUser(data){
  return request({
    method:"GET",
    url:`/user/detail?uid=${data}`
  })
}
