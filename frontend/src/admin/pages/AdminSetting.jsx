import React, { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import Footer from "../../components/Footer";

const AdminSetting = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    // Load existing user data from sessionStorage
    const user = JSON.parse(sessionStorage.getItem("existingUser"));
    if (user) {
      setUserDetails({
        username: user.username,
        email: user.email,
        password: "",
        cpassword: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, cpassword } = userDetails;

    if (!username || !email || !password || !cpassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }

    // Example: Update sessionStorage (replace with your API call)
    const updatedUser = { username, email };
    sessionStorage.setItem("existingUser", JSON.stringify(updatedUser));
    alert("Profile updated successfully!");
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_4fr]">
        <AdminSideBar />
        <div className="min-h-screen flex justify-center items-center p-5 bg-gray-100">
          <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6">
            <h1 className="text-2xl font-semibold mb-4">Personal Information</h1>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div>
                <h1>Name</h1>
                <input
                  type="text"
                  name="username"
                  value={userDetails.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="p-2 w-full border rounded"
                />
              </div>
              <div>
                <h1>Email</h1>
                <input
                  type="text"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="p-2 w-full border rounded"
                />
              </div>
              <div>
                <h1>Password</h1>
                <input
                  type="password"
                  name="password"
                  value={userDetails.password}
                  onChange={handleChange}
                  className="p-2 w-full border rounded"
                />
              </div>
              <div>
                <h1>Confirm Password</h1>
                <input
                  type="password"
                  name="cpassword"
                  value={userDetails.cpassword}
                  onChange={handleChange}
                  className="p-2 w-full border rounded"
                />
              </div>
              <button
                type="submit"
                className="border bg-blue-600 border-gray-300 p-2 rounded hover:bg-blue-400"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminSetting;
