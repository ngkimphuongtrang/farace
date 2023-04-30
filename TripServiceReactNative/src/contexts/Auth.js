import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthData, authService } from '../services/authService';

// type AuthContextData = {
//   authData?: AuthData;
//   loading: boolean;
//   signIn(): Promise<void>;
//   signOut(): void;
// };

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState();

  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      //Try get the data from Async Storage
      const _authData = await AsyncStorage.getItem('@MyAuthData');
      console.log("auth:", _authData);
      setAuthData(_authData);
    } catch (error) {
    } finally {
      //loading finished
      setLoading(false);
    }
  }

  const signIn = async (userName, password) => {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    const result = await authService.signIn(
      userName,
      password,
    );
    if (result == undefined) return false;
    const loginToken = result[0];
    const userId = result[1];
    console.log("authdata:", loginToken, userId);

    //Set the data in the context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(loginToken);

    //Persist the data in the Async Storage
    //to be recovered in the next user session.
    storeData(loginToken, userId);
    console.log("go here");
    return true;

  };
  const storeData = async (loginToken, userId) => {
    try {
      await AsyncStorage.setItem('@MyAuthData', loginToken);
      await AsyncStorage.setItem('@userId', userId);
    } catch (error) {
      console.log("store Data fail", error)
    }
  }
  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);

    //Remove the data from Async Storage
    //to NOT be recoverede in next session.
    await AsyncStorage.removeItem('@MyAuthData');
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };