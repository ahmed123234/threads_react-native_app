import { useUser } from "@clerk/clerk-react";
import { Text, View } from "react-native";


const Profile = () => {
    const { user, isLoaded, isSignedIn } = useUser();
  
    if (!isLoaded && !isSignedIn) return null;
  
    const { username, fullName } = user;
  
    return (
      <View >
        {/* <Text style={{ color: '#fff' }}>Welcome {fullName}</Text> */}
      </View>
    )
  }
export default Profile