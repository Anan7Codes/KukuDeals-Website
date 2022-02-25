import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "@/utils/supabaseClient";

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(supabase.auth.user())

    useEffect(() => {
        supabase.auth.onAuthStateChange(() => {
            setUser(supabase.auth.user())
        })
    }, [])

    const exposed = {
        user,
        setUser
    }
    return <UserContext.Provider value={exposed}>
        {children}
    </UserContext.Provider>
}

export const useUser = () => useContext(UserContext)

export default UserProvider;