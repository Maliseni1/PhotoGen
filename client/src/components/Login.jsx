import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'motion/react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [state, setState] = useState('Login')
    const { setShowLogin, backendUrl, setToken, setUser, isDarkMode } = useContext(AppContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [shake, setShake] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (isLoading) return
        setIsLoading(true)

        try {
            let data
            if (state === 'Login') {
                const res = await axios.post(backendUrl + '/api/user/login', { email, password })
                data = res.data
            } else {
                const res = await axios.post(backendUrl + '/api/user/register', { name, email, password })
                data = res.data
            }

            if (data.success) {
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token', data.token)
                toast.success(state === 'Login' ? 'Welcome back! 🎉' : 'Account created! 🚀', {
                    className: isDarkMode ? 'dark-toast' : ''
                })
                setShowLogin(false)
            } else {
                toast.error(data.message)
                setShake(true)
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong')
            setShake(true)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        toast.info('Google OAuth coming soon — backend integration needed!', {
            icon: '🔜',
            className: isDarkMode ? 'dark-toast' : ''
        })
    }

    // Lock body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' }
    }, [])

    // Staggered children animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.07, delayChildren: 0.25 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1, y: 0,
            transition: { type: 'spring', stiffness: 400, damping: 28 }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 backdrop-blur-md bg-black/50 flex justify-center items-center p-4"
            onClick={() => setShowLogin(false)}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                onClick={e => e.stopPropagation()}
                className="relative w-full max-w-[420px] bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* ─── Branded Gradient Header ─── */}
                <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-orange-500 dark:to-red-600 p-7 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />

                    <motion.img
                        src={assets.logo_icon}
                        alt="PhotoGen"
                        className="mx-auto h-10 w-10 mb-3 brightness-0 invert drop-shadow-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                    />
                    <motion.h2
                        className="text-xl font-bold text-white tracking-tight"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {state === 'Login' ? 'Welcome Back!' : 'Join PhotoGen'}
                    </motion.h2>
                    <motion.p
                        className="text-sm text-white/80 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {state === 'Login' ? 'Sign in to continue creating' : 'Start generating amazing images'}
                    </motion.p>
                </div>

                {/* ─── Body ─── */}
                <div className="p-6 sm:p-8">

                    {/* Google Sign In */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full"
                    >
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    const { data } = await axios.post(
                                        backendUrl + '/api/user/google-auth',
                                        { credential: credentialResponse.credential }
                                    );

                                    if (data.success) {
                                        setToken(data.token);
                                        setUser(data.user);
                                        localStorage.setItem('token', data.token);
                                        setShowLogin(false);
                                        toast.success('Welcome! 🎉');
                                    } else {
                                        toast.error(data.message);
                                    }
                                } catch (error) {
                                    toast.error('Google login failed');
                                }
                            }}
                            onError={() => {
                                toast.error('Google login failed');
                            }}
                            theme={isDarkMode ? 'filled_black' : 'outline'}
                            size="large"
                            width="100%"
                            text="continue_with"
                        />
                    </motion.div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-600" />
                        <span className="text-xs text-gray-400 dark:text-zinc-500 font-medium uppercase tracking-wide">or</span>
                        <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-600" />
                    </div>

                    {/* Form */}
                    <motion.form
                        onSubmit={onSubmitHandler}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className={shake ? 'animate-shake' : ''}
                        onAnimationEnd={() => setShake(false)}
                    >
                        <AnimatePresence mode="wait">
                            {state !== 'Login' && (
                                <motion.div
                                    key="name-field"
                                    initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                                    animate={{ height: 'auto', opacity: 1, marginBottom: 16 }}
                                    exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    className="overflow-hidden"
                                >
                                    <div className="group relative flex items-center gap-3 border border-gray-200 dark:border-zinc-600 bg-gray-50/50 dark:bg-zinc-700/40 px-4 py-2.5 rounded-xl transition-all focus-within:border-blue-500 dark:focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-blue-500/15 dark:focus-within:ring-orange-500/15">
                                        <img src={assets.profile_icon} alt="" className="h-5 w-5 opacity-50 group-focus-within:opacity-100 transition-opacity dark:invert" />
                                        <input
                                            onChange={e => setName(e.target.value)}
                                            value={name}
                                            type="text"
                                            className="outline-none text-sm bg-transparent w-full dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                                            placeholder="Full Name"
                                            required
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div variants={itemVariants}>
                            <div className="group relative flex items-center gap-3 border border-gray-200 dark:border-zinc-600 bg-gray-50/50 dark:bg-zinc-700/40 px-4 py-2.5 rounded-xl transition-all focus-within:border-blue-500 dark:focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-blue-500/15 dark:focus-within:ring-orange-500/15">
                                <img src={assets.email_icon} alt="" className="h-5 w-5 opacity-50 group-focus-within:opacity-100 transition-opacity dark:invert" />
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    className="outline-none text-sm bg-transparent w-full dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                                    placeholder="Email address"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-4">
                            <div className="group relative flex items-center gap-3 border border-gray-200 dark:border-zinc-600 bg-gray-50/50 dark:bg-zinc-700/40 px-4 py-2.5 rounded-xl transition-all focus-within:border-blue-500 dark:focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-blue-500/15 dark:focus-within:ring-orange-500/15">
                                <img src={assets.lock_icon} alt="" className="h-5 w-5 opacity-50 group-focus-within:opacity-100 transition-opacity dark:invert" />
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    type={showPassword ? 'text' : 'password'}
                                    className="outline-none text-sm bg-transparent w-full dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </motion.div>

                        {state === 'Login' && (
                            <motion.div variants={itemVariants} className="flex justify-end mt-2">
                                <span className="text-xs text-blue-600 dark:text-orange-400 hover:underline cursor-pointer">
                                    Forgot Password?
                                </span>
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants} className="mt-5">
                            <motion.button
                                disabled={isLoading}
                                whileHover={!isLoading ? { scale: 1.02 } : {}}
                                whileTap={!isLoading ? { scale: 0.98 } : {}}
                                className="w-full bg-blue-600 dark:bg-orange-500 text-white py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-600/25 dark:shadow-orange-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        <span>{state === 'Login' ? 'Signing in...' : 'Creating account...'}</span>
                                    </>
                                ) : (
                                    <span>{state === 'Login' ? 'Sign In' : 'Create Account'}</span>
                                )}
                            </motion.button>
                        </motion.div>
                    </motion.form>

                    {/* Toggle Login / Sign Up */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-center"
                    >
                        <p className="text-sm text-gray-500 dark:text-zinc-400">
                            {state === 'Login' ? "Don't have an account? " : "Already have an account? "}
                            <motion.span
                                className="text-blue-600 dark:text-orange-400 font-semibold cursor-pointer hover:underline inline-block"
                                onClick={() => {
                                    setState(state === 'Login' ? 'Sign Up' : 'Login')
                                    setName('')
                                    setEmail('')
                                    setPassword('')
                                    setShake(false)
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {state === 'Login' ? 'Sign Up' : 'Sign In'}
                            </motion.span>
                        </p>
                    </motion.div>
                </div>

                {/* Close Button */}
                <motion.button
                    onClick={() => setShowLogin(false)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </motion.button>
            </motion.div>
        </motion.div>
    )
}

export default Login
