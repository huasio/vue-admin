
/**
 * 监听是否大写
 * @param {按键} key
 * @return {bool}
 */
export function listenCapsLock(key) {
  if (key && key.length === 1) {
    if ((key >= "A" && key <= "Z") || key === 'CapsLock') {
      return true;
    } else {
      return false;
    }
  }
  return false;
}
