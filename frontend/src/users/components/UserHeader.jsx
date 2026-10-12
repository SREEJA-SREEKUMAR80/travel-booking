import { faAddressCard, faCircleUser, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserHeader = () => {
  const [open, setOpen] = useState(false)
  const[token,setToken]=useState("")
   const navigate = useNavigate()

const handleLogout = ()=>{
  sessionStorage.removeItem("existingUser")
  sessionStorage.removeItem("token")
  navigate("/")
 }


  useEffect(()=>{
    const token=sessionStorage.getItem("token")
    setToken(token)
    
  },[])

  console.log(token);
  return (
    <nav className="fixed top-0 z-50 w-full bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://png.pngtree.com/png-clipart/20200722/original/pngtree-travel-logo-template-png-image_5059404.jpg"
            alt="Logo"
            className="w-10 h-10 rounded"
          />
         
        </Link>

    
        <div className="hidden md:flex gap-8 text-white font-medium">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/destination" className="hover:text-gray-300">Destinations</Link>
          <Link to="/package" className="hover:text-gray-300">Packages</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </div>

      
        <div className="relative flex items-center gap-4">

          
         {!token ? <Link
            to="/login"
            className="hidden sm:block border border-white text-white px-4 py-1.5 rounded hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
          :

            <div className='relative inline-block text-left'>
            <div>
              <button
                type='button'
                className='inline-flex w-full items-center justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50'
                id='menu-button'
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setOpen(!open)}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s" alt="user image" style={{ width: '40px', height: "40px" }} />
              </button>
            </div>
            {open && 
            <div 
            className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md  shadow-lg ring-1 ring-black/5 focus:outline-hidden'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='menu-button'
            tabIndex="-1">
              <div className='py-1' role='none'>
                
                <Link to={'/profile'}>
                <p className='block px-4 py-2 text-sm text-gray-700'
                role='menuitem'
                tabIndex="-1"
                id="menu-item-0">
                  <FontAwesomeIcon icon={faAddressCard} className='me-2'/>Profile
                </p>
                </Link>
                <button className='block px-4 py-2 text-sm text-gray-700'
                role='menuitem'
                tabIndex="-1"
                id="menu-item-0">
                  <FontAwesomeIcon icon={faPowerOff} className='me-2'/>logOut
              </button>
               
              </div>


            </div>

            }

          </div>}
        </div> 

      </div>
    </nav>
  )
}

export default UserHeader