import { View } from 'react-native'
import { CustomSwitch, ItemList } from '../shared';
import { useState } from 'react';
import { PRIVACY_GROUP } from '../../constants/items';

const Privacy = ({ navigation }) => {
  const [pausedNotification, setPausedNotification] = useState<boolean>(false);
  return (
    <View style={{ flex: 1, flexDirection: 'column', rowGap: 10,  }}>
      <CustomSwitch  title='Private profile' value={pausedNotification} setValue={setPausedNotification}/>
      <ItemList  data={PRIVACY_GROUP} navigation={navigation}/>
    </View>
  )
}

export default Privacy