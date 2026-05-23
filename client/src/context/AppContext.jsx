import {useCallback, useEffect, useState} from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { AppContext } from "./AppContext.js";

const AppContextProvider = (props) =>{
    const [user, setUser] = useState(null);
    const[showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit, setCredit] = useState(0)

    const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, '')

    // Logout is shared by manual logout and expired-token cleanup.
    const logout = useCallback(()=> {
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
        setCredit(0)
    }, [])

    // Refresh credits from the server to restore sessions after page reloads.
    const loadCreditsData = useCallback(async(authToken = token)=>{
        if(!authToken){
            logout()
            return
        }

        try{

            const {data} = await axios.get(backendUrl + '/api/user/credits',{
                headers:{Authorization: `Bearer ${authToken}`}
            })

            if(data.success)
            {
                setCredit(data.credits)
                setUser(data.user)
            }else{
                toast.error(data.message)
                logout()
            }

        }catch(error){
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
            logout()

        }
    }, [backendUrl, logout, token])

    useEffect(()=>{
        if(token){
            // Defer the refresh so React does not receive sync state updates from the effect body.
            const timeoutId = window.setTimeout(()=>{
                loadCreditsData(token)
            }, 0)

            return ()=> window.clearTimeout(timeoutId)
        }

    },[loadCreditsData, token])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}

        </AppContext.Provider>
    )
}

export default AppContextProvider
