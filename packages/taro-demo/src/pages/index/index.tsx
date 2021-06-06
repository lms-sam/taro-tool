/*
 * @Author: sam.li
 * @Date: 2021-06-06 10:58:42
 * @LastEditors: sam.li
 * @LastEditTime: 2021-06-06 12:02:55
 */
import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.styl'
import http from '../../common/http'

type PageStateProps = {
  counterStore: {
    counter: number,
    increment: Function,
    decrement: Function,
    incrementAsync: Function
  }
}

interface Index {
  props: PageStateProps;
}

@inject('counterStore')
@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () {
    http.get('/sugrec', {
      prod: 'pc_his',
      from: 'pc_web',
      json: 1,
      sid: '34004_33607_26350',
      req: 2,
      bs: encodeURIComponent('No commits in this repository. Please commit something before using version.'),
      csor: 0
    }, {
      extends: {
        isUpload: true
      }
    })
    http.post('/sugrec', {
      prod: 'pc_his',
      from: 'pc_web',
      json: 1,
      sid: '34004_33607_26350',
      req: 2,
      bs: encodeURIComponent('No commits in this repository. Please commit something before using version.'),
      csor: 0
    })
  }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }

  render () {
    const { counterStore: { counter } } = this.props
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
      </View>
    )
  }
}

export default Index  as ComponentType
