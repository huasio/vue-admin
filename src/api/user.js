import request from '@/utils/request'

export function getInfoApi(token) {
  return request({
    url: '/user/info',
    method: 'post',
    params: { token }
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}

