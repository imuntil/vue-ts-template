import axios from 'axios'

export interface IOptions {
  method?: string
  data?: { [prop: string]: any }
  withCredentials?: boolean,
  [s: string]: any
}

const request: (url: string, options?: IOptions) => Promise<any> = (
  url,
  options
) => {
  return axios({
    url,
    ...options
  })
    .then((data: any) => {
      const { code, result } = data.data
      if (+code !== 200) {
        return { fail: data }
      }
      return { data }
    })
    .catch((err: any) => ({ err }))
}

export default request
