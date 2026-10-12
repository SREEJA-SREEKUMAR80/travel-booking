import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserHeader from '../users/components/UserHeader'
import Footer from '../components/Footer'
import { ToastContainer, toast } from 'react-toastify'
import { googleLoginApi, loginApi, registerApi } from '../services/allApi'
import { GoogleLogin } from '@react-oauth/google';

const Auth = ({ register }) => {

   const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);
  const navigate = useNavigate()

  const handleRegister = async() => {
    const { username, email, password } = userDetails

    if (!username || !email || !password) {
      toast.info("please fill the form completely..")
    } else {
      const result = await registerApi({ username, email, password,profile:"" })
      console.log(result);
      if (result.status == 200) {
        toast.success("register Sucessfull..")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      } else if (result.status == 400) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }

    }
  }

  const handleLogin=async()=>{
      const { email, password } = userDetails
  
      if (!email || !password) {
        toast.info("please fill the form completely..")
      } else {
        const result=await loginApi({email,password})
        console.log(result);
        if(result.status==200){
          toast.success("login Successfull...")
          sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token",result.data.token)
         setTimeout(()=>{
          if(result.data.existingUser.email== "admin@gmail.com"){
            navigate("/admin-home")
          }else{
            navigate("/")
          }
         },2500)
         }else  if(result.status == 404){
          toast.warning(result.response.data)
          setUserDetails({
            username: "",
            email: "",
            password: ""
  
          })
  
         }else if(result.status == 401){
          toast.warning(result.response.data)
           setUserDetails({
            username: "",
            email: "",
            password: ""
  
          })
  
         }else{
           toast.error(result.response.data)
           setUserDetails({
            username: "",
            email: "",
            password: ""
  
          })
  
         }
        
  
      }
  
    }

  const handleGoogleLogin=async(credentialResponse)=>{
    const details=jwtDecode(credentialResponse.credential)
    console.log(details);

    const result=await googleLoginApi({username:details.name,email:details.email,password:"googlepswd",profile:details.picture})
    console.log(result);
    if(result.status==200){
      toast.success("Login SucessFully.....")
       sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
       setTimeout(()=>{
        if(result.data.existingUser.email== "admin@gmail.com"){
          navigate("/admin-home")
        }else{
          navigate("/")
        }
       },2500)
    
    }else{
      toast.error("Something went wrong!!!")
    }
    
    
  }


  return (
    <>
      <UserHeader />

      {/* Center container */}
      <div className="min-h-screen flex items-center justify-center bg-white p-25">
        <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl shadow-md p-8">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <img
              src="https://static.vecteezy.com/system/resources/previews/019/879/198/non_2x/user-icon-on-transparent-background-free-png.png"
              alt="user"
              className="w-20"
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-semibold text-center text-black mb-6">
            {register ? 'Register' : 'Login'}
          </h1>

          {/* Inputs */}
          <div className="space-y-4">
            {register && (
              <input
                value={userDetails.username}
                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                type="text"
                placeholder="Username"
                className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-black"
              />
            )}

            <input
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-black"
            />

            <input
            value={userDetails.password}
              onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:border-black"
            />
          </div>

          {/* Button */}
          {register ? <button type="button" onClick={handleRegister} className="w-full mt-6 p-3 bg-black text-white font-medium rounded hover:bg-gray-800">REGISTER</button>
            :
            <button type="button"  onClick={handleLogin} className="w-full mt-6 p-3 bg-black text-white font-medium rounded hover:bg-gray-800">LOGIN</button>
          }

          {/* Switch */}
          <p className="text-center mt-4 text-sm text-gray-700">
            {register ? (
              <>
                Already a user?{' '}
                <Link to="/login" className="text-black font-semibold underline">
                  Login
                </Link>
              </>
            ) : (
              <>
                New user?{' '}
                <Link to="/register" className="text-black font-semibold underline">
                  Register
                </Link>
              </>
            )}
          </p>

          <p className='text-center p-3'>--------------or--------------</p>

          {/* Google button */}
          {/* <button className="w-full p-3 border border-gray-400 rounded hover:bg-gray-100 font-medium">
            Sign in with Google
          </button> */}
          <GoogleLogin  width={"400px"}
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    handleGoogleLogin(credentialResponse)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>

        </div>
      </div>
      <ToastContainer theme='colored' position="top-center" autoClose={2000} />
      <Footer />
    </>
  )
}

export default Auth
