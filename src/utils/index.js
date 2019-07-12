
/**
 * 深度 copy 元素
 */
export function cloneDeep(source) {
  if (!source && typeof source !== 'object') {
    return new Error("error arguments", 'cloneDeep')
  }

  const targetObj = source.constructor === Array ? [] : {}

  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object') {
      targetObj[key] = cloneDeep(source[key])
    } else {
      targetObj[key] = source[key]
    }
  })
  return targetObj

}
