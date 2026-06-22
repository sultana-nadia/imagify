import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-20 pb-8'>
      {/* Gradient divider */}
      <div className='mb-10 h-px w-full bg-gradient-to-r from-transparent via-violet-500/30 to-transparent' />

      <div className='flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between'>

        {/* Logo + tagline */}
        <div className='max-w-xs'>
          <img src={assets.logo} alt='Imagify' width={120} className='brightness-0 invert mb-3' />
          <p className='text-sm text-slate-500 leading-relaxed'>
            AI-powered text to image generation. Turn your ideas into stunning visuals in seconds.
          </p>
          {/* Social icons */}
          <div className='mt-5 flex items-center gap-2.5'>
            {[assets.facebook_icon, assets.twitter_icon, assets.instagram_icon].map((icon, i) => (
              <div
                key={i}
                className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/8 bg-white/4 transition-all duration-200 hover:border-violet-400/50 hover:bg-violet-500/12 hover:shadow-md hover:shadow-violet-500/15'
              >
                <img src={icon} alt='' width={15} className='brightness-0 invert opacity-55' />
              </div>
            ))}
          </div>
        </div>

        {/* Links columns */}
        <div className='flex gap-16 sm:gap-20'>
          <div>
            <p className='mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500'>Product</p>
            <ul className='space-y-3 text-sm text-slate-500'>
              <li><Link to='/'       className='transition hover:text-slate-200'>Home</Link></li>
              <li><Link to='/result' className='transition hover:text-slate-200'>Generate</Link></li>
              <li><Link to='/buy'    className='transition hover:text-slate-200'>Pricing</Link></li>
            </ul>
          </div>
          <div>
            <p className='mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500'>Legal</p>
            <ul className='space-y-3 text-sm text-slate-500'>
              <li><span className='cursor-default transition hover:text-slate-200'>Privacy</span></li>
              <li><span className='cursor-default transition hover:text-slate-200'>Terms</span></li>
              <li><span className='cursor-default transition hover:text-slate-200'>Contact</span></li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className='mt-10 flex flex-col items-center gap-3 border-t border-white/5 pt-8 sm:flex-row sm:justify-between'>
        <p className='text-xs text-slate-700'>
          © {new Date().getFullYear()} Imagify. All rights reserved.
        </p>
        <p className='text-xs text-slate-700'>
          Built with AI · Powered by ClipDrop
        </p>
      </div>
    </footer>
  )
}

export default Footer
