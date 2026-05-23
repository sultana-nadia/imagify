import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext.js"
import {motion} from "framer-motion"
import axios from 'axios'
import { toast } from "react-toastify"


const Login = () => {

  const [state, setState] = useState('Login')
  const {setShowLogin, backendUrl, setToken, setUser, setCredit} = useContext(AppContext)

  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[loading, setLoading] = useState(false)
  const[formError, setFormError] = useState('')

  const isLogin = state === 'Login'

  const switchMode = (nextState) => {
    setState(nextState)
    setFormError('')
    toast.dismiss('auth-error')
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if(loading){
        return
    }

    setLoading(true)
    setFormError('')
    toast.dismiss('auth-error')

    try {

        if (isLogin) {

            const { data } = await axios.post(
                backendUrl + '/api/user/login',
                { email: email.trim(), password }
            );

            if (data.success) {
                setToken(data.token);
                setUser(data.user);
                setCredit(data.credits);

                localStorage.setItem('token', data.token);

                setShowLogin(false);
            } else {
                setFormError(data.message);
                toast.error(data.message, {toastId: 'auth-error'});
            }

        } else {

            const { data } = await axios.post(
                backendUrl + '/api/user/register',
                { name: name.trim(), email: email.trim(), password }
            );

            if (data.success) {
                setToken(data.token);
                setUser(data.user);
                setCredit(data.credits);

                localStorage.setItem('token', data.token);

                setShowLogin(false);
            } else {
                setFormError(data.message);
                toast.error(data.message, {toastId: 'auth-error'});
            }
        }

    } catch (error) {
        const message = error.response?.data?.message || error.message;
        setFormError(message);
        toast.error(message, {toastId: 'auth-error'});
    } finally {
        setLoading(false)
    }
};

  return (

    <div className="fixed inset-0 z-50 pointer-events-none">

        <motion.form onSubmit={onSubmitHandler}
        initial={{opacity:0, y:-12, scale:0.98}}
        transition={{duration:0.3}}
        animate={{opacity:1, y:0, scale:1}}
        className="pointer-events-auto absolute right-3 top-20 w-[calc(100vw-24px)] max-w-sm bg-white p-5 sm:p-6 rounded-2xl text-slate-600 shadow-2xl border border-slate-200 sm:right-10 lg:right-28">
            <div className="mb-6 text-center">
                <h1 className="text-xl text-neutral-900 font-semibold">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
                <p className="text-sm mt-2 text-slate-500">{isLogin ? 'Log in to generate images and manage credits.' : 'Sign up to get your first 5 credits.'}</p>
            </div>

            <div className="grid grid-cols-2 rounded-full bg-slate-100 p-1 mb-5 text-sm font-medium">
                <button type="button" onClick={()=>switchMode('Login')} className={`py-2 rounded-full transition ${isLogin ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Login</button>
                <button type="button" onClick={()=>switchMode('Sign Up')} className={`py-2 rounded-full transition ${!isLogin ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Sign up</button>
            </div>

            { 
               !isLogin &&
                <div className="border border-slate-200 bg-slate-50 px-5 py-3 flex items-center gap-3 rounded-xl mt-4 focus-within:border-blue-400 focus-within:bg-white">
                <img width={20} src={assets.profile_icon} alt="" />
                <input onChange={e=> setName(e.target.value)} value={name} className="outline-none text-sm bg-transparent w-full" type="text" placeholder="Full Name" required={!isLogin} disabled={loading} />
            </div>
            }

            <div className="border border-slate-200 bg-slate-50 px-5 py-3 flex items-center gap-3 rounded-xl mt-4 focus-within:border-blue-400 focus-within:bg-white">
                <img width={16} src={assets.email_icon} alt="" />
                <input onChange={e=> setEmail(e.target.value)} value={email} className="outline-none text-sm bg-transparent w-full" type="email" placeholder="Email address" required disabled={loading} />
            </div>

            <div className="border border-slate-200 bg-slate-50 px-5 py-3 flex items-center gap-3 rounded-xl mt-4 focus-within:border-blue-400 focus-within:bg-white">
                <img width={12} src={assets.lock_icon} alt="" />
                <input onChange={e=> setPassword(e.target.value)} value={password} className="outline-none text-sm bg-transparent w-full" type="password" placeholder="Password" required disabled={loading} />
            </div>

            {formError && <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{formError}</p>}

            <button type="submit" disabled={loading} className="bg-blue-600 w-full text-white py-3 rounded-xl mt-5 font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed">{loading ? 'Please wait...' : isLogin ? 'Login' : 'Create account'}</button>

            <p className='mt-5 text-center text-sm'>{isLogin ? "Don't have an account?" : 'Already have an account?'} <button type="button" className="text-blue-600 font-medium hover:underline" onClick={()=> switchMode(isLogin ? 'Sign Up' : 'Login')}>{isLogin ? 'Sign up' : 'Login'}</button></p>

            <button type="button" onClick={()=>setShowLogin(false)} className="absolute top-4 right-4 rounded-full p-2 hover:bg-slate-100" aria-label="Close login modal"><img src={assets.cross_icon} className="w-3"  alt="" /></button>

        </motion.form>

    </div>
  )
}

export default Login
