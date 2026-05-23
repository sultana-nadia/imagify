import { Link, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext.js'


const Navbar = () => {

    const {user, setShowLogin, logout, credit} = useContext(AppContext)

    

    const navigate = useNavigate()

  return (
    <div className='flex flex-wrap items-center justify-between gap-3 py-4'>
        <Link to='/' className='shrink-0'>
           <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40'/>
        </Link>

        <div>

            {
            user ? 
            <div className='flex min-w-0 items-center gap-2 sm:gap-3'>
                <button onClick={()=>navigate('/buy')} className='flex min-h-11 items-center gap-2 rounded-full bg-blue-100 px-3 py-2 transition hover:bg-blue-200 sm:px-5'>
                    <img className='w-5' src={assets.credit_star} alt="" />
                    <p className='text-xs sm:text-sm font-medium text-gray-700'><span className='max-[420px]:hidden'>Credits left : </span>{credit ?? 0}</p>
                </button>

                <p className='max-w-44 truncate text-gray-600 max-md:hidden pl-2'>Hi, {user.name}</p>
                <div className='relative group'>
                    <img src={assets.profile_icon} className='w-10 shrink-0 drop-shadow' alt="" />

                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>

                        <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                            <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                        </ul>
                    </div>
                </div>

            </div> 
            : 
            <div className='flex items-center gap-2 sm:gap-5'>
                <p onClick={()=>navigate('/buy')} className='cursor-pointer'>Pricing</p>
                <button onClick={()=>setShowLogin(true)} className='min-h-10 bg-zinc-800 text-white px-6 py-2 sm:px-9 text-sm rounded-full'>Login</button>
            </div>
            }
            
            
        </div>
    </div>
  )
}

export default Navbar
