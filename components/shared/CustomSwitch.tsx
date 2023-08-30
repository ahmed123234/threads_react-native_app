import React from 'react'
import { View, Text, Switch } from 'react-native'

const CustomSwitch = ({value, setValue, title }) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20}}>
    <Text style={{color: '#fff'}}>{title}</Text>
    <Switch trackColor={{ false: '#444', true: "#ccc"}} value={value} onChange={() => setValue(prev => !prev)}/>
  </View>
  )
}

export default CustomSwitch