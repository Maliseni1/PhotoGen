import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    // Updated: Added dark mode text color
    <div className='flex items-center justify-between gap-4 py-3 mt-20 text-gray-500 dark:text-zinc-400'>

        <img src={assets.logo} alt='' width={150} />

        {/* Updated: Added dark mode border/text and the new Contact Us link */}
        <p className='flex-1 border-l border-gray-400 dark:border-zinc-700 pl-4 text-sm text-gray-500 dark:text-zinc-500 max-sm:hidden'>
            Copyright @2025 Chiza Labs | All rights reserved.
            {/* ADDED: Contact Us mailto link */}
            <a href="mailto:maliseni1205@gmail.com" className='ml-2 hover:underline text-gray-700 dark:text-orange-400 font-medium'>
                Contact Us
            </a>
        </p>

        <div className='flex gap-2.5'>
            {/* Facebook */}
            <a href="https://www.facebook.com/YOUR_PAGE" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt='Facebook' width={35} className='cursor-pointer invert dark:invert-0' />
            </a>

            {/* Twitter */}
            <a href="https://www.twitter.com/YOUR_PROFILE" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter_icon} alt='Twitter' width={35} className='cursor-pointer invert dark:invert-0' />
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/YOUR_PROFILE" target="_blank" rel="noopener noreferrer">
              <img src={assets.instagram_icon} alt='Instagram' width={35} className='cursor-pointer invert dark:invert-0' />
            </a>

            {/* LinkedIn (New) */}
            <a href="https://www.linkedin.com/in/YOUR_PROFILE" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt='LinkedIn' width={35} className='cursor-pointer invert dark:invert-0' />
         </a>
        </div>
    </div>
  )
}

export default Footer