import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'

import { Order } from '@types'
import { GET } from '@utils/request'

export const useOrders = (
  offset = 0,
  limit = 10,
) => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    Taro.showLoading({
      title: '加载中',
    })
    GET('/orders', { offset, limit })
    .then(res => setOrders(res.data.rows))
    .catch(err => console.log(err))
    .finally(() => Taro.hideLoading())
  }, [offset, limit])

  return orders
}
