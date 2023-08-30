import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from 'axios'
import AccountProfile from "../components/forms/AccountProfile";
import { UserProps } from "../lib/types";
import { ScrollView, Text, View } from "react-native";
// import { AccountProfile } from "@/components/forms"
// import { getUser } from '@/lib/actions/user.actions';

type User = {
  username: string | null,
  name: string | null,
  bio: string | null,
  avatarUrl?: string | null;
}

const Onboarding = () => {

  const { user } = useUser();
  const [userInfo, setUserInfo] = useState<UserProps>();

  if(!user) return null;
  
type User = {
    _id: string,
    bio: string,
    username: string,
    image: string,
    name: string
}

// get the user from the database
//  useEffect( () => {
//     const fetchUserData = async () => {
//       const res = await axios.get(`http://192.168.1.106:4000/user?username=${user.username}`);
//       const { user: userInfo} = res.data;
      
//       const userData: UserProps =  {
//         id: user?.id,
//         objectId: userInfo?._id,
//         username: user?.username || userInfo?.username ,
//         name: userInfo?.name || user?.firstName + ' ' + user?.lastName || '',
//         bio:  userInfo?.bio || "" ,
//         image: userInfo?.image || user?.imageUrl
//       } 
//       setUserInfo(userData);
//       console.log("user Info", userInfo);
      
//     }

//     fetchUserData();

//  }, [])

  return (
    <ScrollView 
      contentContainerStyle={{
        marginHorizontal: 'auto',
        flexDirection: "column",
        justifyContent: "flex-start",
        // alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 20
      }}
    >
        {/* <Text style={{color: '#fff'}}>Onboarding</Text>
    <Text style={{
      fontStyle: 'normal',
      marginTop: 3,
      fontWeight: "400",
      color: "#fff"
    }}>
        Complete your profile now to use Threads
    </Text>

    <View style={{marginTop: 3, backgroundColor: "#222", padding: 10}}>
        {/* use the redefined functionlity given by clerk */}

        {/* <AccountProfile user={userInfo} btnTitle='Continue'/> */}
    {/* </View> */} 
    </ScrollView>
  )
}


export default Onboarding