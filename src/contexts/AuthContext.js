import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) localStorage.setItem("auth", JSON.stringify(user));
      setCurrentUser(user)
    })
    return unsubscribe;
  }, [])

  function signup(email,password){   
    // createUserWithEmailAndPassword returns no user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("singup")
        setCurrentUser(userCredential.user)
      })
      .catch((error) => {
        console.log("error")
      });
  }

  function login(email,password){
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Log in")
        console.log(userCredential)
        localStorage.setItem("auth", JSON.stringify(userCredential.user));
        setCurrentUser(userCredential.user);
      })
      .catch((error) => {
        console.log("Login error")
      });
  }

  function logout(){
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("sign out successfully")
      localStorage.clear();
    }).catch((error) => {
      // An error happened.
      console.log("something went wrong", error);
    });
  }
  
  //value is object which contain of auth info
  const value = {
    currentUser,
    signup,
    login,
    logout
    // sending signup in context so that many component can use it.
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
