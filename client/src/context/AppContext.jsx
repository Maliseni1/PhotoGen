import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props)=> {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))
    
    const [credit, setCredit] = useState(false)

    // --- Dark Mode Start ---
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Initialize state from localStorage
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false; // default to light mode
    });

    // Toggle dark mode function
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    // Effect to save dark mode preference to localStorage
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);
    // --- Dark Mode End ---


    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const loadCreditData = async ()=> {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/credits', {headers: {token}})
            
            if(data.success) {
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const generateImage = async (prompt)=>{
        try {
            const {data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {headers: {token}})
            
            if(data.success){
                loadCreditData()
                return data.resultImage
            } else{
                toast.error(data.message)
                loadCreditData()
                if(data.creditBalance === 0){
                    navigate('/buyCredit')
                }
    D       }
        } catch (error) {
            toast.error(error.message)
m     }
    }

    const logout = ()=> {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setCredit(0);
        toast.success('Logged out successfully')
    }

    useEffect(()=>{
         if(token) {
            loadCreditData()
         }
    },[])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditData, logout, generateImage,
        // --- Add dark mode to context value ---
        isDarkMode, 
        toggleDarkMode
        // --- End ---
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider