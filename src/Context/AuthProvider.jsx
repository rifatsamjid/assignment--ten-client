import React from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {

    const AuthInfo={
        
    }

    return <AuthContext value={AuthInfo}>{children}</AuthContext>
 };

export default AuthProvider;