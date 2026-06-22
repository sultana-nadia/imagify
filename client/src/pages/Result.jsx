import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext.js'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PROMPT_CHIPS = [
  'Cyberpunk city at night',
  'Portrait of a warrior',
  'Abstract neon art',
  'Cinematic landscape',
  'Surreal dreamscape',
  'Futuristic robot',
]

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const { backendUrl, token, setShowLogin, setCredit } = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const prompt = input.trim()

    if (!token) { setShowLogin(true); return }
    if (!prompt) { toast.error('Please enter an image prompt'); return }

    setLoading(true)
    try {
      const { data } = await axios.post(
        backendUrl + '/api/image/generate-image',
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        setImage(data.resultImage)
        setIsImageLoaded(true)
        setCredit(data.creditBalance)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message
      const credits = error.response?.data?.creditBalance
      if (typeof credits === 'number') setCredit(credits)

      if (error.response?.status === 402) {
        toast.error(message); navigate('/buy')
      } else if (error.response?.status === 401) {
        setShowLogin(true); toast.error(message)
      } else {
        toast.error(message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='min-h-[calc(100vh-80px)] py-12'
    >
      {/* Page header */}
      <div className='mb-12 text-center'>
        <span className='mb-3 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-400'>
          Imagify Studio
        </span>
        <h1 className='text-3xl font-black text-white sm:text-5xl'>
          Generate your <span className='gradient-text'>image</span>
        </h1>
        <p className='mt-2 text-sm text-slate-500'>
          One credit per generation &nbsp;·&nbsp; Download instantly
        </p>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className='mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_390px]'
      >
        {/* Image display */}
        <div className='flex justify-center lg:justify-end'>
          <div className='relative w-full max-w-[500px]'>
            {/* Glow behind image */}
            <div className='absolute -inset-3 rounded-2xl bg-gradient-to-br from-violet-600/20 via-indigo-500/15 to-cyan-500/10 blur-xl opacity-70' />

            <div className='relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/50'>
              <div className='aspect-square w-full bg-[#14141f]'>
                <img
                  src={image}
                  className='h-full w-full object-cover transition-all duration-700'
                  alt='Generated result'
                />
              </div>

              {/* Progress bar */}
              <div className='absolute bottom-0 left-0 h-0.5 w-full bg-white/5'>
                <div
                  className={`h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 transition-all ${
                    loading ? 'w-full duration-[12s]' : 'w-0 duration-300'
                  }`}
                />
              </div>

              {/* Loading overlay */}
              {loading && (
                <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur-sm'>
                  <div className='relative'>
                    <div className='h-12 w-12 rounded-full border-2 border-violet-500/20 border-t-violet-400 animate-spin' />
                    <div className='absolute inset-1 h-10 w-10 rounded-full border-2 border-indigo-500/20 border-b-indigo-400 animate-spin' style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                  </div>
                  <p className='text-sm font-medium text-violet-300'>Generating your image…</p>
                  <p className='text-xs text-slate-500'>This usually takes 5–10 seconds</p>
                </div>
              )}

              {/* Image loaded overlay hint */}
              {isImageLoaded && !loading && (
                <div className='absolute top-3 right-3'>
                  <div className='flex items-center gap-1.5 rounded-full bg-green-500/20 px-2.5 py-1 backdrop-blur-sm ring-1 ring-green-500/30'>
                    <span className='h-1.5 w-1.5 rounded-full bg-green-400' />
                    <span className='text-[10px] font-medium text-green-300'>Ready</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls panel */}
        <div className='w-full'>
          <div className='gradient-border p-5'>

            <label className='mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400' htmlFor='prompt'>
              Describe your image
            </label>

            {/* Prompt chips */}
            <div className='mb-3 flex flex-wrap gap-1.5'>
              {PROMPT_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type='button'
                  onClick={() => setInput(chip)}
                  disabled={loading}
                  className='rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[11px] text-slate-400 transition-all hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300 disabled:opacity-40'
                >
                  {chip}
                </button>
              ))}
            </div>

            <div className='relative'>
              <textarea
                id='prompt'
                onChange={(e) => setInput(e.target.value)}
                value={input}
                rows={5}
                placeholder='Describe the image you want to create…'
                className='input-dark w-full resize-none rounded-xl px-4 py-3 text-sm'
                disabled={loading}
              />
              {/* Character counter */}
              <span className='absolute bottom-3 right-3 text-[10px] text-slate-700 select-none'>
                {input.length}/500
              </span>
            </div>

            <div className='mt-4 flex flex-col gap-3'>
              <motion.button
                type='submit'
                disabled={loading}
                className='shimmer-btn w-full rounded-xl py-3.5 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed'
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading
                  ? (
                    <span className='flex items-center justify-center gap-2'>
                      <svg className='h-4 w-4 animate-spin' viewBox='0 0 24 24' fill='none'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
                      </svg>
                      Generating…
                    </span>
                  )
                  : isImageLoaded ? 'Generate New Image' : 'Generate Image'}
              </motion.button>

              {isImageLoaded && (
                <a
                  href={image}
                  download='imagify-result.png'
                  className='flex items-center justify-center gap-2 w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white hover:border-white/20'
                >
                  <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
                  </svg>
                  Download Image
                </a>
              )}
            </div>

            {isImageLoaded && (
              <button
                type='button'
                onClick={() => { setIsImageLoaded(false); setInput('') }}
                className='mt-3 w-full text-sm text-slate-600 transition hover:text-violet-400'
              >
                ↩ Clear and write a new prompt
              </button>
            )}

            {/* Tips */}
            <div className='mt-5 rounded-xl bg-white/3 p-4 ring-1 ring-white/6'>
              <p className='mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-slate-500'>
                <svg className='h-3.5 w-3.5 text-violet-500' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z' />
                </svg>
                Prompt tips
              </p>
              <ul className='space-y-1.5 text-xs text-slate-600'>
                <li>• Be specific about style, lighting, and composition</li>
                <li>• Add adjectives like &ldquo;photorealistic&rdquo;, &ldquo;cinematic&rdquo;, &ldquo;4K&rdquo;</li>
                <li>• Include mood: &ldquo;golden hour&rdquo;, &ldquo;moody&rdquo;, &ldquo;vibrant&rdquo;</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default Result
