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
      className='relative my-24 overflow-hidden rounded-3xl px-8 py-20 text-center'
    >
      {/* Background glow */}
      <div className='pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-900/30 via-indigo-900/20 to-cyan-900/10' />
      <div className='pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10' />
      <div className='pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl' />

      <div className='relative z-10'>
        <motion.p
          className='mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to create?
        </motion.p>

        <h2 className='mx-auto mb-4 max-w-2xl text-3xl font-extrabold text-white sm:text-5xl'>
          See the magic —{' '}
          <span className='gradient-text'>try it free</span> today
        </h2>

        <p className='mb-10 text-slate-400'>
          No credit card required. Get 5 free credits on signup.
        </p>

        <motion.button
          onClick={onClickHandler}
          className='shimmer-btn inline-flex items-center gap-3 rounded-full px-12 py-4 text-base font-semibold text-white shadow-xl shadow-violet-500/30'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Generate Images Now
          <img className='h-5 w-5' src={assets.star_group} alt='' />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Generatebtn
