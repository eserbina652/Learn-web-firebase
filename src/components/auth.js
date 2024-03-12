import React, {useState} from 'react';
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'

import {auth, googleProvider} from "../configs/firebase";

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // console.log('USER MAIL DATA', auth?.currentUser?.photoURL)
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (e) {
            console.error('create user err', e)
        }
    }
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (e) {
            console.error('create user err', e)
        }
    }
    const logout = async () => {
        try {
            await signOut(auth)
        } catch (e) {
            console.error('create user err', e)
        }
    }
    return (
        <div>
            <input
                placeholder={'E-mail...'}
                onChange={e => setEmail(e.target.value)}/>
            <input
                placeholder={'Password...'}
                type={'password'}
                onChange={e => setPassword(e.target.value)}/>
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}>Sign In with Google</button>

            <button onClick={logout}>Log Out</button>
        </div>
    );
};

export default Auth;
