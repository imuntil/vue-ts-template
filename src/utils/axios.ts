import axios from 'axios'

export interface IOptions {
  method?: string
  data?: { [prop: string]: any }
  withCredentials?: boolean,
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
      const { code, result } = data.data
      if (+code !== 200) {
        return { fail: data }
      }
      return { data }
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

/* 获取openid */
export const wxPrefix = 'http://api.jtuntech.com/weixin/'

export async function fetchOpenID(mid: string) {
  const { data } = await request(`${wxPrefix}showOpenidUsr.action?mid=${mid}&id=2`)
  if (data) {
    return data
  }
  location.href = `${wxPrefix}showWeixinTokenUsr.action?id=2&mid=${mid}&hurl=${
    encodeURI(location.href)
  }`
}

export async function fetchWXInfo(mid: string): Promise<any> {
  const { data } = await request(`${wxPrefix}showUserInfoUsr.action?id=2&mid=${mid}`)
  if (data) {
    return data
  }
  location.href = `${wxPrefix}wxLoginUsr.action?id=2&mid=${mid}&hurl=${
    encodeURI(location.href)
  }`
}
