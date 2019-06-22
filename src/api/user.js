import request from '@/utils/request'

export function getInfoApi (token) {
  return request({
    url: '/user/info',
    method: 'post',
    params: { token }
  })
}
