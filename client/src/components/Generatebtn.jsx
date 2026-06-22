import { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext.js'
import { useNavigate } from 'react-router-dom'

const Generatebtn = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) navigate('/result')
    else setShowLogin(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='relative my-28 overflow-hidden rounded-3xl'
    >
      {/* Layered background */}
      <div className='absolute inset-0 bg-gradient-to-br from-violet-950/90 via-[#0e0a1e]/80 to-indigo-950/90' />
      <div className='absolute inset-0' style={{
        backgroundImage:
          'radial-gradient(ellipse at 25% 50%, rgba(139,92,246,0.2) 0%, transparent 55%), radial-gradient(ellipse at 75% 50%, rgba(99,102,241,0.15) 0%, transparent 55%)',
      }} />
      {/* Subtle grid overlay */}
      <div className='absolute inset-0 grid-bg opacity-40' />
      {/* Border */}
      <div className='absolute inset-0 rounded-3xl ring-1 ring-violet-500/15' />
      {/* Top glow */}
      <div className='absolute left-1/2 -top-20 h-40 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl' />

      {/* Content */}
      <div className='relative z-10 px-8 py-24 text-center'>

        <motion.p
          className='mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to create?
        </motion.p>

        <motion.h2
          className='mx-auto mb-5 max-w-2xl text-3xl font-black text-white sm:text-5xl lg:text-6xl'
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          viewport={{ once: true }}
        >
          See the magic —{' '}
          <span className='gradient-text'>try it free</span> today
        </motion.h2>

        <motion.p
          className='mb-8 text-slate-400'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          No credit card required. Get 5 free credits on signup.
        </motion.p>

        {/* Trust items */}
        <motion.div
          className='mb-10 flex flex-wrap justify-center gap-5 text-xs text-slate-500'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          {['Instant results', 'No credit card', 'Cancel anytime', '5 free credits'].map((t) => (
            <span key={t} className='flex items-center gap-1.5'>
              <svg className='h-3 w-3 text-violet-500' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z' />
              </svg>
              {t}
            </span>
          ))}
        </motion.div>

        <motion.button
          onClick={onClickHandler}
          className='shimmer-btn inline-flex items-center gap-3 rounded-full px-12 py-4 text-base font-bold text-white shadow-2xl shadow-violet-500/30'
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
        >
          Generate Images Now
          <img className='h-5 w-5' src={assets.star_group} alt='' />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Generatebtn
