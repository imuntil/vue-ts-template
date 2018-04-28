import axios from 'axios'

export interface IOptions {
  method?: string
  data?: { [prop: string]: any }
  withCredentials?: boolean
  [s: string]: any
}

export const request: (url: string, options?: IOptions) => Promise<any> = (
  url,
  options
) => {
  return axios({
    url,
    ...options
  })
    .then((data: any) => {
      const { resultcode: code, result } = data.data
      if (+code !== 200) {
        return { fail: { code, result } }
      }
      return { data: { code, result } }
    })
    .catch((err: any) => ({ err }))
}

export const prefix: string = 'http://xx'

/**
 * 格式化数据
 * @param payload
 */
export function formatData(payload: { [prop: string]: any }): FormData {
  const formData = new FormData()
  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      formData.append(key, payload[key])
    }
  }
  return formData
}
