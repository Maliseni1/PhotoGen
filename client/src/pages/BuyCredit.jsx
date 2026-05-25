import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import { Buy } from '@coinbase/onchainkit/buy'
import axios from 'axios'
import { toast } from 'react-toastify'

const BuyCredit = () => {
  const { user, backendUrl, token, loadCreditData } = useContext(AppContext)

  const handlePaymentSuccess = async (plan) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/add-credits`, {
        credits: plan.credits
      }, { headers: { token } })

      if (data.success) {
        toast.success('Credits added successfully!')
        loadCreditData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to add credits')
      console.error(error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='min-h-[80vh] text-center pt-14 mb-10 px-4'
    >
      <button className='border border-gray-400 dark:border-zinc-600 text-gray-700 dark:text-zinc-300 px-10 py-2 rounded-full mb-6 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors'>
        Our Plans
      </button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10 text-gray-900 dark:text-zinc-100'>
        Choose the plan
      </h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div
            key={index}
            className='bg-white dark:bg-zinc-800/80 shadow-sm dark:shadow-zinc-900/50 border border-gray-200 dark:border-zinc-700 rounded-2xl py-12 px-8 text-gray-600 dark:text-zinc-300 hover:scale-105 transition-all duration-500 w-72'
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-orange-500/20 flex items-center justify-center mb-4">
              <img width={28} src={assets.logo_icon} alt='' className="dark:invert" />
            </div>
            <p className='font-semibold text-lg text-gray-900 dark:text-zinc-100'>{item.id}</p>
            <p className='text-sm mt-1'>{item.desc}</p>
            <p className='mt-6 text-gray-900 dark:text-zinc-100'>
              <span className='text-3xl font-bold'>${item.price}</span>
              <span className='text-gray-500 dark:text-zinc-400 text-sm'> / {item.credits} credits</span>
            </p>

            {user ? (
              <Buy
                productId={item.id}
                amount={item.price}
                recipient="0x59c773bFdeFb999084725937A12B27684A782676"
                onSuccess={() => handlePaymentSuccess(item)}
                className='w-full bg-gray-800 dark:bg-orange-500 text-white dark:text-zinc-900 mt-8 text-sm rounded-lg py-3 min-w-0 font-medium hover:opacity-90 transition-opacity'
              >
                Purchase
              </Buy>
            ) : (
              <button className='w-full bg-gray-800 dark:bg-orange-500 text-white dark:text-zinc-900 mt-8 text-sm rounded-lg py-3 font-medium hover:opacity-90 transition-opacity'>
                Get Started
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit