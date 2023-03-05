import React, { useContext, useState, useEffect, createContext } from 'react';
import {auth} from "../firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    GoogleAuthProvider, 
    signInWithPopup  
} from 'firebase/auth';

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user)
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    // function googleAuth(){
    //     const provider = new GoogleAuthProvider();
    //     signInWithPopup(auth, provider)
    //     .then((result) => {
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;
    //         // The signed-in user info.
    //         const user = result.user;
    //         // ...
    //     }).catch((error) => {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.email;
    //         // The AuthCredential type that was used.
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //         // ...
    //     });
    // }

    function signup(email,password)
    {   // createUserWithEmailAndPassword returns no user
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("singup")
                setCurrentUser(userCredential.user)
            })
            .catch((error) => {
                console.log("error")
            });
    }

    function login(email,password)
    {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Log in")
                setCurrentUser(userCredential.user)
            })
            .catch((error) => {
                console.log("Login error")
            })
    }

    function logout()
    {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("sign out successfully")
        }).catch((error) => {
            // An error happened.
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
