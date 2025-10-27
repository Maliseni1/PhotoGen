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
        userId: user._id,
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
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
    className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left cursor-pointer'>
        {plans.map((item, index)=>(
          <div key={index} className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
            <img width={40} src={assets.logo_icon} alt='' />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'><span className='text-3xl font-medium'>${item.price} </span>/ {item.credits} credits</p>
            {user ? (
              <Buy
                productId={item.id}
                amount={item.price}
                recipient="0x59c773bFdeFb999084725937A12B27684A782676"
                onSuccess={() => handlePaymentSuccess(item)}
                className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'
              >
                Purchase
              </Buy>
            ) : (
              <button className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>Get Started</button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit
