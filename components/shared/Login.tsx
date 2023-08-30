import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import SignOut from "./SignOut"
import SignInWithOAuth from "../../screens/SignInWithOAuth"
import SignInScreen from "../../screens/SignInScreen"
import { Home } from "../pages"
import { BottomBarNavigation } from "../../screens"

const Login = ({ navigation }) => (

  <SafeAreaView>
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#111',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        // paddingTop: 40
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >

      <SignedIn>
        <BottomBarNavigation navigation={navigation} />
        {/* <SignOut /> */}
        {/* <SignOutButton /> */}
      </SignedIn>

      <SignedOut>

        <View style={{
          rowGap: 30,
          marginHorizontal: 30,
          alignItems: 'flex-start'
        }}>
          <View style={{ flexDirection: 'column', rowGap: 10 }}>
            <Text style={{ fontWeight: '700', color: '#fff', fontSize: 26 }}>Sign in</Text>
            <Text style={{ color: 'gray', fontSize: 16 }}>
              to continue to Threads
            </Text>

          </View>

          <SignInWithOAuth strategy='oauth_google' />
          <SignInWithOAuth strategy='oauth_github' />
          <SignInScreen />
        </View>
      </SignedOut>

    </ScrollView>
  </SafeAreaView>
)

export default Login