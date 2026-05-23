import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext.js'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser, setCredit } = useContext(AppContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const isLogin = state === 'Login'

  const switchMode = (nextState) => {
    setState(nextState)
    setFormError('')
    toast.dismiss('auth-error')
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    setFormError('')
    toast.dismiss('auth-error')

    try {
      if (isLogin) {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email: email.trim(),
          password,
        })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          setCredit(data.credits)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          setFormError(data.message)
          toast.error(data.message, { toastId: 'auth-error' })
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name: name.trim(),
          email: email.trim(),
          password,
        })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          setCredit(data.credits)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          setFormError(data.message)
          toast.error(data.message, { toastId: 'auth-error' })
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message
      setFormError(message)
      toast.error(message, { toastId: 'auth-error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed inset-0 z-50 pointer-events-none'>
      {/* Backdrop */}
      <motion.div
        className='pointer-events-auto absolute inset-0 bg-black/60 backdrop-blur-sm'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setShowLogin(false)}
      />

      {/* Modal */}
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0, y: -16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className='pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] max-w-sm rounded-2xl bg-[#14141f] p-6 shadow-2xl ring-1 ring-white/10'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='mb-6 text-center'>
          <div className='mb-3 flex justify-center'>
            <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600'>
              <img src={assets.logo_icon} alt='' className='h-7 w-7 brightness-0 invert' />
            </div>
          </div>
          <h1 className='text-xl font-bold text-white'>
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className='mt-1 text-sm text-slate-500'>
            {isLogin
              ? 'Sign in to generate images and manage credits.'
              : 'Sign up and get 5 free credits instantly.'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className='mb-5 grid grid-cols-2 rounded-xl bg-white/5 p-1 text-sm font-medium'>
          <button
            type='button'
            onClick={() => switchMode('Login')}
            className={`rounded-lg py-2 transition ${
              isLogin
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Login
          </button>
          <button
            type='button'
            onClick={() => switchMode('Sign Up')}
            className={`rounded-lg py-2 transition ${
              !isLogin
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Sign up
          </button>
        </div>

        {/* Name field (signup only) */}
        {!isLogin && (
          <div className='mt-4 flex items-center gap-3 rounded-xl px-4 py-3 input-dark'>
            <img src={assets.profile_icon} alt='' width={18} className='brightness-0 invert opacity-50 shrink-0' />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600'
              type='text'
              placeholder='Full Name'
              required={!isLogin}
              disabled={loading}
            />
          </div>
        )}

        {/* Email */}
        <div className='mt-3 flex items-center gap-3 rounded-xl px-4 py-3 input-dark'>
          <img src={assets.email_icon} alt='' width={16} className='brightness-0 invert opacity-50 shrink-0' />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600'
            type='email'
            placeholder='Email address'
            required
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className='mt-3 flex items-center gap-3 rounded-xl px-4 py-3 input-dark'>
          <img src={assets.lock_icon} alt='' width={13} className='brightness-0 invert opacity-50 shrink-0' />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600'
            type='password'
            placeholder='Password'
            required
            disabled={loading}
          />
        </div>

        {/* Error */}
        {formError && (
          <p className='mt-4 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-400 ring-1 ring-red-500/20'>
            {formError}
          </p>
        )}

        {/* Submit */}
        <button
          type='submit'
          disabled={loading}
          className='shimmer-btn mt-5 w-full rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Please wait…' : isLogin ? 'Sign in' : 'Create account'}
        </button>

        {/* Switch link */}
        <p className='mt-4 text-center text-sm text-slate-500'>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type='button'
            className='font-medium text-violet-400 hover:text-violet-300 transition'
            onClick={() => switchMode(isLogin ? 'Sign Up' : 'Login')}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>

        {/* Close button */}
        <button
          type='button'
          onClick={() => setShowLogin(false)}
          className='absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10'
          aria-label='Close'
        >
          <img src={assets.cross_icon} className='h-3 w-3 brightness-0 invert opacity-60' alt='' />
        </button>
      </motion.form>
    </div>
  )
}

export default Login
