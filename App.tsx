import { ClerkProvider } from '@clerk/clerk-expo';
import { StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './screens';
import { createContext, useContext, useState } from 'react';
import { AppContext } from './hooks/hook';
import { UserProps } from './lib/types';
axios.create({
  baseURL: "http://192.168.1.106:4000", //"https://api.clerk.dev
  withCredentials: true

});

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err: any) {
      throw new Error(`Error retriving the specified token: ${err.message}`);
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err: any) {
      throw new Error(`Error saving the specified token: ${err.message}`);
    }
  },
};

const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY || 'pk_test_b24tdG9tY2F0LTM0LmNsZXJrLmFjY291bnRzLmRldiQ';


export default function App() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProps>({} as UserProps);
  return (
    <AppContext.Provider value={{ modalVisible, setModalVisible, currentUser, setCurrentUser }}>

      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <NavigationContainer >
          <StackNavigation />
        </NavigationContainer>

      </ClerkProvider>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
