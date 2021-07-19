import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

import { useOrders } from '@hooks'
import { updateUserInfo } from '@actions'
import { OrderCard } from '@components'
import './index.scss'

const tabList = [{ title: '所有订单' }, { title: '我的发布' }, { title: '我的接收' }]

const Home: React.FC<any> = () => {
  const dispatch = useDispatch()
  const orders = useOrders()
  const [tab, setTab] = useState(0)

  useEffect(() => {
    // 刚进入小程序，检测用户是否登录
    Taro.getStorage({ key: 'userInfo' })
      .then(res => {
        // 获取用户本地缓存，并更新store
        dispatch(updateUserInfo(res.data))
      })
      // 本地没有用户数据（未登录），跳转到登录页面
      .catch(() => Taro.navigateTo({ url: '/pages/login/index' }))
  }, [dispatch])

  return (
    <View className='home'>
      <View
        className='home-add'
        hoverClass='home-add_active'
        onClick={() => Taro.navigateTo({ url: '/pages/order-edit/index' })}
      >
        +
      </View>

      <AtTabs current={tab} tabList={tabList} onClick={e => setTab(e)}>
        <AtTabsPane current={tab} index={0} >
          <View className='home-content'>
            {
              orders.map(order => <OrderCard key={order.id} order={order} />)
            }
          </View>
        </AtTabsPane>

        <AtTabsPane current={tab} index={1}>
          <View className='home-content'>
            {
              orders.map(order => <OrderCard key={order.id} order={order} />)
            }
          </View>
        </AtTabsPane>

        <AtTabsPane current={tab} index={2}>
          <View className='home-content'>
            {
              orders.map(order => <OrderCard key={order.id} order={order} />)
            }
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}

export default Home
