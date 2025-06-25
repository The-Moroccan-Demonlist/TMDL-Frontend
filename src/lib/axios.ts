import axios, { AxiosError, AxiosRequestConfig } from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

let isRefreshing = false
let failedQueue: (() => void)[] = []

function processQueue() {
  failedQueue.forEach(cb => cb())
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (!isRefreshing) {
        isRefreshing = true
        try {
          await axios.get(process.env.NEXT_PUBLIC_API_URL + "/oauth/refresh-token", { withCredentials: true })
          isRefreshing = false
          processQueue()
        } catch (refreshError) {
          isRefreshing = false
          return Promise.reject(refreshError)
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push(() => {
          api(originalRequest).then(resolve).catch(reject)
        })
      })
    }

    return Promise.reject(error)
  }
)

export default api