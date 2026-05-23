import { useContext, useState } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext.js'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const planFeatures = {
  Basic: ['100 AI image generations', 'Standard resolution', 'Download all images', 'Email support'],
  Advanced: ['500 AI image generations', 'High resolution output', 'Priority processing', 'Priority support'],
  Business: ['5000 AI image generations', 'Ultra-high resolution', 'Fastest processing', 'Dedicated support'],
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
        <h1 className='mb-4 text-4xl font-extrabold text-white sm:text-5xl'>
          Simple, transparent{' '}
          <span className='gradient-text'>pricing</span>
        </h1>
        <p className='text-slate-500'>
          Choose the plan that fits your creative needs. No hidden fees.
        </p>
      </div>

      {/* Plans */}
      <div className='mx-auto flex max-w-5xl flex-wrap justify-center gap-6'>
        {plans.map((item, index) => {
          const isPopular = item.id === 'Advanced'
          const features = planFeatures[item.id] || []

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`relative flex w-72 flex-col rounded-2xl p-7 transition-all duration-300 ${
                isPopular
                  ? 'bg-gradient-to-br from-violet-600/20 via-indigo-600/15 to-violet-600/20 ring-1 ring-violet-500/40 shadow-xl shadow-violet-500/20'
                  : 'gradient-border hover:shadow-lg hover:shadow-violet-500/10'
              }`}
            >
              {/* Popular badge */}
              {isPopular && (
                <div className='absolute -top-3.5 left-1/2 -translate-x-1/2'>
                  <span className='shimmer-btn rounded-full px-4 py-1 text-xs font-bold text-white shadow-md'>
                    Most Popular
                  </span>
                </div>
              )}

              {/* Logo + plan name */}
              <div className='mb-5 flex items-center gap-3'>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isPopular ? 'bg-violet-500' : 'bg-white/8'}`}>
                  <img src={assets.logo_icon} alt='' width={22} className='brightness-0 invert' />
                </div>
                <div>
                  <p className='font-bold text-white'>{item.id}</p>
                  <p className='text-xs text-slate-500'>{item.desc}</p>
                </div>
              </div>

              {/* Price */}
              <div className='mb-6'>
                <div className='flex items-end gap-1'>
                  <span className={`text-5xl font-extrabold ${isPopular ? 'gradient-text' : 'text-white'}`}>
                    ${item.price}
                  </span>
                  <span className='mb-2 text-sm text-slate-500'>one-time</span>
                </div>
                <p className='mt-1 text-sm text-slate-400'>
                  <span className='font-semibold text-white'>{item.credits}</span> image credits
                </p>
              </div>

              {/* Features */}
              <ul className='mb-8 flex-1 space-y-3'>
                {features.map((feat) => (
                  <li key={feat} className='flex items-center gap-2.5 text-sm text-slate-400'>
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${isPopular ? 'bg-violet-500/30 text-violet-300' : 'bg-white/8 text-slate-400'}`}>
                      ✓
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => onPurchaseHandler(item.id)}
                disabled={loadingPlan === item.id}
                className={`w-full rounded-xl py-3 text-sm font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
                  isPopular
                    ? 'shimmer-btn text-white shadow-lg shadow-violet-500/30'
                    : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {loadingPlan === item.id
                  ? 'Processing…'
                  : user
                  ? `Get ${item.id}`
                  : 'Get Started'}
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* Trust note */}
      <p className='mt-12 text-center text-sm text-slate-600'>
        Secure checkout · No subscription · Credits never expire
      </p>
    </motion.div>
  )
}

export default BuyCredit
