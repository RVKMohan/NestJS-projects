import React from 'react'
import {Space, Typography } from 'antd';

const {Text} = Typography

const Home = () => {
  return (
    <div>
      <Space direction="vertical">
      <Text>Implemented crud operations (create, read, update, delete) </Text>
      <Text>FrontEnd: React JS with including Ant-Design components</Text>
      <Text>BackEnd: Nest js</Text>
      <Text>DataBase: MySql </Text>
      </Space>
    </div>
  )
}

export default Home