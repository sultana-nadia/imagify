import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='my-24 flex flex-col items-center'
    >
      {/* Section label */}
      <span className='mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400'>
        How It Works
      </span>

      <h2 className='mb-3 text-center text-3xl font-bold text-white sm:text-4xl'>
        Three steps to{' '}
        <span className='gradient-text'>amazing visuals</span>
      </h2>
      <p className='mb-12 text-center text-slate-500'>
        From idea to image in under 10 seconds
      </p>

      <div className='w-full max-w-3xl space-y-4'>
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.015, x: 4 }}
            className='gradient-border flex cursor-pointer items-center gap-5 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10'
          >
            {/* Step number */}
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white shadow-md shadow-violet-500/30'>
              {index + 1}
            </div>

            {/* Icon */}
            <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5'>
              <img src={item.icon} alt='' width={28} className='brightness-0 invert opacity-80' />
            </div>

            {/* Text */}
            <div>
              <h3 className='mb-1 text-base font-semibold text-white'>{item.title}</h3>
              <p className='text-sm leading-relaxed text-slate-400'>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Steps
