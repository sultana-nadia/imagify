import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext.js'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

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
      <div className='mb-10 text-center'>
        <span className='mb-3 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-400'>
          Imagify Studio
        </span>
        <h1 className='text-3xl font-extrabold text-white sm:text-4xl'>
          Generate your image
        </h1>
        <p className='mt-2 text-sm text-slate-500'>
          One credit per generation · Download instantly
        </p>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className='mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_380px]'
      >
        {/* Image display */}
        <div className='flex justify-center lg:justify-end'>
          <div className='relative w-full max-w-[500px]'>
            {/* Glow behind image */}
            <div className='absolute -inset-2 rounded-2xl bg-gradient-to-br from-violet-600/20 via-indigo-500/15 to-cyan-500/10 blur-xl opacity-70' />

            <div className='relative overflow-hidden rounded-2xl ring-1 ring-white/10'>
              <div className='aspect-square w-full bg-[#14141f]'>
                <img
                  src={image}
                  className='h-full w-full object-cover transition-all duration-500'
                  alt='Generated result'
                />
              </div>

              {/* Loading progress bar */}
              <div className='absolute bottom-0 left-0 h-0.5 w-full bg-white/5'>
                <div
                  className={`h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all ${
                    loading ? 'w-full duration-[10s]' : 'w-0 duration-300'
                  }`}
                />
              </div>

              {/* Loading overlay */}
              {loading && (
                <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/50 backdrop-blur-sm'>
                  <div className='h-10 w-10 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin' />
                  <p className='text-sm font-medium text-violet-300'>Generating…</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className='w-full'>
          <div className='gradient-border p-5'>
            <label className='mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400' htmlFor='prompt'>
              Your Prompt
            </label>
            <textarea
              id='prompt'
              onChange={(e) => setInput(e.target.value)}
              value={input}
              rows={5}
              placeholder='Describe the image you want to create…'
              className='input-dark w-full resize-none rounded-xl px-4 py-3 text-sm'
              disabled={loading}
            />

            <div className='mt-4 flex flex-col gap-3'>
              <motion.button
                type='submit'
                disabled={loading}
                className='shimmer-btn w-full rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed'
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? 'Generating…' : isImageLoaded ? 'Generate New Image' : 'Generate Image'}
              </motion.button>

              {isImageLoaded && (
                <a
                  href={image}
                  download='imagify-result.png'
                  className='w-full rounded-xl border border-white/10 bg-white/5 py-3 text-center text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white'
                >
                  Download Image
                </a>
              )}
            </div>

            {isImageLoaded && (
              <button
                type='button'
                onClick={() => { setIsImageLoaded(false); setInput('') }}
                className='mt-3 w-full text-sm text-slate-500 transition hover:text-violet-400'
              >
                Clear and write a new prompt
              </button>
            )}

            {/* Tips */}
            <div className='mt-5 rounded-xl bg-white/3 p-4 ring-1 ring-white/5'>
              <p className='mb-2 text-xs font-semibold text-slate-500'>Prompt tips</p>
              <ul className='space-y-1 text-xs text-slate-600'>
                <li>• Be specific about style, lighting, and composition</li>
                <li>• Add adjectives like "photorealistic", "cinematic", "4K"</li>
                <li>• Include mood: "golden hour", "moody", "vibrant"</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default Result
