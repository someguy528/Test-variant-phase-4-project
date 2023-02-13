import React from 'react';
import {useState, useEffect} from 'react'; 

const UserContext = React.createContext();

function UserProvider({children}){

    const [user, setUser] = useState(null);
    console.log(user)

    useEffect(() => {
        fetch("/api/users/show").then((response) => {
          if (response.ok) {
            response.json().then((user) => setUser(user));
          }else{
            setUser(false)
          }
        });
      }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )

}

// eslint-disable-next-line 
export {UserContext, UserProvider};
