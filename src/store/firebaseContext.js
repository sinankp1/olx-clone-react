import { createContext, useState } from "react";

export const firebaseContext = createContext(null);

export const authContext = createContext(null);

export default function Context({children}){
    const [user, setUser] = useState('hello')
    return (
        <authContext.Provider value={{user,setUser}}>
            {children}
        </authContext.Provider>
    )
}