import { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext.js'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) navigate('/result')
    else setShowLogin(true)
  }

  return (
    <motion.div
      className='flex flex-col items-center justify-center pt-20 pb-16 text-center'
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Badge */}
      <motion.div
        className='mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300'
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <span className='h-2 w-2 rounded-full bg-violet-400 animate-pulse' />
        <span>AI-Powered Text to Image Generation</span>
        <img src={assets.star_icon} alt='' className='h-4 w-4' />
      </motion.div>

      {/* Headline */}
      <motion.h1
        className='mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-7xl lg:text-8xl'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Turn words into{' '}
        <span className='gradient-text'>
          stunning art
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className='mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg'
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        Describe anything and watch our AI bring your imagination to life in
        seconds. No design skills needed.
      </motion.p>

      {/* CTA */}
      <motion.div
        className='mt-10 flex flex-wrap items-center justify-center gap-4'
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        <motion.button
          onClick={onClickHandler}
          className='shimmer-btn inline-flex items-center gap-3 rounded-full px-10 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/30'
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Generate Image Free
          <img className='h-5 w-5' src={assets.star_group} alt='' />
        </motion.button>

        <motion.button
          onClick={() => navigate('/buy')}
          className='rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white'
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          View Pricing
        </motion.button>
      </motion.div>

      {/* Sample images */}
      <motion.div
        className='mt-16 flex flex-wrap justify-center gap-3'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {Array(6).fill('').map((_, index) => (
          <motion.div
            key={index}
            className='overflow-hidden rounded-xl ring-1 ring-white/10 transition-all duration-300 hover:ring-violet-400/60 hover:shadow-lg hover:shadow-violet-500/20'
            whileHover={{ scale: 1.06, y: -4 }}
          >
            <img
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt=''
              width={80}
              className='max-sm:w-12 object-cover'
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className='mt-4 text-xs text-slate-500'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        Sample images generated with Imagify
      </motion.p>

      {/* Stats row */}
      <motion.div
        className='mt-12 flex flex-wrap justify-center gap-8'
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.7 }}
      >
        {[
          { value: '10K+', label: 'Images Created' },
          { value: '5K+', label: 'Happy Users' },
          { value: '99%', label: 'Satisfaction Rate' },
        ].map((stat) => (
          <div key={stat.label} className='text-center'>
            <p className='gradient-text text-2xl font-extrabold'>{stat.value}</p>
            <p className='mt-1 text-xs text-slate-500'>{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Header
