import { createContext, useEffect, useState } from "react";
import { getLoggedUserDataApi } from "../Services/AuthServices";

export const authContext = createContext()


export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem('token') != null)
    const [userData, setUserData] = useState('')

    async function getLoggedUserData() {
        const data = await getLoggedUserDataApi();
        if (data.message == 'success') {
            setUserData(data.user)
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            getLoggedUserData()

        }else{
            setUserData()
        }
    }
        , [isLoggedIn])


    return <authContext.Provider value={{ isLoggedIn, setisLoggedIn, userData, setUserData }} >
        {children}
    </authContext.Provider>


}