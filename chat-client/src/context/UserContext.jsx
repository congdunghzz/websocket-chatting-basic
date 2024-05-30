import { createContext, useState } from "react";
import SockJS from "sockjs-client";
import {over} from 'stompjs';
export const UserContext = createContext();

export function UserProvider({children}){
    const [user, setUser] = useState('');
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
        
    )
}