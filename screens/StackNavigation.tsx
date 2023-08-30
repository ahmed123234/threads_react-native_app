import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginRegister } from "../components/shared";
import BottomBarNavigation from "./BottomBarNavigation";
import { About, Account, CreateThread, Follows, Help, Language, Notifications, Privacy, Profile, Settings, YourLikes } from "../components/pages";
import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { useGlobalContext } from "../hooks/hook";
// import Onboarding from "./Onboarding";

const Stack = createNativeStackNavigator();
const App = () => {
  
};


// const UserSettings = () => {
  
//   return (
  
//   );
// }

const StackNavigation = () => {
  // const { navigate, } = useNavigation()

  const { modalVisible, setModalVisible } = useGlobalContext();
  return (
    <Stack.Navigator initialRouteName="Register"
      screenOptions={{
        navigationBarHidden: true,
        headerShown: true,
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTitleStyle: {
          color: '#fff'
        },
        headerTintColor: '#fff',
        statusBarColor: "#000",
        statusBarStyle: 'dark',
        contentStyle: {
          backgroundColor: '#000'
        },
        animationTypeForReplace: 'pop',
        animation: 'slide_from_right',
        animationDuration: 30
      }}
    >
      <Stack.Screen name='Register' component={LoginRegister}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name='HomeScreen' component={BottomBarNavigation} />
      <Stack.Screen name='NewThread' component={CreateThread}  options={{ headerTitle: "New thread", animation: 'slide_from_bottom', 
        // headerLeft: ({ canGoBack }) => <Pressable ><FontAwesome name='close' size={25} color='#fff' /></Pressable>
    }}/> 
      <Stack.Screen name="UserProfile" component={Profile} initialParams={{
        setModalVisible: setModalVisible,
        modalVisible: modalVisible
      }} options={{
        headerTitle: 'Profile',
        
        // @ts-ignore
        headerRight: () => (
          <View style={{flexDirection: 'row', columnGap: 20, alignItems: 'center', marginRight: 30}}>  
              <TouchableOpacity>
                <FontAwesome name='instagram' color="#fff" size={25} />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <FontAwesome name='setting' color="#fff" size={25} />
              </TouchableOpacity>
              
          </View>
        )
      }} />
      <Stack.Screen name="Settings" component={Settings} options={{

      }} />
      <Stack.Screen name="Follows" component={Follows} options={{
        headerTitle: 'Follow and invite Friends'
      }} />
      <Stack.Screen name="Notifications" component={Notifications} options={{

      }} />
      <Stack.Screen name="Likes" component={YourLikes} options={{
        headerTitle: 'Your likes'
      }} />
      <Stack.Screen name="Privacy" component={Privacy} options={{

      }} />
      <Stack.Screen name="Account" component={Account} options={{

      }} />

      <Stack.Screen name="Language" component={Language} options={{
        headerTitle: 'App language'
      }} />

      <Stack.Screen name="Help" component={Help} options={{
      }} />

      <Stack.Screen name="About" component={About} options={{
      }} />

      {/* <Stack.Screen name="UserSettings" component={UserSettings} /> */}


    </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});