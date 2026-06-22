import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const features = [
  { icon: '⚡', label: 'Instant generation', detail: 'Results in under 10 seconds' },
  { icon: '🎨', label: 'High-quality output', detail: 'Crisp, detailed imagery' },
  { icon: '💾', label: 'One-click download', detail: 'PNG ready to use anywhere' },
  { icon: '🔒', label: 'Secure & private',   detail: 'Your prompts stay yours' },
]

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='my-28 px-0'
    >
      {/* Section label */}
      <div className='mb-4 flex justify-center'>
        <span className='rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-400'>
          About the Platform
        </span>
      </div>

      <h2 className='mb-3 text-center text-3xl font-black text-white sm:text-5xl'>
        Create AI images with{' '}
        <span className='gradient-text'>zero effort</span>
      </h2>
      <p className='mb-14 text-center text-slate-500'>
        Turn your imagination into visuals — instantly.
      </p>

      <div className='flex flex-col items-center justify-center gap-12 md:flex-row md:gap-16'>

        {/* Image with glow treatment */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className='relative shrink-0'
        >
          {/* Outer glow */}
          <div className='absolute -inset-3 rounded-3xl bg-gradient-to-br from-violet-600/30 via-indigo-500/20 to-cyan-500/15 blur-xl' />
          {/* Main image */}
          <div className='relative rounded-2xl ring-1 ring-white/10 overflow-hidden'>
            <img
              src={assets.sample_img_1}
              alt='AI generated sample'
              className='w-72 object-cover xl:w-96'
            />
            {/* AI badge overlay */}
            <div className='absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm ring-1 ring-white/10'>
              <span className='h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse' />
              <span className='text-xs font-medium text-white'>AI Generated</span>
            </div>
          </div>
          {/* Floating second image (decorative) */}
          <div className='absolute -bottom-4 -right-4 rounded-xl ring-1 ring-white/10 overflow-hidden shadow-2xl shadow-black/50 hidden xl:block' style={{animation:'float 5s ease-in-out 1s infinite'}}>
            <img
              src={assets.sample_img_2}
              alt=''
              className='w-28 object-cover'
            />
          </div>
        </motion.div>

        {/* Text + features */}
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
          <p className='mb-8 leading-relaxed text-slate-400'>
            Simply type a text prompt and our cutting-edge AI generates
            high-quality images in seconds — from product visuals to character
            designs, portraits, and even concepts that don&apos;t exist yet.
          </p>

          {/* Feature cards */}
          <div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2'>
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                className='flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] p-3 transition-all duration-200 hover:border-violet-500/20 hover:bg-violet-500/5'
              >
                <span className='text-lg shrink-0'>{f.icon}</span>
                <div>
                  <p className='text-sm font-medium text-white'>{f.label}</p>
                  <p className='text-xs text-slate-500'>{f.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Description
