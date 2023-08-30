import { View } from 'react-native'
import { ItemList } from '../shared'
import { HELP_GROUP } from '../../constants/items'

const Help = ({ navigation }) => {
  return (
    <ItemList  data={HELP_GROUP} navigation={navigation}/>
  )
}

export default Help