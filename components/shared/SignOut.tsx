import { useAuth } from "@clerk/clerk-react";
import { Button } from "react-native";

const SignOut = () => {
    const { isLoaded, signOut } = useAuth();
  
    if (!isLoaded) return null;
  
    return (
  
      <Button
        color='gray'
        title='sign out'
        onPress={() => signOut()}
      />
    )
}

export default SignOut;