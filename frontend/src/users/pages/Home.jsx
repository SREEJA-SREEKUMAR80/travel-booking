import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserHeader from '../components/UserHeader'
import Footer from '../../components/Footer'
import { faArrowRight, faCheck, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'




const Home = () => {
    const [open, setOpen] = useState(false);
    return (

        <>
            <UserHeader />

            <header>
                <div className='grid grid-cols-2'>
                    <div className='p-50 w-3xl '>
                        <h1 className='text-xl font-bold ' >Plan Your Trip</h1>
                        <p className='text-xl font-bold'>The world is a book and those who do not travel read only one page</p>
                        <div>
                            <Link to={"/package"}><button className='border border-gray-300 bg-black p-2 text-xl text-white  font-semibold rounded'>Get Started<FontAwesomeIcon icon={faArrowRight} /></button></Link>
                        </div>
                    </div>

                    <div className='p-20'>
                        <img src="https://i.pinimg.com/1200x/c6/34/bd/c634bdb6b488fd6b878624a79f66de84.jpg" alt="no image" style={{ width: "500px", height: "500px" }} />
                    </div>
                </div>
            </header>

            <div>
                <div className='p-5'>
                    <h1 className='text-center font-bold text-2xl'>Testimonal</h1>
                    <div className=' mx-7 space-x-3 p-5'>
                       

                            {/* CARD 1 */}
                            
                           
                                  <div className='grid grid-cols-3'>
                                        <div className="bg-black shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition cursor-pointer flex flex-col sm:flex-row items-center p-6 sm:p-8 gap-6">
                                            <img
                                                src="https://images.pexels.com/photos/5699868/pexels-photo-5699868.jpeg"
                                                alt="noooo"
                                                className="w-36 h-36 object-cover rounded-full "
                                            />
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className='text-white'>
                                                    <p className='text-left mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque eveniet inventore hic quam sequi voluptatum </p>
                                                    <div className="text-yellow-500 text-sm font-medium mt-2">⭐ 4.8 </div>
                                                </div> </div>
                                        </div>
                                  </div>
                                  
                             


                        </div>
                    </div>
                </div>

           

            <section>
                <h1 className='text-center p-3 text-2xl  font-bold'>Special Offers</h1>
                <p className='text-center p-3 font-bold'>special offers for student tour</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-5 p-5">
                    <div className="bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition cursor-pointer  items-center p-6 sm:p-8 gap-6">
                        <img src="https://media.easemytrip.com/media/Deal/DL638011032607174165/SightSeeing/SightSeeingZAxidb.png" alt="kerala" style={{ width: "400px" }} />
                        <div className='text-black'>
                            <p>A Peaceful Vacation in Kerala</p>
                            <p><FontAwesomeIcon icon={faCheck} />accomadation</p>
                            <p><FontAwesomeIcon icon={faCheck} />Customizable package</p>
                            <p><FontAwesomeIcon icon={faCheck} />Hotel included</p>
                            <p>Starting from</p>
                            <p className='font-bold'>₹ 2000</p>
                            <div className="text-yellow-500 text-sm font-medium mt-2">⭐ 4.8


                            </div>
                            <button
                                onClick={() => setOpen(true)}
                                className="mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
                            >
                                Book Now
                            </button>

                            {open && (
                                <div
                                    className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center"
                                    onClick={() => setOpen(false)}
                                >
                                    <div
                                        className="bg-white rounded-xl p-6 w-96 shadow-xl"
                                        onClick={(e) => e.stopPropagation()} // prevent overlay close
                                    >
                                        <h3 className="text-lg font-bold mb-4">Book Your Package</h3>

                                        <div className="flex flex-col gap-3">
                                            <input
                                                type="text"
                                                placeholder="Enter your name"
                                                className="border p-2 rounded-md"
                                            />

                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="border p-2 rounded-md"
                                            />

                                            <input
                                                type="tel"
                                                placeholder="Enter phone number"
                                                className="border p-2 rounded-md"
                                            />
                                        </div>

                                        <button className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700 transition">
                                            Submit
                                        </button>

                                        <button
                                            onClick={() => setOpen(false)}
                                            className="w-full bg-red-600 text-white py-2 rounded-lg mt-2 hover:bg-red-700 transition"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}









                        </div>
                    </div>

                </div>
            </section>


            <Footer />

        </>
    )
}

export default Home


















