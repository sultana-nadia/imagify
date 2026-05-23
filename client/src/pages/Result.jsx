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
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
    onSubmit={onSubmitHandler} className="flex flex-col min-h-[90vh] justify-center items-center">
    <div>
        <div className="relative">
          <img src={image} className="max-w-sm rounded" alt="Generated result" />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0' }`}/>
        </div>
        <p className={!loading ? "hidden" : ''}>Loading...</p>
    </div>

  {!isImageLoaded &&

    <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">

      <input 
      onChange={e => setInput(e.target.value)} value={input}
      type="text" placeholder="Describe What you want to generate" className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color" disabled={loading} />

      <button className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full disabled:opacity-60" type="submit" disabled={loading}>{loading ? 'Generating' : 'Generate'}</button>
    </div>

  }

  {isImageLoaded &&

    <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
      <p onClick={()=>{setIsImageLoaded(false); setInput('')}}
       className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer">Generate Another</p>
      <a className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer" href={image} download="imagify-result.png" >Download</a>
    </div>

  }
    </motion.form>
  )
}

export default Result
