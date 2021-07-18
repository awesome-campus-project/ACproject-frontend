import Taro from '@tarojs/taro'

export const config = {
  baseUrl: 'https://acp.cavano.vip/api/v1',
  // baseUrl: 'http://127.0.0.1:7001/api/v1',
}

const baseOptions = ({ url, data, method }) => Taro.request({
  url: config.baseUrl + url,
  data: data,
  method: method,
  header: {
    'content-type': 'application/json',
  },
})
  .then(res => {
    return res
  })
  .catch(err => {
    console.log(err)
    Taro.hideLoading()
    Taro.showToast({
      title: '网络连接出错！',
      icon: 'none',
      duration: 1000
    })
    return err
  })

export const GET = (url: string, data?: Object) => baseOptions({
  url,
  data,
  method: 'GET'
})

export const POST = (url: string, data?: Object) => baseOptions({
  url,
  data,
  method: 'POST'
})

export const PUT = (url: string, data?: Object) => baseOptions({
  url,
  data,
  method: 'PUT'
})

export const DELETE = (url: string, data?: Object) => baseOptions({
  url,
  data,
  method: 'DELETE'
})
