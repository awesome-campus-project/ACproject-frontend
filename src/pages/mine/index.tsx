import React from 'react'
import { useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Text, OpenData } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import { RootState, UserInfo } from '@types'
import './index.scss'

const Home: React.FC<any> = () => {
  const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)

  const handleLogout = () => {
    Taro.clearStorage()
    Taro.reLaunch({ url: '/pages/home/index' })
  }

  return (
    <View className='mine'>
      <View className='mine-header'>
        <View className='mine-header-left'>
          <OpenData type='userAvatarUrl'></OpenData>
        </View>
        <View className='mine-header-right'>
          <View className='mine-header-info'>
            <Text>{userInfo.campus_name}</Text>
          </View>
          <View className='mine-header-info'>
            <Text>{userInfo.depart}</Text>
          </View>
        </View>
      </View>
      <AtButton
        type='primary'
        onClick={handleLogout}
      >退出登录</AtButton>
    </View>
  )
}

export default Home
