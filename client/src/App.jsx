
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

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
  const { showLogin } = useContext(AppContext)

  return (
    <div className='relative min-h-screen overflow-x-hidden bg-[#050508]'>

      {/* Dot grid overlay */}
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-70" />

      {/* Ambient blob orbs */}
      <div className="blob-orb pointer-events-none fixed top-[-18%] left-[-12%] h-[750px] w-[750px] rounded-full bg-violet-700/12 blur-[160px]" />
      <div className="blob-orb pointer-events-none fixed top-[22%] right-[-18%] h-[650px] w-[650px] rounded-full bg-fuchsia-600/10 blur-[140px]" style={{ animationDelay: '3.5s' }} />
      <div className="blob-orb pointer-events-none fixed bottom-[0%] left-[5%] h-[550px] w-[550px] rounded-full bg-cyan-600/8 blur-[130px]" style={{ animationDelay: '7s' }} />
      <div className="glow-orb pointer-events-none fixed top-[55%] right-[25%] h-[350px] w-[350px] rounded-full bg-indigo-600/7 blur-[110px]" style={{ animationDelay: '5s' }} />

      <ToastContainer
        position='bottom-right'
        limit={2}
        newestOnTop
        autoClose={3000}
        theme='dark'
        toastStyle={{
          background: '#0c0c18',
          border: '1px solid rgba(139,92,246,0.2)',
          color: '#e2e8f0',
          boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
          borderRadius: '12px',
        }}
      />

      <div className='relative z-10'>
        <Navbar />
        {showLogin && <Login />}
        <div className='px-4 sm:px-10 md:px-14 lg:px-28'>
          <Routes>
            <Route path='/'      element={<Home />} />
            <Route path='/result' element={<Result />} />
            <Route path='/buy'   element={<BuyCredit />} />
          </Routes>
          <Footer />
        </div>
      </div>

    </div>
  )
}

export default App
