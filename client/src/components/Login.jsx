import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {

    const [state, setState] = useState('Login')
    const {setShowLogin, backendUrl, setToken, setUser, isDarkMode} = useContext(AppContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            
            if(state === 'Login') {
                const {data} = await axios.post(backendUrl + '/api/user/login', {email, password})

                if(data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else{
                    toast.error(data.message)
                }
             
            } else{
                const {data} = await axios.post(backendUrl + '/api/user/register', {name, email, password})

                if(data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        document.body.style.overflow = 'hidden';

        return ()=>{
            document.body.style.overflow = 'unset';
        }
    },[])

  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

        <motion.form onSubmit={onSubmitHandler}
        initial={{opacity: 0.2, y:50}}
        transition={{duration:0.3}}
        whileInView={{opacity:1, y:0}}
        viewport={{once:true}}
        className='relative bg-white dark:bg-zinc-800 p-10 rounded-xl text-slate-500 dark:text-zinc-300'>
            <h1 className='text-center text-2xl text-neutral-700 dark:text-zinc-100 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue.</p>

{ state !== 'Login' &&            
            <div className='border dark:border-zinc-700 px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img className='width-6 h-6 dark:invert'src={assets.profile_icon} alt="" />
                <input onChange={e => setName(e.target.value)} value={name} type="text" className='outline-none text-sm bg-transparent dark:text-zinc-100' placeholder='Full Name' required />
            </div>
}

            <div className='border dark:border-zinc-700 px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt="" className='dark:invert' />
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" className='outline-none text-sm bg-transparent dark:text-zinc-100' placeholder='Email' required />
            </div>

            <div className='border dark:border-zinc-700 px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt="" className='dark:invert' />
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" className='outline-none text-sm bg-transparent dark:text-zinc-100' placeholder='Password' required />
           </div>

            <p className='text-sm text-blue-600 dark:text-orange-400 my-4 cursor-pointer'>Forgot Password?</p>
            
            <button className='bg-blue-600 dark:bg-orange-500 dark:text-zinc-900 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'login' : 'create account'}</button>

{ state === 'Login' ?
            <p className='mt-5 text-center'>Don't have an account?<span className='text-blue-600 dark:text-orange-400 cursor-pointer' onClick={()=>setState('Sign Up')}>Sign Up</span></p>
:
            <p className='mt-5 text-center'>Already have an account?<span className='text-blue-600 dark:text-orange-400 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p>
}

            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer dark:invert' />
        </motion.form>

    </div>
  )
}

export default Login