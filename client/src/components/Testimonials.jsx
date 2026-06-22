import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='my-28 flex flex-col items-center'
    >
      {/* Section label */}
      <span className='mb-4 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400'>
        Testimonials
      </span>

      <h2 className='mb-3 text-center text-3xl font-black text-white sm:text-5xl'>
        Loved by{' '}
        <span className='gradient-text'>creators worldwide</span>
      </h2>
      <p className='mb-14 text-center text-slate-500'>
        Here&apos;s what our users are saying
      </p>

      <div className='grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className='gradient-border card-glow group relative flex flex-col gap-4 overflow-hidden p-7 transition-all duration-300'
          >
            {/* Top accent gradient bar */}
            <div className='absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/0 via-violet-500/60 to-fuchsia-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

            {/* Large decorative quote mark */}
            <div className='pointer-events-none absolute -top-2 -right-2 select-none font-serif text-[7rem] leading-none text-violet-500/8 group-hover:text-violet-500/14 transition-colors duration-300'>
              &ldquo;
            </div>

            {/* Stars */}
            <div className='flex gap-1'>
              {Array(testimonial.stars).fill(null).map((_, i) => (
                <img key={i} src={assets.rating_star} alt='★' className='h-4 w-4' />
              ))}
              {Array(5 - testimonial.stars).fill(null).map((_, i) => (
                <span key={i} className='h-4 w-4 text-sm text-slate-700'>★</span>
              ))}
            </div>

            {/* Quote */}
            <p className='relative flex-1 text-sm leading-relaxed text-slate-400'>
              &ldquo;{testimonial.text}&rdquo;
            </p>

            {/* Author */}
            <div className='flex items-center gap-3 border-t border-white/6 pt-4'>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className='h-10 w-10 rounded-full ring-2 ring-violet-500/30 object-cover'
              />
              <div>
                <p className='text-sm font-semibold text-white'>{testimonial.name}</p>
                <p className='text-xs text-slate-500'>{testimonial.role}</p>
              </div>
              {/* Verified badge */}
              <div className='ml-auto flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5'>
                <svg className='h-3 w-3 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z' />
                </svg>
                <span className='text-[10px] font-medium text-green-400'>Verified</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials
