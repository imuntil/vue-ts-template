export const delay: (ms: number) => Promise<{}> = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export type Func = (s: any) => any
export const debounce = (action: Func, delay: number) => {
  let timer: number
  return (...rest: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      action.apply(null, rest)
    }, delay)
  }
}

export const throttle = (action: Func, delay: number) => {
  let statTime = 0
  return (...rest: any[]) => {
    const currTime = +new Date()
    if (currTime - statTime > delay) {
      action.apply(null, rest)
      statTime = currTime
    }
  }
}

/* 打乱数组d */
export const shuffle: (array: any[]) => any[] = arr => {
  return arr.sort(v => Math.random() - 0.5)
}

/* 随机字符串 */
export const asciiStr =
  '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_'
export const random: (length?: number) => string = (length = 12) => {
  return shuffle(asciiStr.split(''))
    .slice(0, length)
    .join('')
}

/* 千分符 */
export const thousandth = (str: string | number) => {
  const reg = /\d(?=(?:\d{3})+(?:\.\d+|$))/g
  return (+str).toFixed(2).replace(reg, (...rest) => rest[0] + ',')
}

/* 货币格式化 */
export const currency = (str: string | number, $currency = '￥') =>
  `${$currency}${thousandth(str)}`

/* 滚动到 */
export const scrollTo = (el: HTMLElement, to = 0, duration = 500) => {
  let st = el.scrollTop
  const delta = (st - to) / (duration / 25)
  function ani() {
    if (st > to && el) {
      st -= delta
      el.scrollTop = st >= 0 ? st : 0
      requestAnimationFrame(ani)
    }
  }
  requestAnimationFrame(ani)
}

/* 常用正则 */
export const regs: { [k: string]: { str?: string; reg?: RegExp } } = {
  phone: { str: '^(1[3|4|5|7|8])[0-9]{9}$', reg: /^(1[3|4|5|7|8])[0-9]{9}$/ },
  password: { str: '^[A-z0-9_]{6,20}$', reg: /^[A-z0-9_]{6,20}$/ },
  code: { str: '^[0-9]{6}$', reg: /^[\d]{6}$/ },
  objectId: { reg: /^[0-9a-fA-F]{24}$/ }
}

/* 格式为FormData */
export const toFormData = (form: object) => {
  const formData = new FormData()
  if (Object.prototype.toString.call(form) !== '[object Object]') {
    return formData
  }
  for (const key in form) {
    if (form.hasOwnProperty(key) && form[key] !== undefined) {
      formData.append(key, form[key])
    }
  }
  return formData
}

/* 将search字符串转换为对象 */
export const formatSearch = (search: string) => {
  let q = search || window.location.search
  q = decodeURIComponent(q.substring(1) || '') || ''
  const obj = {}
  q.split('&').forEach(v => {
    const [key, value] = v.split('=')
    obj[decodeURIComponent(key)] = decodeURIComponent(value)
  })
  return obj
}

/* 判断对象是否为空 */
export const isEmptyObj = (obj: object) => {
  if (typeof obj !== 'object') {
    return false
  }
  return !Object.keys(obj).length
}

// /* 混入 */
// export const mixin = (...mixins: any[]) => {
//   return (target) => {
//     Object.assign(target.prototype, ...mixins)
//   }
// }