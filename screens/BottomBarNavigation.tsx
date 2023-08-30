import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Activity, CreateThread, Home, Search, Profile } from '../components/pages';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { Pressable, Touchable, TouchableOpacity, View } from 'react-native';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useEffect } from 'react';
import { useGlobalContext } from '../hooks/hook';
import { UserProps } from '../lib/types';

const Tab = createBottomTabNavigator();

const options = ({ name, navigation }: {name: string, navigation?: any}) => ({
  tabBarIcon:({ focused, color } : {focused: boolean, color: string }) => {

    if(navigation) return (
      <Pressable onPress={() => navigation.navigate('NewThread')}>
        <FontAwesome name={name} focused color={color} size={25} />
      </Pressable>
    )

      return <FontAwesome name={name} focused color={color} size={25} />
    
  }
})

const BottomBarNavigation = ({ navigation }: { navigation: any }) => {
  const { user: { id }} = useUser();

  const { currentUser, setCurrentUser } = useGlobalContext();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await axios.get(`http://192.168.1.106:4000/user/${id}`);
      if (res.status === 200) {
        const userInfo = res.data.user;

        console.log("userInformation are", userInfo);

        const user: UserProps = {
          username: userInfo.username,
          objectId: userInfo._id,
          id: userInfo.id,
          name: userInfo.name,
          bio: userInfo.bio,
          image: userInfo.image

        } 

        setCurrentUser(user);
        // if(!userInfo?.onboarded) redirect('/onboarding');

      }

    }

    fetchUserInfo();
  }, [])
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabel: '',
      // header: () => null,
      tabBarShowLabel: false,
      tabBarActiveTintColor: "#fff",
      tabBarItemStyle: {
        backgroundColor: "#000",
      },
      headerStyle: {
        backgroundColor: "#222",
      },
      headerTitleStyle: {
        color: "#fff"
      }
      // headerShown: false,
    }}>
        <Tab.Screen  name='Home' component={Home} 
          options={options({name: 'home'})}
        />
        <Tab.Screen name='Search' component={Search} options={options({name: 'search'})}/>
        <Tab.Screen name='Create' component={CreateThread}  options={{...options({name: 'plus', navigation}), headerTitle: "", headerStyle: {backgroundColor: '#000'},  
        }}/> 
        <Tab.Screen name='Activity' component={Activity} options={options({name: 'heart'})}/>
        <Tab.Screen name='Profile' component={Profile} initialParams={{ id: id}} 
          options={{
            ...options({name: 'user'}), 
            // @ts-ignore
            headerRight: () => (
              <View style={{flexDirection: 'row', columnGap: 20, alignItems: 'center', marginRight: 30}}>  
                  <TouchableOpacity>
                    <FontAwesome name='instagram' color="#fff" size={25} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <FontAwesome name='setting' color="#fff" size={25} />
                  </TouchableOpacity>
                  
              </View>
            )
            
          }} 
          
        /> 

    </Tab.Navigator>
  )
}

export default BottomBarNavigation