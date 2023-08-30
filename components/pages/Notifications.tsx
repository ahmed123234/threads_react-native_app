import { Text, View } from 'react-native'
import { CustomSwitch, ItemList } from '../shared'
import { notificationsGroup } from '../../constants/items'
import { useState } from 'react'

const Notifications = ({ navigation }) => {
  const [pausedNotification, setPausedNotification] = useState<boolean>(false);
  return (
    <View style={{ flex: 1, flexDirection: 'column', rowGap: 10,  }}>
      <CustomSwitch  title='Pause ALL' value={pausedNotification} setValue={setPausedNotification}/>
      <ItemList  data={notificationsGroup} navigation={navigation}/>
    </View>
  )
}

export default Notifications