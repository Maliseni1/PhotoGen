import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'motion/react'

const Steps = () => {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-col items-center justify-center my-32 px-4'
        >
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-gray-900 dark:text-zinc-100'>How it works</h1>
            <p className='text-lg text-gray-500 dark:text-zinc-400 mb-8'>Transform Words Into Stunning Images</p>

            <div className='space-y-4 w-full max-w-3xl text-sm'>
                {stepsData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 200, delay: index * 0.15 }}
                        className='flex items-center gap-4 p-5 px-8 bg-white dark:bg-zinc-800/80 shadow-md dark:shadow-zinc-900/50 border border-gray-200 dark:border-zinc-700 cursor-pointer hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-zinc-900/80 transition-all duration-300 rounded-xl'
                    >
                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-orange-500/20 flex items-center justify-center shrink-0">
                            <img width={28} src={item.icon} alt='' className="dark:invert" />
                        </div>
                        <div>
                            <h2 className='text-xl font-medium text-gray-900 dark:text-zinc-100'>{item.title}</h2>
                            <p className='text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed'>{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default Steps
