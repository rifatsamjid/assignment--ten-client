import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

const AuthProvider = ({ children }) => {

      const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    // email singin
    const signIn =(email,password)=>{
        setUser(true)
       return createUserWithEmailAndPassword(auth,email,password)
    }

    // email login
    const logIn=(email,password)=>{
        setLoading(true)
       return signInWithEmailAndPassword(auth,email,password)
    }

    // logOut
    const logOut=()=>{
        setLoading(true)
        signOut(auth)
    }

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

    const AuthInfo={
        signIn,
        logIn,
        logOut,
        user,
        loading
    }

    return <AuthContext value={AuthInfo}>{children}</AuthContext>
 };

export default AuthProvider;