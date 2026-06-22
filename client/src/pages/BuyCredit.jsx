import { useContext, useState } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext.js'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const planFeatures = {
  Basic:    ['100 AI image generations', 'Standard resolution output', 'Instant download (PNG)', 'Email support'],
  Advanced: ['500 AI image generations', 'High-resolution output',    'Priority processing',    'Priority support'],
  Business: ['5000 AI image generations','Ultra-high resolution',     'Fastest processing',     'Dedicated support'],
}

const planColors = {
  Basic:    { badge: 'text-slate-400',  accent: 'from-slate-600/20 to-slate-700/20', ring: 'ring-white/10' },
  Advanced: { badge: 'text-violet-300', accent: 'from-violet-600/25 to-indigo-600/25', ring: 'ring-violet-500/30' },
  Business: { badge: 'text-amber-400',  accent: 'from-amber-600/15 to-orange-600/15', ring: 'ring-amber-500/20' },
}

const BuyCredit = () => {
  const { user, token, backendUrl, setCredit, setShowLogin } = useContext(AppContext)
  const [loadingPlan, setLoadingPlan] = useState('')

  const onPurchaseHandler = async (planId) => {
    if (!user || !token) { setShowLogin(true); return }
    setLoadingPlan(planId)
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/add-credits',
        { planId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        setCredit(data.credits)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoadingPlan('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className='min-h-[80vh] py-16'
    >
      {/* Header */}
      <div className='mb-16 text-center'>
        <span className='mb-4 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-400'>
          Pricing
        </span>
        <h1 className='mb-4 text-4xl font-black text-white sm:text-6xl'>
          Simple, transparent{' '}
          <span className='gradient-text'>pricing</span>
        </h1>
        <p className='text-slate-500'>
          Choose the plan that fits your creative needs. Credits never expire.
        </p>
      </div>

      {/* Plan cards */}
      <div className='mx-auto flex max-w-5xl flex-wrap justify-center gap-6'>
        {plans.map((item, index) => {
          const isPopular = item.id === 'Advanced'
          const features = planFeatures[item.id] || []
          const colors = planColors[item.id]
          const perCredit = (item.price / item.credits * 100).toFixed(1)

          const CardInner = () => (
            <div className={`relative flex h-full flex-col rounded-[19px] p-7 transition-all duration-300 bg-gradient-to-br ${colors.accent} ${isPopular ? 'bg-[#10101e]' : 'bg-[#0e0e1a]'}`}>

              {/* Popular badge */}
              {isPopular && (
                <div className='absolute -top-3.5 left-1/2 -translate-x-1/2 z-10'>
                  <span className='shimmer-btn rounded-full px-4 py-1 text-xs font-bold text-white shadow-lg shadow-violet-500/30'>
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className='mb-6 flex items-center gap-3'>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${isPopular ? 'bg-violet-500 shadow-md shadow-violet-500/30' : 'bg-white/8'}`}>
                  <img src={assets.logo_icon} alt='' width={22} className='brightness-0 invert' />
                </div>
                <div>
                  <p className='font-bold text-white'>{item.id}</p>
                  <p className='text-xs text-slate-500'>{item.desc}</p>
                </div>
                {isPopular && (
                  <div className='ml-auto rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-400'>
                    Best value
                  </div>
                )}
              </div>

              {/* Price */}
              <div className='mb-2'>
                <div className='flex items-end gap-1'>
                  <span className={`text-5xl font-extrabold ${isPopular ? 'gradient-text' : 'text-white'}`}>
                    ${item.price}
                  </span>
                  <span className='mb-2 text-sm text-slate-500'>one-time</span>
                </div>
                <p className='mt-1 text-sm text-slate-400'>
                  <span className='font-semibold text-white'>{item.credits.toLocaleString()}</span> image credits
                </p>
              </div>

              {/* Per-credit cost */}
              <div className='mb-6'>
                <span className={`text-xs font-medium ${colors.badge}`}>
                  ≈ ${perCredit}¢ per image
                </span>
              </div>

              {/* Divider */}
              <div className='mb-5 h-px w-full bg-white/6' />

              {/* Features */}
              <ul className='mb-8 flex-1 space-y-3'>
                {features.map((feat) => (
                  <li key={feat} className='flex items-start gap-2.5 text-sm text-slate-400'>
                    <span className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${isPopular ? 'bg-violet-500/25 text-violet-300' : 'bg-white/8 text-slate-500'}`}>
                      ✓
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                onClick={() => onPurchaseHandler(item.id)}
                disabled={loadingPlan === item.id}
                className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
                  isPopular
                    ? 'shimmer-btn text-white shadow-lg shadow-violet-500/25'
                    : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20'
                }`}
                whileHover={{ scale: loadingPlan === item.id ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loadingPlan === item.id
                  ? (
                    <span className='flex items-center justify-center gap-2'>
                      <svg className='h-4 w-4 animate-spin' viewBox='0 0 24 24' fill='none'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
                      </svg>
                      Processing…
                    </span>
                  )
                  : user ? `Get ${item.id}` : 'Get Started'}
              </motion.button>
            </div>
          )

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className='w-72 flex-shrink-0'
            >
              {isPopular ? (
                /* Animated gradient border for popular plan */
                <div
                  className='rounded-[20px] p-[1px] h-full shadow-2xl shadow-violet-500/20'
                  style={{
                    background: 'linear-gradient(90deg, #7c3aed, #6366f1, #67e8f9, #7c3aed)',
                    backgroundSize: '300% auto',
                    animation: 'aurora 4s linear infinite',
                  }}
                >
                  <CardInner />
                </div>
              ) : (
                <div className={`rounded-[20px] ring-1 ${colors.ring} h-full`}>
                  <CardInner />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className='mt-14 flex flex-wrap justify-center gap-6 text-xs text-slate-600'
      >
        {[
          { icon: '🔒', text: 'Secure checkout' },
          { icon: '♾️', text: 'Credits never expire' },
          { icon: '⚡', text: 'Instant activation' },
          { icon: '🚫', text: 'No subscription' },
        ].map((item) => (
          <span key={item.text} className='flex items-center gap-1.5'>
            <span>{item.icon}</span>
            {item.text}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default BuyCredit
