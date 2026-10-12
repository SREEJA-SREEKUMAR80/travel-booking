import React from 'react'

const AdminHeader = () => {
  return (
    <div className="w-full bg-black px-6 py-3 flex justify-end items-center">
      <button className="border border-white text-white px-5 py-2 rounded-lg text-sm font-medium
                         hover:bg-white hover:text-black transition duration-300">
        Logout
      </button>
    </div>
  )
}

export default AdminHeader
