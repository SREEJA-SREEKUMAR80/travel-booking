import React, { useContext, useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import Footer from "../../components/Footer";
import { updateUserProfileApi } from "../../services/allApi";
import { serverUrl } from "../../services/serverUrl";
import { userProfileUpdateStatusContext } from "../../context/Contextshare";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    cpassword: "",
    bio: "",
    profile: null,
  });
  const { setUserProfileUpdateStatus } = useContext(userProfileUpdateStatusContext);

  const [existingImage, setExistingImage] = useState(""); 
  const [preview, setPreview] = useState(""); 
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);

  // Handle image selection
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserDetails({ ...userDetails, profile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Reset form
  const handleReset = () => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"));
    setUserDetails({
      username: user.username,
      password: user.password,
      cpassword: user.password,
      bio: user.bio,
      profile: null,
    });
    setUserName(user.username);
    setExistingImage(user.profile);
    setPreview("");
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, cpassword, bio, profile } = userDetails;

    if (!username || !password || !cpassword || !bio) {
      alert("Please fill all fields");
      return;
    }

    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Login expired. Please login again.");
        return;
      }

      let reqBody;
      if (preview && profile) {
        reqBody = new FormData();
        reqBody.append("username", username);
        reqBody.append("password", password);
        reqBody.append("bio", bio);
        reqBody.append("profile", profile);
      } else {
        reqBody = { username, password, bio, profile: existingImage };
      }

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await updateUserProfileApi(reqBody, reqHeader);

      if (result.status === 200) {
        alert("Profile updated successfully");
        sessionStorage.setItem("existingUser", JSON.stringify(result.data));
        setUserProfileUpdateStatus(result.data);
        setExistingImage(result.data.profile);
        setPreview("");
        setUserDetails({ ...userDetails, password: "", cpassword: "", profile: null });
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong!");
    }
  };

  // Fetch bookings for current user
  const fetchUserBookings = async (email) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const response = await fetch(`${serverUrl}/user-booking/${email}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setBookings(data);
    } else {
      console.error("Failed to fetch bookings");
    }
  } catch (err) {
    console.error("Error fetching bookings:", err);
  }
};



  // Load user info and bookings
 useEffect(() => {
  const user = JSON.parse(sessionStorage.getItem("existingUser"));
  if (user) {
    setUserName(user.username);
    setEmail(user.email);
    setUserDetails({
      username: user.username,
      password: user.password,
      cpassword: user.password,
      bio: user.bio,
      profile: null,
    });
    setExistingImage(user.profile);

    // Fetch bookings for this user
    fetchUserBookings(user.email);
  }
}, []);


  return (
    <>
      <UserHeader />
      <div className="min-h-screen from-gray-100 to-gray-200 p-20">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-10">

              {/* Profile Info */}
              <section className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={
                    preview
                      ? preview
                      : existingImage
                        ? existingImage.startsWith("http")
                          ? existingImage
                          : `${serverUrl}/upload/${existingImage}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvJ14anYdkKq4d0LRhRh0a_u_Kh6DUQGHsQ&s"
                  }
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">User Information</h3>
                  <p className="mt-2 text-gray-700"><b>Name:</b> {username}</p>
                  <p className="text-gray-700"><b>Email:</b> {email}</p>
                  <input
                    type="file"
                    className="mt-3 text-sm"
                    onChange={handleUploadImage}
                  />
                </div>
              </section>

              {/* Update Profile */}
              <section>
                <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={userDetails.username}
                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={userDetails.password}
                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={userDetails.cpassword}
                    onChange={(e) => setUserDetails({ ...userDetails, cpassword: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <textarea
                    rows={5}
                    placeholder="Bio"
                    value={userDetails.bio}
                    onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
                    className="border p-2 rounded md:col-span-3"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                  >
                    Submit
                  </button>
                </div>
              </section>

              {/* Bookings */}
              <section>
                <h3 className="text-xl font-semibold mb-4">My Bookings</h3>
                <div className="space-y-4">
                  {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                  ) : (
                    bookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                      >
                        <div>
                          <p><b>Package:</b> {booking.packageName}</p>
                          <p><b>Date:</b> {new Date(booking.date).toLocaleDateString()}</p>
                        </div>
                        <span
                          className={`mt-2 md:mt-0 inline-block px-4 py-1 text-sm rounded-full font-semibold ${
                            booking.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </section>

            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile
