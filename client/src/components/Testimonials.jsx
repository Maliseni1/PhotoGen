import React from 'react'
import { testimonialsData } from '../assets/assets'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Testimonials = () => {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-col items-center justify-center my-20 py-12 px-4'
        >
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-gray-900 dark:text-zinc-100'>
                Customer Testimonials
            </h1>
            <p className='text-gray-500 dark:text-zinc-400 mb-12'>What Our Users Are Saying</p>

            <div className='flex flex-wrap gap-6 justify-center'>
                {testimonialsData.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 200, delay: index * 0.15 }}
                        className='bg-white dark:bg-zinc-800/80 p-6 rounded-2xl shadow-md dark:shadow-zinc-900/50 border border-gray-100 dark:border-zinc-700 w-80 cursor-pointer hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-zinc-900/80 transition-all duration-300'
                    >
                        <div className='flex flex-col items-center'>
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-orange-400 dark:to-red-400 rounded-full blur-sm opacity-60" />
                                <img src={testimonial.image} alt="" className='relative rounded-full w-14 h-14 object-cover border-2 border-white dark:border-zinc-700' />
                            </div>
                            <h2 className='text-xl font-semibold mt-3 text-gray-900 dark:text-zinc-100'>{testimonial.name}</h2>
                            <p className='text-gray-500 dark:text-zinc-400 mb-4 text-sm'>{testimonial.role}</p>
                            <div className='flex mb-4'>
                                {Array(testimonial.stars).fill().map((_, i) => (
                                    <img key={i} src={assets.rating_star} alt='' className='w-4' />
                                ))}
                            </div>
                            <p className='text-center text-sm text-gray-600 dark:text-zinc-400 leading-relaxed'>{testimonial.text}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default Testimonials
