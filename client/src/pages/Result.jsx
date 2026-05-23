import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import {motion} from "framer-motion"
import { AppContext } from "../context/AppContext.js"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


const Result = () => {

  const [image, setImage]= useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const {backendUrl, token, setShowLogin, setCredit} = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const prompt = input.trim()

    if(!token){
      setShowLogin(true)
      return
    }

    if(!prompt){
      toast.error('Please enter an image prompt')
      return
    }

    setLoading(true)

    try{
      // The backend owns credit deduction and returns the updated balance.
      const {data} = await axios.post(
        backendUrl + '/api/image/generate-image',
        {prompt},
        {headers: {Authorization: `Bearer ${token}`}}
      )

      if(data.success){
        setImage(data.resultImage)
        setIsImageLoaded(true)
        setCredit(data.creditBalance)
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      const message = error.response?.data?.message || error.message
      const credits = error.response?.data?.creditBalance

      if(typeof credits === 'number'){
        // Keep the navbar correct when the server rejects a no-credit request.
        setCredit(credits)
      }

      if(error.response?.status === 402){
        toast.error(message)
        navigate('/buy')
      }else if(error.response?.status === 401){
        setShowLogin(true)
        toast.error(message)
      }else{
        toast.error(message)
      }
    }finally{
      setLoading(false)
    }

  }

  return (
    <motion.form 
    initial={{opacity:0.2, y:40}}
    transition={{duration:0.6}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
    onSubmit={onSubmitHandler} className="min-h-[calc(100vh-180px)] py-8 sm:py-12">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[520px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="aspect-square w-full bg-slate-100">
              <img src={image} className="h-full w-full object-cover" alt="Generated result" />
            </div>
            <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0' }`}/>
          </div>
        </div>

        <div className="w-full">
          <div className="mb-5">
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Imagify Studio</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">Generate and download images</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">Enter a prompt, spend one credit, and save the result when it is ready.</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <label className="text-sm font-medium text-slate-700" htmlFor="prompt">Prompt</label>
            <textarea
              id="prompt"
              onChange={e => setInput(e.target.value)}
              value={input}
              rows={4}
              placeholder="Describe what you want to generate"
              className="mt-2 w-full resize-none rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white"
              disabled={loading}
            />

            <p className={loading ? "mt-3 text-sm text-blue-600" : 'hidden'}>Generating your image...</p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button className="min-h-11 flex-1 rounded-md bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60" type="submit" disabled={loading}>{loading ? 'Generating' : isImageLoaded ? 'Generate New Image' : 'Generate Image'}</button>

              {isImageLoaded &&
                <a className="min-h-11 flex-1 rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-medium text-slate-900 transition hover:bg-slate-50" href={image} download="imagify-result.png">Download</a>
              }
            </div>

            {isImageLoaded &&
              <button type="button" onClick={()=>{setIsImageLoaded(false); setInput('')}} className="mt-3 w-full text-sm font-medium text-blue-600 hover:text-blue-700">Clear result and write a new prompt</button>
            }
          </div>
        </div>
      </div>
    </motion.form>
  )
}

export default Result
