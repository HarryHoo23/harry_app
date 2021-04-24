import React, { useContext, useState, useEffect } from 'react';
import { auth, database } from '../firebase/firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    function signup(email, password, name) {
        auth.createUserWithEmailAndPassword(email, password);
        auth.onAuthStateChanged(user => {
            if(user) {
                database.ref('users/' + user.uid).set({
                    username: name,
                    email: email
                })
            }
        })
    }

    function login(email, password) { 
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe
    }, [])
    

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
