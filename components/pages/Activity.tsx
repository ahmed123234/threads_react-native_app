import React, { useState } from 'react'
import { Button, FlatList, ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { ACCOUNT_GROUP, ACTIVITY_GROUP } from '../../constants/items'

const ActivityItem = ({ title, currentActive, setCurrentActive }: { title: string, currentActive: string , setCurrentActive: any }) => (
  <TouchableOpacity 
    style={{ 
      borderColor: 'gray',
      borderWidth: 1,
      backgroundColor: currentActive === title? '#fff': '#222', 
      borderRadius: 8, 
      width: 110, 
      padding: 8 
    }}
    onPress={() => setCurrentActive(title)}
  >
    <Text style={{color: currentActive === title? '#222': '#fff', textAlign: 'center' }}>{title}</Text>
  </TouchableOpacity>
)

const AllActivities = () => {
  const [ data, setData ] = useState([]);
  return (
    <View style={{justifyContent: 'center', flexDirection: 'row', alignContent: 'center', alignItems: 'center',}}>
      {data.length === 0 && (<Text style={{color: 'gray', marginTop: -100}}>Nothing to see here</Text>)}
    </View>
  )
}
const Activity = () => {
  const [currentActive, setCurrentActive] = useState<string>('All')
  return (
    <ScrollView style={{
      backgroundColor: '#000',
      height: '100%', 
      // flexDirection: 'column',
      // rowGap:
    }}>
      <FlatList 
        contentContainerStyle={{
          flexDirection: 'row',
          columnGap: 10, 
          paddingTop: 20,
          paddingHorizontal: 20
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={ACTIVITY_GROUP}
        renderItem={(({item, index}) => (
          <ActivityItem  title={item} setCurrentActive={setCurrentActive} currentActive={currentActive}/>
        ))}
        keyExtractor={(item, index) =>item + index }
      />

      {currentActive === 'All' && (<AllActivities />) }
    </ScrollView>
  )
}

export default Activity