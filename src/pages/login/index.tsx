import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Picker, Image } from '@tarojs/components'
import { AtSteps, AtInput, AtButton, AtMessage } from 'taro-ui'

import { POST, GET } from '@utils/request'
import { waitingImg } from '@assets/image'
import './index.scss'

const Home: React.FC<any> = () => {
  const [step, setStep] = useState<{
    index: number,
    items: { title: string, status?: "error" | "success" }[]
  }>({
    index: 0,
    items: [
      { title: '绑定学校' },
      { title: '确认信息' },
      { title: '开始探索' }
    ]
  })
  const [campus, setCampus] = useState<{
    selected: number,
    list: { name: string, id: number }[]
  }>({
    selected: 0,
    list: [{ name: '正在获取学校列表...', id: 0 }],
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userInfo, setUserInfo] = useState<any>({})
  const [register, setRegister] = useState(false)

  // 获取campus列表的effect
  useEffect(() => {
    GET('/campuses')
      .then(res => {
        setCampus({
          selected: 0,
          list: res.data.rows.reverse(),
        })
      })
  }, [])

  // 点击登录后验证教务逻辑
  const handleLogin = async () => {
    if (!username || !password) {
      Taro.atMessage({
        message: '请填写表单～',
        type: 'warning',
      })
      return
    }
    Taro.showLoading({
      title: '登录中',
      mask: true,
    })
    const res = await Taro.request({
      method: 'GET',
      url: 'https://schedule.cavano.vip/login',
      data: {
        username,
        password,
      },
    })
    Taro.hideLoading()
    if (!res.data.success) {
      Taro.atMessage({
        message: res.data.msg || '未知错误',
        type: 'error',
      })
      return
    }
    Taro.atMessage({
      message: '登录成功',
      type: 'success',
    })
    setUserInfo(res.data.selfinfo)
    setStep({
      index: 1,
      items: [
        { title: '绑定学校', status: 'success' },
        { title: '确认信息' },
        { title: '开始探索' }
      ]
    })
  }

  // 确认个人信息，进行注册
  const handleConfirm = () => {
    if (!userInfo.user_name) {
      Taro.atMessage({
        message: '请先登录教务～',
        type: 'warning',
      })
      return
    }
    Taro.showLoading({
      title: '加载中',
      mask: true,
    })
    POST('/users', {
      name: userInfo.user_name,
      user_code: username,
      level: parseInt(userInfo.adminclass_name.split('-')[0].slice(-2)),
      clazz: userInfo.adminclass_name,
      major: userInfo.major_name,
      depart: userInfo.depart_name,
      campus_name: '合肥工业大学屯溪路校区',
    })
    .then(res => {
      Taro.hideLoading()
      if (res.statusCode === 201) {
        setRegister(true)
        setStep({
          index: 2,
          items: [
            { title: '绑定学校', status: 'success' },
            { title: '确认信息', status: 'success' },
            { title: '开始探索' }
          ]
        })
      } else {
        Taro.atMessage({
          message: '验证失败，请重试～',
          type: 'error',
        })
      }
    })
  }

  const handleCampusChange = e => {
    setCampus({
      selected: e.detail.value,
      list: campus.list,
    })
  }

  let Content
  if (step.index === 0) {
    Content = (
      <View className='login-step'>
        <View className='login-step-title'>
          <Text className='login-step-title-text'>登录教务系统</Text>
        </View>
        <View className='login-step-content'>
          <Picker
            mode='selector'
            value={campus.selected}
            range={campus.list}
            onChange={handleCampusChange}
            rangeKey='name'
          >
            <View className='login-step-content-input-mask'></View>
            <AtInput
              name=''
              title='学校'
              type='text'
              value={campus.list[campus.selected].name}
              onChange={() => { }}
            />
          </Picker>
          <AtInput
            name='username'
            title='学号'
            type='number'
            placeholder='请输入学号'
            value={username}
            onChange={e => setUsername(e as string)}
          />
          <AtInput
            name='password'
            title='密码'
            type='password'
            placeholder='请输入密码'
            value={password}
            onChange={e => setPassword(e as string)}
          />
        </View>
        <AtButton
          type='primary'
          className='login-step-btn'
          onClick={handleLogin}
        >登录</AtButton>
      </View>
    )
  } else if (step.index === 1) {
    Content = (
      <View className='login-step'>
        <View className='login-step-title'>
          <Text className='login-step-title-text'>确认个人信息</Text>
        </View>
        <View className='login-step-content'>
          <AtInput
            name=''
            title='学校'
            type='text'
            value={campus.list[campus.selected].name}
            onChange={() => { }}
            editable={false}
          />
          <AtInput
            name=''
            title='姓名'
            type='text'
            value={userInfo.user_name}
            onChange={() => { }}
            editable={false}
          />
          <AtInput
            name=''
            title='学号'
            type='text'
            value={username}
            onChange={() => { }}
            editable={false}
          />
          <AtInput
            name=''
            title='学院'
            type='text'
            value={userInfo.depart_name}
            onChange={() => { }}
            editable={false}
          />
          <AtInput
            name=''
            title='专业'
            type='text'
            value={userInfo.major_name}
            onChange={() => { }}
            editable={false}
          />
        </View>
        <AtButton
          type='primary'
          className='login-step-btn'
          onClick={handleConfirm}
        >
          验证
        </AtButton>
      </View>
    )
  } else {
    Content = (
      <View className='login-step'>
        <View className='login-step-waiting'>
          <Image
            src={waitingImg}
            mode='aspectFill'
          />
        </View>
        <View className='login-step-enter-remark'>
          <Text  className='login-step-enter-remark-text'>{register ? '即将进入...' : '请先完成注册'}</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='login'>

      <View className='login-content'>
        {Content}
      </View>

      <View className='login-footer'>
        <AtSteps
          items={step.items}
          current={step.index}
          onChange={e => setStep({
            index: e,
            items: step.items,
          })}
        />
      </View>

      <AtMessage />

    </View>
  )
}

export default Home
