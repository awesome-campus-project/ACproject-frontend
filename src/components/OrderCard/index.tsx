import React, { memo } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { Order } from '@types'

import './index.scss'

interface EpisodeCardProps {
  order: Order,
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  order,
}) => {

  return (
    <View
      key={order.id}
      className='order-card'
      hoverClass='order-card_active'
      onClick={() => Taro.navigateTo({ url: '/pages/order/index' })}
    >
      <View className='order-card-left'>
        <Text className='order-card-left-price'>{order.price}</Text>
      </View>
      <View className='order-card-right'>
        <View className='order-card-station'>
          <Text className='order-card-station-text'>西门菜鸟驿站</Text>
        </View>
        <View className='order-card-addr'>
          <Text className='order-card-addr-text'>{order.addr_id === 1 ? '1号南楼611' : '1号北楼114'}</Text>
        </View>
      </View>
    </View>
  )
}

export default memo(EpisodeCard)