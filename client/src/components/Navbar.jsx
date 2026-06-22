import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext.js'

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext)
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[0.07] shadow-2xl shadow-black/40'
          : 'border-b border-white/[0.04]'
      }`}
      style={{ background: 'rgba(5,5,8,0.88)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
    >
      <div className='mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-3.5 sm:px-10 md:px-14 lg:px-28'>

        {/* Logo */}
        <Link to='/' className='shrink-0 group'>
          <img
            src={assets.logo}
            alt='Imagify'
            className='w-24 brightness-0 invert sm:w-28 lg:w-32 transition-opacity duration-200 group-hover:opacity-80'
          />
        </Link>

        {/* Right side */}
        <div>
          {user ? (
            <div className='flex min-w-0 items-center gap-3'>

              {/* Credits pill */}
              <button
                onClick={() => navigate('/buy')}
                className='group flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition-all duration-200 hover:border-violet-400/60 hover:bg-violet-500/20 hover:shadow-md hover:shadow-violet-500/20'
              >
                <img className='w-4 transition-transform duration-300 group-hover:rotate-12' src={assets.credit_star} alt='' />
                <span className='max-[400px]:hidden'>Credits&nbsp;</span>
                <span className='font-bold tabular-nums'>{credit ?? 0}</span>
              </button>

              {/* Greeting */}
              <span className='hidden truncate text-sm text-slate-400 md:block'>
                Hi, <span className='text-slate-300 font-medium'>{user.name}</span>
              </span>

              {/* Avatar + dropdown */}
              <div className='relative group'>
                <div className='relative h-9 w-9 cursor-pointer rounded-full ring-2 ring-violet-500/30 transition-all duration-200 group-hover:ring-violet-400/70 group-hover:ring-offset-1 group-hover:ring-offset-[#09090f] overflow-hidden'>
                  <img src={assets.profile_icon} className='h-full w-full object-cover' alt='' />
                </div>
                <div className='absolute right-0 top-full z-50 hidden pt-2 group-hover:block'>
                  <ul className='glass-light min-w-[120px] rounded-xl py-1.5 shadow-2xl shadow-black/50 ring-1 ring-violet-500/10'>
                    <li
                      onClick={logout}
                      className='cursor-pointer whitespace-nowrap px-5 py-2.5 text-sm text-slate-300 transition hover:text-white hover:bg-white/5 rounded-lg mx-1'
                    >
                      Sign out
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex items-center gap-4'>
              <button
                onClick={() => navigate('/buy')}
                className='hidden text-sm text-slate-400 transition hover:text-white sm:block'
              >
                Pricing
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className='shimmer-btn rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/20'
              >
                Get Started
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}

export default Navbar
