import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'

import { POST } from '@utils/request'
import { Order, RootState, UserInfo } from '@types'
import './index.scss'

const Home: React.FC<any> = () => {
  const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
  const [order, setOrder] = useState({
    campus_id: 1,
    addr_id: 1,
    owner_id: userInfo.id as number,
    status: 1,
    delivery_code: [],
    delivery_type: '1',
    price: '5',
    owner_remark: '',
  })

  const handleSubmit = () => {
    POST('/orders', {
      ...order,
      delivery_type: parseInt(order.delivery_type),
      price: parseInt(order.price),
    })
    .then(res => {
      if (res.statusCode === 201) {
        Taro.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(() => {
          Taro.navigateBack()
        }, 1000);
      } else {
        Taro.showToast({
          title: '发布失败',
          icon: 'none',
          duration: 1500
        })
      }
    })
  }

  return (
    <View className='order-edit'>
      <AtInput
        name='1'
        title='取件信息'
        type='text'
        placeholder='请输入取件信息'
        value={String(order.delivery_code)}
        // onChange={e => setOrder({ ...order, delivery_code: e as string })}
        onChange={() => {}}
      />
      <AtInput
        name='2'
        title='送达地址'
        type='text'
        placeholder='请输入教务送达地址'
        value='1号南楼611'
        // onChange={e => setOrder({ ...order, addr_id: parseInt(e) })}
        onChange={() => {}}
      />
      <AtInput
        name='3'
        title='快递规格'
        type='text'
        placeholder='请输入教务快递规格'
        value={String(order.delivery_type)}
        onChange={e => setOrder({ ...order, delivery_type: e as string })}
      />
      <AtInput
        name='4'
        title='悬赏价格'
        type='text'
        placeholder='请输入教务悬赏价格'
        value={String(order.price)}
        onChange={e => setOrder({ ...order, price: e as string })}
      />
      <AtInput
        name='5'
        title='订单备注'
        type='text'
        placeholder='可选'
        value={order.owner_remark}
        onChange={e => setOrder({ ...order, owner_remark: e as string })}
      />
      <AtButton
        type='primary'
        className='login-step-btn'
        onClick={handleSubmit}
      >发布</AtButton>
    </View>
  )
}

export default Home
