import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: 'https://www.easy-mock.com/mock/5d088f627a2d233514f3eaad/wx',
  timeout: 5000
})

/**
 * 请求拦截
 */
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 设置 token
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log('location: 请求拦截')
    console.log(error)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截
 *
 * 状态码：
 *  50008：非法的 token
 *  50012：其他客户端登录
 *  50014：token 过期
 */
service.interceptors.response.use(

  response => {
    const res = response.data

    // 如果请求不成功，则返回的 code 不等于 20000
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('您已经登出,您可以取消以停留在此页面,或再次登录,确认登出？', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 重置 token
          // 并且刷新当前页面
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      // 返回一个 Promise 对象
      return Promise.reject(new Error(res.message || 'Error'))
    } else { // 成功获取到数据
      return res
    }
  },
  error => {
    console.log('location: 响应拦截')
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    // 返回一个 Promise 对象
    return Promise.reject(error)
  }
)

export default service
