import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();

    const [emailAddress, setEmailAddress] = React.useState("");

    const [password, setPassword] = React.useState("");

    const onSignInPress = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignIn = await signIn.create({
                identifier: emailAddress,
                password,
            });
            // This is an important step,
            // This indicates the user is signed in
            await setActive({ session: completeSignIn.createdSessionId });
        } catch (err: any) {
            console.log(err.message);
        }
    };
    return (
        <View style={{ backgroundColor: 'transparent', width: "100%", rowGap: 30, flexDirection: 'column' }}>
            <View style={{ columnGap: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ height: 1, backgroundColor: 'gray', flex: 1 }} />
                <Text style={{ color: '#fff' }}>or</Text>

                <View style={{ height: 1, backgroundColor: 'gray', flex: 1 }} />
            </View>

            <View style={{rowGap: 15, flexDirection: "column"}}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Email address or username"
                    onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                />

                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Password..."
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />

                <TouchableOpacity style={styles.btn} onPress={onSignInPress}>
                    <Text>Continue</Text>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', flexDirection: 'row', columnGap: 4}}>
                <Text style={{color: '#fff', }}>
                  No Account? 
                </Text>
                <TouchableOpacity 
                    // onPress={() => }
                >
                    <Text style={{color: 'lightblue'}}> Sign up</Text>
                  </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    btn: {
        padding: 10,
        backgroundColor: 'gray',
        color: '    #fff',
        // textAlign: 'center',
        borderRadius: 5,
        // width: "90%",
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10
    }
})