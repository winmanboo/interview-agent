import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

// 创建 axios 实例
const request = axios.create({
  baseURL: 'http://127.0.0.1:5001/v1',
  timeout: 10000,
})

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      if (status !== 200) {
        // 显示错误消息
        toast.error(data.message || '请求失败')
      }
    } else {
      toast.error('网络错误，请稍后重试')
    }
    return Promise.reject(error)
  }
)

export default request 