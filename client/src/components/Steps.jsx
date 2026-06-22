import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='my-28 flex flex-col items-center'
    >
      {/* Section label */}
      <span className='mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400'>
        How It Works
      </span>

      <h2 className='mb-3 text-center text-3xl font-black text-white sm:text-5xl'>
        Three steps to{' '}
        <span className='gradient-text'>amazing visuals</span>
      </h2>
      <p className='mb-14 text-center text-slate-500'>
        From idea to image in under 10 seconds
      </p>

      {/* Steps grid with arrow connectors */}
      <div className='flex w-full max-w-4xl flex-col items-stretch gap-4 sm:flex-row sm:items-start sm:gap-0'>
        {stepsData.map((item, index) => (
          <div key={index} className='flex flex-1 flex-col sm:flex-row sm:items-start'>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.03 }}
              className='gradient-border card-glow relative flex flex-1 flex-col items-center overflow-hidden p-8 text-center transition-all duration-300'
            >
              {/* Giant faded step number (background) */}
              <div className='pointer-events-none absolute -top-3 -right-1 select-none font-bold text-[6rem] leading-none text-white/[0.035]'>
                {index + 1}
              </div>

              {/* Icon container with number badge */}
              <div className='relative mb-5'>
                <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/25 to-indigo-600/25 ring-1 ring-violet-500/30 transition-all duration-300 group-hover:from-violet-600/40 group-hover:to-indigo-600/40'>
                  <img src={item.icon} alt='' width={30} className='brightness-0 invert opacity-85' />
                </div>
                <div className='absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-[11px] font-bold text-white shadow-md shadow-violet-500/40'>
                  {index + 1}
                </div>
              </div>

              <h3 className='mb-2 text-base font-semibold text-white'>{item.title}</h3>
              <p className='text-sm leading-relaxed text-slate-400'>{item.description}</p>
            </motion.div>

            {/* Arrow connector between steps (desktop only) */}
            {index < stepsData.length - 1 && (
              <div className='hidden sm:flex items-center justify-center self-center px-2 text-slate-700'>
                <svg className='h-5 w-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                </svg>
              </div>
            )}

          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Steps
