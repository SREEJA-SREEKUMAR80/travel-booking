import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import UserHeader from '../components/UserHeader'

const PaymentSuccess = () => {
    return (
        <>
            <UserHeader/>
            <div className='container my-10'>
                <div className='md:grid grid-cols-2 px-20 justify-center items-center flex-col'>
                    <div>
                        <h1 className='md:text-4xl text-blue-600 '>Congralulation</h1>
                        <p>Thank You shopping hope you have a good time</p>
                        <Link to={'/package'}>
                            {" "}
                            <button className='bg-blue-600'><FontAwesomeIcon icon={faBackward} />Back</button>
                        </Link>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" alt="thankuuu" className='w-full' />
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default PaymentSuccess