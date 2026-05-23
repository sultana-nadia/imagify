import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-20 border-t border-white/5 py-10'>
      <div className='flex flex-col items-center gap-8 sm:flex-row sm:justify-between'>

        {/* Logo + tagline */}
        <div>
          <img src={assets.logo} alt='Imagify' width={120} className='brightness-0 invert mb-2' />
          <p className='text-xs text-slate-600'>AI-powered image generation</p>
        </div>

        {/* Links */}
        <div className='flex gap-6 text-sm text-slate-500'>
          <Link to='/' className='transition hover:text-slate-300'>Home</Link>
          <Link to='/buy' className='transition hover:text-slate-300'>Pricing</Link>
          <Link to='/result' className='transition hover:text-slate-300'>Generate</Link>
        </div>

        {/* Social icons */}
        <div className='flex items-center gap-3'>
          {[assets.facebook_icon, assets.twitter_icon, assets.instagram_icon].map((icon, i) => (
            <div
              key={i}
              className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:border-violet-400/50 hover:bg-violet-500/10'
            >
              <img src={icon} alt='' width={16} className='brightness-0 invert opacity-60' />
            </div>
          ))}
        </div>
      </div>

      <p className='mt-8 text-center text-xs text-slate-700'>
        © {new Date().getFullYear()} Imagify. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
