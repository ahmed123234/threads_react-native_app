import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { Text, View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const Replies = () => (
    <View style={{backgroundColor: 'red'}}>
        <Text style={{color: "#fff"}}> No Replies yet</Text>
    </View>
)

const Threads = () => (
    <View >
        <Text style={{color: "#fff"}}> No Threads yet</Text>
    </View>
)
const TopBarNav = () => {
  return (
    <View>
        <Text style={{color: '#fff'}}>slkjsdk</Text>
        <Tab.Navigator initialRouteName='Threads' >
        <Tab.Screen name='Threads' component={Threads} />
        <Tab.Screen name='Replies' component={Replies} />
        </Tab.Navigator>
    </View>
  )
}

export default TopBarNav