import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({})

export function UserContextProvider({children}) {

    //initially no user, nobody's logged in
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        if(!user) {
            axios.get('/api/profile').then(({data}) => {
                setUser(data)
            })
        }
    }, [])

    const logout = async () => {
        try {
          await axios.post('/api/logout');
          setUser(null);
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };

    return(
        <UserContext.Provider value={ {user, setUser, logout} }>
            {children}
        </UserContext.Provider>
    )
}