import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1, y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 24 }
        }
    }

    const orbs = [
        { top: '10%', left: '15%', size: 300, color: 'bg-blue-400', delay: 0 },
        { top: '60%', right: '10%', size: 250, color: 'bg-purple-400', delay: 2 },
        { top: '30%', right: '25%', size: 180, color: 'bg-indigo-300', delay: 4 },
        { bottom: '10%', left: '20%', size: 200, color: 'bg-cyan-300', delay: 1 },
    ]

    const images = [
        { src: assets.sample_img_1, size: 'lg', label: 'Cyberpunk City' },
        { src: assets.sample_img_2, size: 'sm', label: 'Neon Portrait' },
        { src: assets.sample_img_1, size: 'md', label: 'Fantasy Realm' },
        { src: assets.sample_img_2, size: 'lg', label: 'Abstract Flow' },
        { src: assets.sample_img_1, size: 'sm', label: 'Dreamscape' },
        { src: assets.sample_img_2, size: 'md', label: 'Future Tech' },
    ]

    return (
        <div className="relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {orbs.map((orb, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${orb.color} opacity-15 dark:opacity-10 blur-3xl`}
                        style={{
                            width: orb.size,
                            height: orb.size,
                            top: orb.top,
                            left: orb.left,
                            right: orb.right,
                            bottom: orb.bottom,
                        }}
                        animate={{
                            x: [0, 30, -20, 0],
                            y: [0, -40, 20, 0],
                            scale: [1, 1.1, 0.95, 1],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            delay: orb.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Floating Stars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.img
                        key={i}
                        src={assets.star_icon}
                        alt=""
                        className="absolute w-4 h-4 opacity-30 dark:invert"
                        style={{
                            top: `${15 + (i * 9) % 70}%`,
                            left: `${10 + (i * 13) % 80}%`,
                        }}
                        animate={{
                            y: [0, -15, 0],
                            opacity: [0.2, 0.5, 0.2],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 4 + (i % 3),
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="relative flex flex-col justify-center items-center text-center pt-16 pb-12 sm:pt-24 sm:pb-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Badge */}
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm px-5 py-2 rounded-full border border-gray-200 dark:border-zinc-700 shadow-sm"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 dark:bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 dark:bg-orange-500"></span>
                    </span>
                    <p className="text-sm font-medium text-gray-700 dark:text-zinc-200">Best text to image generator</p>
                    <img src={assets.star_icon} alt="" className="w-4 h-4 dark:invert" />
                </motion.div>

                {/* Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl sm:text-6xl md:text-7xl font-bold mt-8 max-w-4xl leading-tight tracking-tight"
                >
                    <span className="text-gray-900 dark:text-zinc-100">Turn text to </span>
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-orange-400 dark:to-red-500 bg-clip-text text-transparent">
                        image
                    </span>
                    <br />
                    <span className="text-gray-900 dark:text-zinc-100">in seconds</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg sm:text-xl text-gray-500 dark:text-zinc-400 max-w-2xl mx-auto mt-6 leading-relaxed"
                >
                    Unleash your creativity with AI. Turn your imagination into visual art in seconds ~ just type, and watch the magic unfold.
                </motion.p>

                {/* CTA Button */}
                <motion.div variants={itemVariants} className="mt-10">
                    <motion.button
                        onClick={onClickHandler}
                        className="relative group inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-semibold text-lg overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-orange-500 dark:to-red-500 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-orange-500 dark:to-red-500 blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <span className="relative">Generate Images</span>
                        <img className="relative h-6 w-6" src={assets.star_group} alt='' />
                    </motion.button>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-8 mt-10 text-sm text-gray-500 dark:text-zinc-500"
                >
                    <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-orange-400 dark:to-red-500 border-2 border-white dark:border-zinc-900" />
                            ))}
                        </div>
                        <span>2,000+ creators</span>
                    </div>
                    <div className="h-4 w-px bg-gray-300 dark:bg-zinc-700" />
                    <div className="flex items-center gap-1">
                        <img src={assets.star_icon} className="w-4 h-4 dark:invert" alt="" />
                        <span>4.9/5 rating</span>
                    </div>
                    <div className="h-4 w-px bg-gray-300 dark:bg-zinc-700" />
                    <span>Free to start</span>
                </motion.div>

                {/* Image Showcase Grid */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 w-full max-w-5xl px-4"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
                        {images.map((img, index) => (
                            <motion.div
                                key={index}
                                className={`relative group rounded-2xl overflow-hidden cursor-pointer ${
                                    img.size === 'lg' ? 'md:col-span-2 md:row-span-2' :
                                    img.size === 'md' ? 'md:col-span-1 md:row-span-2' : ''
                                }`}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.8 + index * 0.1, type: 'spring', stiffness: 200 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                            >
                                <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800">
                                    <img
                                        src={img.src}
                                        alt={img.label}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-white text-xs font-medium">{img.label}</p>
                                    </div>
                                    <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 dark:ring-orange-500/0 group-hover:ring-blue-500/50 dark:group-hover:ring-orange-500/50 transition-all duration-300" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="mt-6 text-sm text-gray-400 dark:text-zinc-600 font-medium tracking-wide uppercase"
                >
                    Generated images from PhotoGen
                </motion.p>
            </motion.div>
        </div>
    )
}

export default Header
