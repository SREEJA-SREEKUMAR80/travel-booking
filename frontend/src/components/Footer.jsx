import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div>
        <div className='grid grid-cols-3 bg-black text-white p-6 '>
        <div className='space-x-10 mx-20 '>
                <h1  className='text-xl font-bold' >Explore</h1>
               <ul>
                <li>Countries</li>
                <li>Cities</li>
                <li>Regions</li>
                <li>Adventure</li>
                

               </ul>
            </div>
            <div>
                <h1 className='text-xl font-bold'>Helpful Links</h1>
             <ul>
                 <Link to={"/destination"}><li><a href="">destination</a></li></Link>
                  <Link to={"/package"}><li><a href="">package</a></li></Link>
                   <li> <a href="">Support</a></li>
                    <li><a href="">Privacy</a></li>
                 
             </ul>
            </div>
              <div>
                <h1 className='text-xl font-bold'>Information</h1>
             <ul>
                   <li> <a href="#home">Home</a></li>
                    <li><a href="#package">package</a></li>
                   <li> <a href="#destination">Destination</a></li>
                    <li><a href="#about">About</a></li>
                 
             </ul>
            </div>

        </div>
    </div>

    </>
  )
}

export default Footer