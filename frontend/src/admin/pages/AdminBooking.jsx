import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import Footer from "../../components/Footer";
import { getAllBookingApi } from "../../services/allApi";


const AdminBooking = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);


  const token = sessionStorage.getItem("token");


  const reqHeader = {
    Authorization: `Bearer ${token}`,
  };

  
  const getBooking = async () => {
     setLoading(true);
    try {
      const result = await getAllBookingApi(reqHeader);
      if (result?.status === 200) {
        setBooking(result.data);
      }
    } catch (err) {
      console.log( err);
    }
      setLoading(false);
    
  }

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-[1fr_4fr]">
        <AdminSideBar />

        <div className="min-h-screen bg-gray-100 p-8">
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Destination</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Persons</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8">
                      Loading...
                    </td>
                  </tr>
                ) : booking.length > 0 ? (
                  booking.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{item.username} </td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.destination}</td>
                      <td className="px-6 py-4">{item.date?.slice(0, 10)} </td>
                      <td className="px-6 py-4 text-center">{item.person}
                      </td>
                      <td className="px-6 py-4 font-semibold">₹{item.amount} </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-8 text-gray-500"
                    >
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default AdminBooking
