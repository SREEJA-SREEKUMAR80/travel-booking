import {
  faBus,
  faCompass,
  faGear,
  faGlobe,
  faHouse,
  faPassport
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSideBar = () => {
  const navigate = useNavigate()

  const filter = (data) => {
    if (data === "home") navigate("/admin-home")
    else if (data === "package") navigate("/admin-package")
    else if (data === "destination") navigate("/admin-destination")
    else if (data === "enquiry") navigate("/admin-enquiry")
    else if (data === "booking") navigate("/admin-booking")
     else if (data === "setting") navigate("/admin-setting")
    else navigate("*")
  }

  return (
    <div className="bg-black text-white h-full w-72 p-6">
      
      {/* Admin Image */}
      <div className="flex justify-center mb-10">
        <img
          src="https://t3.ftcdn.net/jpg/15/34/03/58/360_F_1534035806_6gn57ou4V0dVZY6l30h6nEB5gWQRAP6v.jpg"
          alt="admin"
          className="rounded-full w-32 h-32 border-2 border-white"
        />
      </div>

      {/* Menu */}
      <div className="space-y-5 text-lg font-medium">
        
        <div
          onClick={() => filter("home")}
          className="flex items-center gap-4 px-4 py-2 rounded-lg cursor-pointer
                     hover:bg-white hover:text-black transition"
        >
          <FontAwesomeIcon icon={faHouse} />
          <span>Dashboard</span>
        </div>

        <div
          onClick={() => filter("package")}
          className="flex items-center gap-4 px-4 py-2 rounded-lg cursor-pointer
                     hover:bg-white hover:text-black transition"
        >
          <FontAwesomeIcon icon={faPassport} />
          <span>Package</span>
        </div>

        <div
          onClick={() => filter("destination")}
          className="flex items-center gap-4 px-4 py-2 rounded-lg cursor-pointer
                     hover:bg-white hover:text-black transition"
        >
          <FontAwesomeIcon icon={faCompass} />
          <span>Destination</span>
        </div>
         <div
          onClick={() => filter("booking")}
          className="flex items-center gap-4 px-4 py-2 rounded-lg cursor-pointer
                     hover:bg-white hover:text-black transition"
        >
          <FontAwesomeIcon icon={faBus} />
          <span>Booking</span>
        </div>

        <div
          onClick={() => filter("enquiry")}
          className="flex items-center gap-4 px-4 py-2 rounded-lg cursor-pointer
                     hover:bg-white hover:text-black transition"
        >
          <FontAwesomeIcon icon={faGlobe} />
          <span>Enquiry</span>
        </div>

        <div
          onClick={() => filter("setting")}
          className="flex items-center gap-4 px-4 py-2 rounded-lg cursor-pointer
                     hover:bg-white hover:text-black transition"
        >
          <FontAwesomeIcon icon={faGear} />
          <span>Settings</span>
        </div>

      </div>
    </div>
  )
}

export default AdminSideBar
