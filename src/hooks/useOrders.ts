import { useEffect, useState } from 'react'

import { Order } from '@types'
import { GET } from '@utils/request'

export const useOrders = (
  offset = 0,
  limit = 10,
) => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    GET('/orders', { offset, limit })
    .then(res => setOrders(res.data.rows))
    .catch(err => console.log(err))
  }, [offset, limit])

  return orders
}
