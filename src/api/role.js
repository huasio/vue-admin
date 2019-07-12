import request from '@/utils/request'

export function getRolesApi() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function getRoutesApi() {
  return request({
    url: '/routes',
    method: 'get',
  })
}

export function addRoleApi(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

export function updateRoleApi(id, data) {
  return request({
    url: `/roles/${id}`,
    method: 'put',
    data
  })
}

export function deleteRoleApi(id) {
  return request({
    url: `/roles/${id}`,
    method: 'delete'
  })
}


