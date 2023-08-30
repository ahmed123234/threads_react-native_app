import { useCallback } from "react";
// @ts-ignore
import * as WebBrowser from "expo-web-browser";
import { Button, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/browser";

WebBrowser.maybeCompleteAuthSession();

type Props = {
    strategy: 
    | "oauth_google" 
    | "oauth_facebook" 
    | "oauth_github"  
    | "oauth_twitter"  
    | "oauth_linkedin"
}

const SignInWithOAuth = ({ strategy }: Props ) => {
  useWarmUpBrowser();

  const provider = strategy.substring(6);

  const { startOAuthFlow } = useOAuth({ strategy });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={onPress}
    >
        <Text>Continue with {provider}</Text>
    </TouchableOpacity>
  );
}
export default SignInWithOAuth;

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        backgroundColor: 'gray',
        // color: '#fff',
        // textAlign: 'center',
        borderRadius: 5,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
    }
})