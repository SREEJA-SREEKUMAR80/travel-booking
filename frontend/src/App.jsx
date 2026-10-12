import { Route, Routes } from "react-router-dom"
import Home from "./users/pages/Home"
import About from "./users/pages/About"
import Destination from "./users/pages/Destination"
import View from "./users/pages/View"
import { useState } from "react"
import { useEffect } from "react"
import Contact from "./users/pages/Contact"
import Package from "./users/pages/Package"
import Auth from "./pages/Auth"
import Preloader from "./components/Preloader"
import Pnf from "./pages/Pnf"
import AdminHome from "./admin/pages/AdminHome"
import AdminPackage from "./admin/pages/AdminPackage"
import AdminDestination from "./admin/pages/AdminDestination"
import AdminEnquiry from "./admin/pages/AdminEnquiry"
import AdminSetting from "./admin/pages/AdminSetting"
// import Book from "./users/pages/Book"
import Profile from "./users/pages/Profile"
import ChatPage from "./users/pages/ChatPage"
import AdminBooking from "./admin/pages/AdminBooking"
import PaymentSuccess from "./users/pages/PaymentSuccess"
import PaymentError from "./users/pages/PaymentError"







function App() {
 const [isloading, setIsLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 7000)
  }, [])

  return (
    <>
   
   
    <Routes>
      <Route path="/login" element={<Auth/>} />
       <Route path="/register" element={<Auth register />} />
        <Route path="/" element={isloading ? <Preloader /> : <Home/>} />
       <Route path="/package" element={<Package />} />
      <Route path="/about" element={<About />} />
       <Route path="/destination" element={<Destination />} />
       <Route path="/view" element={<View/>}/>
        <Route path="/contact" element={<Contact/>}/>
         {/* <Route path="/trip-planner" element={<Book/>}/> */}
          <Route path="/profile" element={<Profile/>}/>
           <Route path="/chat" element={<ChatPage/>}/>


      

    <Route path="/admin-home" element={isloading ? <Preloader />:<AdminHome />} />
    <Route path="/admin-package" element={<AdminPackage/>}/>
    <Route path="/admin-destination" element={<AdminDestination/>}/>
    <Route path="/admin-enquiry" element={<AdminEnquiry/>}/>
<Route path="/admin-booking" element={<AdminBooking/>}/>
    <Route path="/admin-setting" element={<AdminSetting/>}/>


     <Route path="/payment-success" element={<PaymentSuccess/>}/>
      <Route path="/payment-error" element={<PaymentError/>}/>




        
         <Route path="/*" element={<Pnf />} />

      

    </Routes>
   
     </>
  )
}

export default App

