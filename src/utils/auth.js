import { get, set, remove } from './cookie'

const TokenKey = 'Admin-Token'

export function getToken () {
  return get(TokenKey)
}

export function setToken (token) {
  return set(TokenKey, token)
}

export function removeToken () {
  return remove(TokenKey)
}
