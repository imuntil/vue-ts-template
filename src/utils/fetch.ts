import * as fetch from 'isomorphic-fetch'

export interface IOptions {
  method: string,
  body?: string | FormData,
  [propName: string]: any
}

interface IError extends Error {
  response: Response
}

class IError implements IError {
  constructor (msg: string) {
    super(msg)
  }
}

function parseJSON (res: Response) {
  return res.json()
}

function checkStatus (res: Response) {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  const error = new IError(res.statusText)
  error.response = res
  throw error
}

export default function resquest (url: string, options?: IOptions) {
  return fetch(url, {
    ...options
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }))
}
