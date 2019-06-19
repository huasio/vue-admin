import Cookies from 'js-cookie'

export function get (key) {
  return Cookies.get(key)
}

export function set (key, value) {
  return Cookies.set(key, value)
}

export function remove (key) {
  return Cookies.remove(key)
}
