import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='my-24 px-0'
    >
      {/* Section label */}
      <div className='mb-4 flex justify-center'>
        <span className='rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-400'>
          About the Platform
        </span>
      </div>

      <h2 className='mb-3 text-center text-3xl font-bold text-white sm:text-4xl'>
        Create AI images with{' '}
        <span className='gradient-text'>zero effort</span>
      </h2>
      <p className='mb-12 text-center text-slate-500'>Turn your imagination into visuals — instantly.</p>

      <div className='flex flex-col items-center gap-10 md:flex-row md:gap-16'>

        {/* Image */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className='relative shrink-0'
        >
          <div className='absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-600/40 via-indigo-500/30 to-cyan-500/20 blur-sm' />
          <img
            src={assets.sample_img_1}
            alt='AI generated sample'
            className='relative w-72 rounded-2xl object-cover ring-1 ring-white/10 xl:w-96'
          />
        </motion.div>

        {/* Text */}
        <div className='max-w-xl'>
          <h3 className='mb-5 text-2xl font-semibold leading-snug text-white sm:text-3xl'>
            Introducing the AI-Powered{' '}
            <span className='gradient-text'>Text to Image Generator</span>
          </h3>
          <p className='mb-4 leading-relaxed text-slate-400'>
            Easily bring your ideas to life with our AI image generator. Whether
            you need stunning visuals or unique imagery, our tool transforms your
            text into eye-catching images in just a few clicks. Imagine it,
            describe it, and watch it come to life instantly.
          </p>
          <p className='leading-relaxed text-slate-400'>
            Simply type a text prompt and our cutting-edge AI generates
            high-quality images in seconds — from product visuals to character
            designs, portraits, and even concepts that don&apos;t exist yet can be
            visualised effortlessly.
          </p>

          <div className='mt-8 grid grid-cols-2 gap-4'>
            {[
              { icon: '⚡', label: 'Instant generation' },
              { icon: '🎨', label: 'High-quality output' },
              { icon: '💾', label: 'One-click download' },
              { icon: '🔒', label: 'Secure & private' },
            ].map((f) => (
              <div key={f.label} className='flex items-center gap-2 text-sm text-slate-400'>
                <span className='text-base'>{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Description
