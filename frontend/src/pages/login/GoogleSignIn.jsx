import React from 'react'
import useGoogleSiginHook from '../../hooks/useGoogleSignin';

function GoogleSignIn() {

    const { authUser, getGoogleUser } = useGoogleSiginHook()
    const handleClick = function (e) {
        e.preventDefault();
        window.location.href = 'http://localhost:8080/api/auth/google';
        getGoogleUser();
    }

    return (
        <button className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 text-white font-bold py-3 px-4 rounded w-full" onClick={handleClick}>
            Sign in with Google
        </button>
    )
}

export default GoogleSignIn