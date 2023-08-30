import { View } from 'react-native'
import { ItemList } from '../shared'
import { ABOUT_GROUP } from '../../constants/items'

const About = ({ navigation }) => {
  return (
    <ItemList  data={ABOUT_GROUP} navigation={navigation}/>

  )
}

export default About