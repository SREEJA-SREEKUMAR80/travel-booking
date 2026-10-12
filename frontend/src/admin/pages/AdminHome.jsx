import React from 'react'
import AdminSideBar from '../components/AdminSideBar'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'

const AdminHome = () => {
  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-[1fr_4fr] min-h-screen bg-gray-50">
        {/* Sidebar */}
        <AdminSideBar />

        {/* Main Content */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Dashboard
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Package */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-md flex justify-between items-center p-6">
              <h1 className="text-lg font-semibold text-gray-700">
                Packages
              </h1>
              <p className="text-3xl font-bold text-black">
                50+
              </p>
            </div>

            {/* Destination */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-md flex justify-between items-center p-6">
              <h1 className="text-lg font-semibold text-gray-700">
                Destinations
              </h1>
              <p className="text-3xl font-bold text-black">
                120+
              </p>
            </div>

            {/* Enquiry */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-md flex justify-between items-center p-6">
              <h1 className="text-lg font-semibold text-gray-700">
                Booking
              </h1>
              <p className="text-3xl font-bold text-black">
                20+
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default AdminHome
