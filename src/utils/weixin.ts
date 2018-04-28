import wx from 'weixin-js-sdk'
import { request } from './axios'
import { delay, random } from './cts'

export interface IRes {
  data?: any
  err?: any
}

const ready: () => Promise<any> = async () => {
  const { data, err }: IRes = await request(
    'http://api.jtuntech.com/event/2015/roewe/jssdk.php?act=config'
  )
  if (err) {
    return Promise.reject(err)
  }
  wx.config({
    debug: false,
    appId: data.AppId,
    timestamp: data.Stamp,
    nonceStr: data.NonceStr,
    signature: data.Signature,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage'
      // 'onMenuShareQQ',
      // 'onMenuShareWeibo',
      // 'onMenuShareQZone',
      // 'startRecord',
      // 'stopRecord',
      // 'onVoiceRecordEnd',
      // 'playVoice',
      // 'pauseVoice',
      // 'stopVoice',
      // 'onVoicePlayEnd',
      // 'downloadVoice',
      // 'chooseImage',
      // 'previewImage',
      // 'uploadImage',
      // 'downloadImage',
      // 'translateVoice',
      // 'getLocation',
      // 'hideOptionMenu',
      // 'showOptionMenu',
      // 'openLocation'
      // 'hideMenuItems',
      // 'showMenuItems',
      // 'hideAllNonBaseMenuItem',
      // 'showAllNonBaseMenuItem',
      // 'closeWindow',
      // 'scanQRCode',
      // 'chooseWXPay'
      // 'openProductSpecificView',
      // 'addCard',
      // 'chooseCard'
    ]
  })

  // wx.ready((e: any) => Promise.resolve(e))
  // wx.error((e: any) => Promise.reject(e))
  return new Promise((resolve, reject) => {
    wx.ready((e: any) => {
      console.log('wx ready')
      resolve(e)
    })
    wx.error((e: any) => {
      console.log('wx error')
      reject(e)
    })
  })
}
// setTimeout(ready, 2000)

export interface IContent {
  title?: string
  desc?: string
  link?: string
  imgUrl?: string
  [prop: string]: string | undefined
}
export interface ILocation {
  latitude: number
  longitude: number
  name?: string
  address?: string
  scale?: number
  infoUrl?: string
  [k: string]: string | number | undefined
}
export default class Wx {
  public static content: IContent
  /**
   * 分享到朋友圈
   */
  public static shareTimeLine: (
    customContent?: IContent
  ) => Promise<any> = cc => {
    return new Promise((resolve, reject) => {
      const ct = { ...Wx.content, ...cc }
      wx.onMenuShareTimeline({
        success: resolve,
        cancel: reject,
        ...ct
      })
    })
  }
  /**
   * 分享给好友
   */
  public static shareAppMessage: (
    customContent?: IContent
  ) => Promise<any> = cc => {
    return new Promise((resolve, reject) => {
      const ct = { ...Wx.content, ...cc }
      wx.onMenuShareAppMessage({
        type: 'link',
        dataUrl: '',
        success: resolve,
        cancel: reject,
        ...ct
      })
    })
  }
  /**
   * 微信支付(公众号支付)
   */
  public static chooseWXPay: () => Promise<any> = () => {
    return new Promise((resolve, reject) => {
      wx.chooseWXPay({
        // x
        success: resolve
      })
    })
  }
  /**
   * 设置默认分享
   */
  public static defaultShare: (content: IContent) => any = content => {
    Wx.content = { ...Wx.content, ...content }
    Wx.shareAppMessage()
    Wx.shareTimeLine()
  }
  /* 使用微信内置地图查看位置 */
  public static openLocation: (location: ILocation) => void = location => {
    wx.openLocation({ scale: 15, ...location })
  }
  /* wx ready */
  public static wxReady: (content?: IContent) => void = c => {
    ready()
      .then(() => {
        console.log('WxReady')
        // Wx.defaultShare(c)
      })
      .catch(e => {
        console.log(e)
      })
  }
}

/* 获取openID */
const getMid: () => string = () => {
  const key = 'uityaitemaidorukii-v1.00'
  const local = window.localStorage.getItem(key)
  if (local) {
    return local
  }
  const mid = random(8)
  window.localStorage.setItem(key, mid)
  return mid
}
export const wxPrefix = 'http://api.jtuntech.com/weixin/'
export async function fetchOpenID() {
  const mid = getMid()
  const { data = {} } = await request(
    `${wxPrefix}showOpenidUsr.action?id=2&mid=${mid}`
  )
  // return data
  await delay(15000)
  const { code, result } = data
  if (+code !== 200 || !result) {
    window.location.href = `${wxPrefix}showWeixinTokenUsr.action?id=2&mid=${mid}&hurl=${
      location.href
    }`
  } else {
    return result
  }
}
export async function fetchWXInfo() {
  const mid = getMid()
  alert(mid)
  const { data } = await request(
    `${wxPrefix}showUserInfoUsr.action?id=2&mid=${mid}`
  )
  if (!data) {
    return
  }
  const { code, result } = data
  if (+code !== 200 || !result) {
    location.href = `${wxPrefix}wxLoginUsr.action?id=2&hurl=${
      location.href
    }&mid=${mid}`
  } else {
    return result
  }
}
