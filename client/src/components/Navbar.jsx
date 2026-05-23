import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext.js'

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <header className='sticky top-0 z-40 border-b border-white/5 bg-[#09090f]/80 backdrop-blur-xl'>
      <div className='mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-4 sm:px-10 md:px-14 lg:px-28'>

        {/* Logo */}
        <Link to='/' className='shrink-0'>
          <img
            src={assets.logo}
            alt='Imagify'
            className='w-24 brightness-0 invert sm:w-28 lg:w-32'
          />
        </Link>

        {/* Right side */}
        <div>
          {user ? (
            <div className='flex min-w-0 items-center gap-3'>

              {/* Credits pill */}
              <button
                onClick={() => navigate('/buy')}
                className='flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition-all duration-200 hover:border-violet-400/50 hover:bg-violet-500/20'
              >
                <img className='w-4' src={assets.credit_star} alt='' />
                <span className='max-[400px]:hidden'>Credits&nbsp;</span>
                <span className='font-semibold'>{credit ?? 0}</span>
              </button>

              {/* Greeting */}
              <span className='hidden truncate text-sm text-slate-400 md:block'>
                Hi, {user.name}
              </span>

              {/* Avatar + dropdown */}
              <div className='relative group'>
                <img
                  src={assets.profile_icon}
                  className='h-9 w-9 cursor-pointer rounded-full ring-2 ring-violet-500/30 transition group-hover:ring-violet-400/60'
                  alt=''
                />
                <div className='absolute right-0 top-full z-50 hidden pt-2 group-hover:block'>
                  <ul className='glass-light rounded-xl py-1 shadow-xl shadow-black/40'>
                    <li
                      onClick={logout}
                      className='cursor-pointer whitespace-nowrap px-5 py-2 text-sm text-slate-300 transition hover:text-white'
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
                className='shimmer-btn rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300'
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
