import React from 'react'
import { Link } from 'react-router-dom'
import UserHeader from '../components/UserHeader'
import Footer from '../../components/Footer'


const About = () => {
  return (
    <>
    <UserHeader/>
  <section className='p-20'>
        <div className='grid grid-cols-2 p-10 mx-7 '>
            <div>
                <img src="https://i.pinimg.com/1200x/dd/91/af/dd91af8b5734f7bb2841334fa6aed800.jpg" alt="trip" className='w-150 rounded-b-full rounded-2xl' /> 
            </div>
            <div className='mx-10 p-10'>
                <h1 className='text-3xl font-bold'>We believe that travel is not</h1> 
                    <h1 className='text-3xl font-bold'> just about reaching a destination</h1>
                <p>A journey of self-discovery that transforms our perspective and makes us more open-minded; it is an experience that leaves you richer not in money, but in memories and wisdom.</p>
            </div>
    
        </div>
    </section>
    <section>
      
    
    </section>
   
    <Footer/>
    </>
  )
}

export default About

