import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='my-24 flex flex-col items-center'
    >
      {/* Section label */}
      <span className='mb-4 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400'>
        Testimonials
      </span>

      <h2 className='mb-3 text-center text-3xl font-bold text-white sm:text-4xl'>
        Loved by{' '}
        <span className='gradient-text'>creators worldwide</span>
      </h2>
      <p className='mb-12 text-center text-slate-500'>Here&apos;s what our users are saying</p>

      <div className='grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.02 }}
            className='gradient-border flex cursor-pointer flex-col gap-4 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10'
          >
            {/* Stars */}
            <div className='flex gap-1'>
              {Array(testimonial.stars).fill(null).map((_, i) => (
                <img key={i} src={assets.rating_star} alt='★' className='h-4 w-4' />
              ))}
              {Array(5 - testimonial.stars).fill(null).map((_, i) => (
                <span key={i} className='h-4 w-4 text-xs text-slate-600'>★</span>
              ))}
            </div>

            {/* Quote */}
            <p className='flex-1 text-sm leading-relaxed text-slate-400'>
              &ldquo;{testimonial.text}&rdquo;
            </p>

            {/* Author */}
            <div className='flex items-center gap-3 border-t border-white/5 pt-4'>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className='h-10 w-10 rounded-full ring-2 ring-violet-500/30 object-cover'
              />
              <div>
                <p className='text-sm font-semibold text-white'>{testimonial.name}</p>
                <p className='text-xs text-slate-500'>{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials
