import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import UserHeader from '../components/UserHeader'

const PaymentError = () => {
  return (
   
     <>
            <UserHeader />
            <div className='container my-10'>
                <div className='md:grid grid-cols-2 px-20 justify-center items-center flex-col'>
                    <div>
                        <h1 className='md:text-4xl text-blue-600 '>Sorry | Your payment is Unsuccessfull</h1>
                        <p>We Apologize for the inconvinence caused and appreciates your valuable time!!!</p>
                        <Link to={'/package'}>
                            {" "}
                            <button className='bg-red-600'><FontAwesomeIcon icon={faBackward} />explore more</button>
                        </Link>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="thankuuu" className='w-full' />
                    </div>
                </div>
            </div>
            <Footer/>
        </>
  )
}

export default PaymentError