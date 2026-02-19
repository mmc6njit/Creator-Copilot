import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    // Sign up
    const signUpNewUser = async (name, email, password, occupation) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    occupation: occupation,
                }
            }
        });
        if (error) {
            console.error("Error signing up:", error);
            return { success: false, error };
        }
        return { success: true, data };
    };

    // Sign in
    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error) {
                console.error("Error signing in:", error);
                return { success: false, error: error.message };
            }
            console.log("User signed in:", data);
            return { success: true, data };

        } catch (error) {
            console.error("Error signing in:", error);
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    },[])

    // Sign out
    const signOutUser = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
        }
    };




    
    return (
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext