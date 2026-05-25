import React, { useContext, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AnimatePresence } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'

import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'

// ─── Auth Guard ───
const ProtectedRoute = ({ children }) => {
    const { token, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!token) {
            // Show login modal and kick them back to home
            setShowLogin(true)
            navigate('/', { replace: true })
        }
    }, [token, navigate, setShowLogin, location])

    // Don't render the protected page while redirecting
    return token ? children : null
}

const App = () => {
    const { showLogin, isDarkMode } = useContext(AppContext)

    return (
        <div
            className={`px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen ${isDarkMode ? 'dark' : ''}`}
            style={{ background: 'var(--bg-primary)' }}
        >
            <ToastContainer position='bottom-right' />
            <Navbar />

            <AnimatePresence>
                {showLogin && <Login key="login-modal" />}
            </AnimatePresence>

            <Routes>
                <Route path='/' element={<Home />} />
                
                <Route path='/result' element={
                    <ProtectedRoute>
                        <Result />
                    </ProtectedRoute>
                } />
                
                <Route path='/buycredit' element={
                    <ProtectedRoute>
                        <BuyCredit />
                    </ProtectedRoute>
                } />
            </Routes>

            <Footer />

            <Analytics />
        </div>
    )
}

export default App