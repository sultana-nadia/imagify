import { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext.js'
import { useNavigate } from 'react-router-dom'

const sampleImages = [
  { src: assets.sample_img_1, h: 'h-28 sm:h-36', rotate: '-rotate-3', delay: 0 },
  { src: assets.sample_img_2, h: 'h-24 sm:h-28', rotate: 'rotate-2',  delay: 0.6 },
  { src: assets.sample_img_1, h: 'h-32 sm:h-44', rotate: '-rotate-1', delay: 1.2 },
  { src: assets.sample_img_2, h: 'h-28 sm:h-36', rotate: 'rotate-3',  delay: 1.8 },
  { src: assets.sample_img_1, h: 'h-24 sm:h-32', rotate: 'rotate-1',  delay: 2.4 },
  { src: assets.sample_img_2, h: 'h-20 sm:h-28', rotate: '-rotate-2', delay: 3 },
]

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) navigate('/result')
    else setShowLogin(true)
  }

  return (
    <motion.div
      className='relative flex flex-col items-center justify-center pt-20 pb-16 text-center overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* Decorative concentric rings behind hero */}
      <div className='pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2'>
        <div className='h-[700px] w-[700px] rounded-full border border-violet-500/[0.04]' />
        <div className='absolute inset-0 m-auto h-[500px] w-[500px] rounded-full border border-violet-500/[0.06]' />
        <div className='absolute inset-0 m-auto h-[300px] w-[300px] rounded-full border border-violet-500/[0.08]' />
      </div>

      {/* Social proof badge */}
      <motion.div
        className='mb-8 flex flex-wrap items-center justify-center gap-3'
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <div className='flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-2 text-xs'>
          <span className='text-amber-400 tracking-tight'>★★★★★</span>
          <span className='text-slate-400'>
            Trusted by <span className='font-semibold text-white'>5,000+</span> creators
          </span>
        </div>
        <div className='flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/8 px-3 py-1.5 text-xs text-green-400'>
          <span className='h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse' />
          Live now
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        className='mx-auto max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[5.5rem]'
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Turn words into{' '}
        <br className='hidden sm:block' />
        <span className='gradient-text'>stunning visuals</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className='mt-6 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg'
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        Describe anything and watch our AI bring your imagination to life in
        seconds.{' '}
        <span className='text-slate-200'>No design skills needed.</span>
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        className='mt-10 flex flex-wrap items-center justify-center gap-4'
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <motion.button
          onClick={onClickHandler}
          className='shimmer-btn inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-sm font-bold text-white shadow-xl shadow-violet-500/25'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Start Creating Free
          <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M13 7l5 5m0 0l-5 5m5-5H6' />
          </svg>
        </motion.button>

        <motion.button
          onClick={() => navigate('/buy')}
          className='group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:border-white/20'
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          View Pricing
          <svg className='h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
          </svg>
        </motion.button>
      </motion.div>

      {/* Trust micro-copy */}
      <motion.p
        className='mt-3.5 text-xs text-slate-600 tracking-wide'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        No credit card required &nbsp;·&nbsp; 5 free credits &nbsp;·&nbsp; Results in seconds
      </motion.p>

      {/* Floating staggered image gallery */}
      <motion.div
        className='mt-16 flex items-end justify-center gap-2.5 sm:gap-4'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        {sampleImages.map((item, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
            className={`overflow-hidden rounded-xl ring-1 ring-white/10 transition-all duration-300 hover:ring-violet-400/60 hover:shadow-lg hover:shadow-violet-500/25 cursor-pointer ${item.rotate}`}
            whileHover={{ scale: 1.1, rotate: 0, y: -10 }}
          >
            <img
              src={item.src}
              alt=''
              className={`${item.h} w-auto object-cover`}
              style={{ minWidth: '60px' }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className='mt-4 text-xs text-slate-600'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        Sample images generated with Imagify AI
      </motion.p>

      {/* Stats */}
      <motion.div
        className='mt-14 flex flex-wrap justify-center gap-12'
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
      >
        {[
          { value: '10K+', label: 'Images Created' },
          { value: '5K+',  label: 'Happy Users' },
          { value: '99%',  label: 'Satisfaction' },
        ].map((stat) => (
          <div key={stat.label} className='text-center'>
            <p className='gradient-text text-3xl font-black'>{stat.value}</p>
            <p className='mt-1 text-xs text-slate-500 uppercase tracking-wider'>{stat.label}</p>
          </div>
        ))}
      </motion.div>

    </motion.div>
  )
}

export default Header
