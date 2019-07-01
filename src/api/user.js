import request from '@/utils/request'

export function getInfoApi(token) {
  return request({
    url: '/user/info',
    method: 'post',
    data: { token }
  })
}

export function loginApi(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function logoutApi() {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}

export function updateApi(token, data) {
  return request({
    url: '/user/update',
    method: 'post',
    data: {
      ...data,
      token
    }
  })
}

