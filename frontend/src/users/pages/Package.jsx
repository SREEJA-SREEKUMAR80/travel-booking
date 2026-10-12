import React, { useEffect, useState } from 'react';
import UserHeader from '../components/UserHeader';
import Footer from '../../components/Footer';
import { addBookingApi, allPackageApi, makePaymentApi } from '../../services/allApi';
import ChatPage from './ChatPage';

const Package = () => {
  const [open, setOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState({
    username: "",
    email: "",
    destination: "",
    date: "",
    person: "",
    amount: "",
  });

  const token = sessionStorage.getItem("token");

  const loadPackages = async () => {
    try {
      const res = await allPackageApi();
      if (res.status === 200) setPackages(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = () => {
    setBooking({
      username: "",
      email: "",
      destination: "",
      date: "",
      person: "",
      amount: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      alert("You must be logged in to book");
      setLoading(false);
      return;
    }

    try {
      await addBookingApi(booking, token);
      alert("Booking confirmed");
      handleReset();
      setOpen(false);
    } catch (err) {
      console.log(err);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const makePayment = async (destination, amount) => {
    if (!amount) {
      alert("Amount missing");
      return;
    }

    if (!token) {
      alert("You must be logged in to make payment");
      return;
    }

    try {
      const reqBody = { booking: { ...booking, destination, amount } };
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await makePaymentApi(reqBody, reqHeader);

      if (result.data?.url) {
        window.location.href = result.data.url;
      } else {
        alert("Stripe session failed");
      }
    } catch (err) {
      console.log(err);
      alert("Payment error");
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  return (
    <>
      <UserHeader />

      {/* Hero Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-serif text-gray-900 mb-4">
            Explore Our Packages
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Find the perfect tour tailored for your journey.
          </p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {packages.length > 0 ? (
          packages.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
            >
              <div className="relative">
                <img
                  src={item.imageurl}
                  alt={item.title}
                  className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-4 right-4 bg-black text-white px-4 py-1 rounded-full text-sm font-semibold">
                  ₹{item.price}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">{item.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>

                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <span className="font-medium">Duration:</span> {item.duration}
                  </p>
                  <p>
                    <span className="font-medium">Highlights:</span> {Array.isArray(item.highlights) ? item.highlights.join(", ") : item.highlights}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span> {item.startDate ? new Date(item.startDate).toLocaleDateString() : ""} – {item.endDate ? new Date(item.endDate).toLocaleDateString() : ""}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setBooking({ ...booking, destination: item.title, amount: item.price });
                      setOpen(true);
                    }}
                    className="w-full mt-4 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                  >
                    Book Now
                  </button>

                  <button
                    onClick={() => makePayment(item.title, item.price)}
                    className="w-full mt-4 bg-green-400 text-white py-3 rounded-xl font-semibold transition hover:bg-green-500"
                  >
                    Payment
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No packages available</p>
        )}
      </div>

      {/* Chat */}
      <ChatPage />

      {/* Booking Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl animate-fadeIn">
            <div className="px-6 py-4 border-b">
              <h3 className="text-2xl font-bold text-gray-900">Book Your Trip</h3>
              <p className="text-sm text-gray-500">Fill the details to confirm your booking</p>
            </div>

            <div className="p-6 space-y-4">
              <input
                type="text"
                value={booking.username}
                onChange={(e) => setBooking({ ...booking, username: e.target.value })}
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black"
              />
              <input
                type="email"
                value={booking.email}
                onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                placeholder="Email Address"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                value={booking.destination}
                readOnly
                className="w-full px-4 py-3 border rounded-lg bg-gray-100"
              />
              <input
                type="date"
                value={booking.date}
                onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black"
              />
              <input
                type="number"
                value={booking.person}
                onChange={(e) => setBooking({ ...booking, person: e.target.value })}
                placeholder="Person"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black"
              />
              <input
                type="number"
                value={booking.amount}
                readOnly
                className="w-full px-4 py-3 border rounded-lg bg-gray-100"
              />
            </div>

            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Package
