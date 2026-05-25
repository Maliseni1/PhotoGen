import React, { useContext, useState, useRef } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { AppContext } from '../context/AppContext'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const { generateImage } = useContext(AppContext)
  const downloadCount = useRef(0)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (input) {
      const image = await generateImage(input)
      if (image) {
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }

  const handleDownload = () => {
    downloadCount.current += 1
    const number = String(downloadCount.current).padStart(3, '0')
    const link = document.createElement('a')
    link.href = image
    link.download = `photogen_${number}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className='flex flex-col min-h-[90vh] justify-center items-center px-4'
    >
      <div>
        <div className='relative'>
          <img src={image} alt='Generated' className='max-w-sm rounded-2xl shadow-lg dark:shadow-zinc-900/50' />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 dark:bg-orange-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
        </div>
        <p className={`mt-3 text-center text-sm text-gray-500 dark:text-zinc-400 ${!loading ? 'hidden' : ''}`}>
          Loading....
        </p>
      </div>

      {!isImageLoaded && (
        <div className='flex w-full max-w-xl bg-neutral-500 dark:bg-zinc-700 text-white text-sm p-0.5 mt-10 rounded-full shadow-lg'>
          <input
            onChange={e => setInput(e.target.value)}
            value={input}
            type='text'
            placeholder='Describe what you want to generate'
            className='flex-1 bg-transparent outline-none px-4 ml-8 max-sm:w-20 placeholder-gray-300 dark:placeholder-zinc-400'
          />
          <button
            type='submit'
            className='bg-zinc-900 dark:bg-orange-500 dark:text-zinc-900 text-white font-medium px-10 sm:px-16 py-3 rounded-full'
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className='flex gap-3 flex-wrap justify-center text-sm p-0.5 mt-10'>
          <button
            onClick={() => { setIsImageLoaded(false); setInput('') }}
            className='bg-transparent border-2 border-zinc-900 dark:border-zinc-500 text-black dark:text-white px-8 py-3 rounded-full cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium'
          >
            Generate Another
          </button>
          <button
            onClick={handleDownload}
            className='bg-zinc-900 dark:bg-orange-500 dark:text-zinc-900 text-white px-10 py-3 rounded-full cursor-pointer font-medium hover:opacity-90 transition-opacity'
          >
            Download
          </button>
        </div>
      )}
    </motion.form>
  )
}

export default Result