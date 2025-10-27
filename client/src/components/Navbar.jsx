import React, {useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {
    
    // 1. Get isDarkMode and toggleDarkMode from context
    const { user, setShowLogin, logout, credit, isDarkMode, toggleDarkMode } = React.useContext(AppContext)

    const navigate = useNavigate()

  return (
    // 2. Make the navbar background transparent (so App.jsx background shows)
    //    and text colors respect dark mode
    <div className='flex items-center justify-between py-4 bg-transparent text-gray-800 dark:text-zinc-100'>
        <Link to='/'>
            <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40' />
        </Link>

        <div>
            {
            user ?
            <div className='flex items-center gap-2 sm:gap-3'>

                {/* --- Dark Mode Toggle Button --- */}
                <button 
                    onClick={toggleDarkMode} 
                    className='p-2 rounded-full text-xl hover:bg-gray-100 dark:hover:bg-zinc-700'
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
                {/* --- End Toggle --- */}

                {/* 3. Updated credit button styles for dark mode */}
                <button onClick={()=>navigate('/buycredit')} className='flex items-center gap-2 bg-blue-100 dark:bg-blue-200 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
                    <img className='w-5' src={assets.credit_star} alt=''/>
                    {/* 4. Updated text color for dark mode (to be readable on light blue) */}
                    <p className='text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-800'>Credits left : {credit}</p>
                </button>
                {/* 5. Updated user name text color for dark mode */}
                <p className='text-gray-600 dark:text-zinc-300 max-sm:hidden pl-4'>Hi, {user.name}</p>
                <div className='relative group'>
                    <img src={assets.profile_icon} className='w-10 drop-shadow' alt=''/>
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 rounded pt-12'>
                        {/* 6. Updated dropdown menu styles for dark mode */}
                        <ul className='list-none m-0 p-2 bg-white dark:bg-zinc-800 rounded-md border dark:border-zinc-700 text-sm'>
                            <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700 rounded'>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
            :
            <div className='flex items-center gap-2 sm:gap-5'>

                {/* --- Dark Mode Toggle Button --- */}
                <button 
                    onClick={toggleDarkMode} 
                    className='p-2 rounded-full text-xl hover:bg-gray-100 dark:hover:bg-zinc-700'
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
                {/* --- End Toggle --- */}

                {/* 7. Updated "Pricing" text color for dark mode */}
                <p onClick={()=>navigate('/buycredit')} 
                className='cursor-pointer text-gray-600 dark:text-zinc-300'>Pricing</p>
                {/* 8. Updated Login button styles for dark mode */}
                <button onClick={()=>setShowLogin(true)} className='bg-zinc-800 dark:bg-orange-400 dark:text-zinc-900 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>Login</button>
            </div>
            }
        </div>

    </div>
  )
}

export default Navbar