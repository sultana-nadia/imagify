
import { Routes, Route } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { useContext } from 'react'
import { AppContext } from './context/AppContext.js'

const App = () => {

  const {showLogin} = useContext(AppContext)
  return (
    <div className='relative min-h-screen overflow-x-hidden bg-[#09090f]'>

      {/* Ambient glow orbs */}
      <div className="glow-orb pointer-events-none fixed top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-purple-700/20 blur-[120px]" />
      <div className="glow-orb pointer-events-none fixed top-[30%] right-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-600/15 blur-[100px]" style={{animationDelay:'2s'}} />
      <div className="glow-orb pointer-events-none fixed bottom-[10%] left-[20%] h-[350px] w-[350px] rounded-full bg-violet-600/10 blur-[100px]" style={{animationDelay:'4s'}} />

      <ToastContainer
        position='bottom-right'
        limit={2}
        newestOnTop
        autoClose={3000}
        theme="dark"
        toastStyle={{background:'#1e1e2e', border:'1px solid rgba(255,255,255,0.08)', color:'#e2e8f0'}}
      />

      <div className='relative z-10'>
        <Navbar/>
        {showLogin && <Login/>}
        <div className='px-4 sm:px-10 md:px-14 lg:px-28'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/result' element={<Result/>}/>
            <Route path='/buy' element={<BuyCredit/>}/>
          </Routes>
          <Footer/>
        </div>
      </div>

    </div>
  )
}

export default App
