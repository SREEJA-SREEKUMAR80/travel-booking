import Footer from "../../components/Footer";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";

const AdminEnquiry = () => {
  return (
   <>
   <AdminHeader/>
   <div className='grid grid-cols-[1fr_4fr]'>
      <AdminSideBar/>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold mb-6">
          Contact Messages
        </h2>
  
        <div className="space-y-4">
  
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="flex justify-between">
              <h3 className="font-semibold">John Doe</h3>
              <span className="text-sm text-gray-500">20 Dec 2025</span>
            </div>
  
            <p className="text-sm text-gray-600 mt-1">
              john@gmail.com · 9876543210
            </p>
  
            <p className="mt-3 text-gray-700">
              I want to change my travel date.
            </p>
          </div>
  
          {/* Card 2 */}
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="flex justify-between">
              <h3 className="font-semibold">Anu</h3>
              <span className="text-sm text-gray-500">19 Dec 2025</span>
            </div>
  
            <p className="text-sm text-gray-600 mt-1">
              anu@gmail.com · 9123456789
            </p>
  
            <p className="mt-3 text-gray-700">
              Wrong person count in booking.
            </p>
          </div>
  
        </div>
      </div>
    </div>
      <Footer/>
   </>
  );
};

export default AdminEnquiry;