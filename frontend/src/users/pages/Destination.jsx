import React, { useEffect, useState, useContext } from "react";
import UserHeader from "../components/UserHeader";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { getDestinationApi } from "../../services/allApi";
import { searchKeyContext } from "../../context/Contextshare";

const Destination = () => {
  const [destination, setDestination] = useState([]);
  const { searchKey, setSearchKey } = useContext(searchKeyContext);

  const token = localStorage.getItem("token");

  const getDestination = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await getDestinationApi(searchKey || "", reqHeader);

    if (result.status === 200) {
      setDestination(result.data);
    }
  };
  

  useEffect(() => {
    getDestination();
  }, [searchKey]);

  return (
    <>
      <UserHeader />

      <div className="bg-gray-50 min-h-screen font-sans">
        <section className="py-20 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-serif text-center mb-10 text-gray-800">
              Best Time to Visit
            </h2>

            {/* Search */}
            <div className="flex justify-center mb-8">
              <input
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                type="text"
                placeholder="Search season..."
                className="w-full max-w-md px-5 py-3 rounded-full border shadow focus:outline-none"
              />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {destination.length > 0 ? (
                destination.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
                  >
                    <img
                      src={item.imageurl}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {item.name}
                      </h3>

                      <p className="text-gray-600 mb-3 text-sm">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 rounded-full px-2 py-1 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between text-gray-500 text-sm border-t pt-3">
                        <span>Best: {item.besttime}</span>
                      </div>

                      <Link to="/package">
                        <button className="w-full mt-4 border border-blue-600 text-blue-600 rounded-lg py-2 hover:bg-blue-50 transition">
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-3 text-gray-500">
                  No destinations available
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="py-14 text-center bg-gray-50">
          <Link
            to="/package"
            className="inline-block px-16 py-5 bg-black text-white text-lg font-bold rounded-full hover:bg-gray-700 transition shadow-xl"
          >
            Book Your Trip
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Destination;
