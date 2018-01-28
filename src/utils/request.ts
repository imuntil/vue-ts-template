import fetch, { IOptions } from './fetch'

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

export interface IRes {
  data?: any,
  err?: any
}
/**
 * 处理数据，全局异常捕获
 * @param url string
 * @param options IOptions
 */
export async function request (url: string, options?: IOptions) {
  const { data, err }: IRes = await fetch(`${prefix}${url}`, options)
  const res: { data: any, err: any, fail: any } = { data, err, fail: undefined }
  if (err) {
    // x
  } else if (+data.code !== 200) {
    res.fail = data
    res.data = undefined
  }
  return res
}

/* 获取openID */
export async function fetchOpenID () {
  const { data, err }: IRes = await fetch('http://api.jtuntech.com/event/2017/Q4/porsche/wx/output.php', {
    method: 'GET',
    credentials: 'include'
  })
  if (err) {
    console.log(err)
    return
  }
  if (+data.status === 1 && data.msg.UserOpenId) {
    return data.msg.UserOpenId
  } else {
    window.location.href = `http://api.jtuntech.com/event/2017/Q4/porsche/wx/login.php?url=${location.href}`
  }
}
