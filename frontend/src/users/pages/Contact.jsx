import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import UserHeader from '../components/UserHeader'
import Footer from '../../components/Footer'

const Contact = () => {
    return (
        
        <>
        <UserHeader/>
        <div className='p-5'>
            <h1 className='text-center font-bold text-4xl'>Contact</h1>
        </div>
            <div  className='p-5 justify-center items-center flex'>
               
                <div className='grid grid-cols-2 border border-gray-100 w-200 bg-white text-black mx-10 p-5 shadow-2xl '>
                    <div className='text-xl space-x-6 space-y-5 mx-3'>
                        <h1 className='font-bold'>Contact Information</h1>
                      <h1><FontAwesomeIcon icon={faLocationDot} />123 street kochi,kerala</h1>
                      <h1><FontAwesomeIcon icon={faPhone} />+91 8098765431</h1>
                      <h1><FontAwesomeIcon icon={faEnvelope} />info@gmail.com</h1>
                     <button className='bg-green-500 border p-1 rounded-xl'><FontAwesomeIcon icon={faWhatsapp} /></button>
                     <button className='bg-pink-300 border p-1 rounded-xl'> <FontAwesomeIcon icon={faInstagram} /></button>

                    </div>
                    <div  className='text-xl space-x-6 space-y-5 mx-3'>
                        <h1 className='font-bold'>Enquiry Form</h1>
                        <div>
                        <input className='border border-gray-400' type="text" placeholder='Full Name' />
                        </div>
                        <div>
                        <input className='border border-gray-400' type="text" placeholder='Email' />
                        </div>
                        <div>
                        <input className='border border-gray-400' type="text" placeholder='Phone' />
                        </div>
                        <div>
                        <textarea className='border border-gray-400 w-62' type="text" placeholder='Message' />
                        </div>
                        <div className='flex justify-center items-center'>
                            <button className='border border-gray-100 bg-blue-400 hover:bg-blue-200 p-2 w-50'>Send Enquiry</button>
                        </div>

                    </div>

                </div>

            </div>
            <Footer/>
            
        </>
    )
}

export default Contact