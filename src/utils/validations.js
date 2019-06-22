
/**
 * 检查是否外部链接
 * @param {string} path
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
