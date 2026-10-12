import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import Footer from "../../components/Footer";
import {
  addDestinationApi,
  getDestinationApi,
  updateDestinationApi,
  deleteDestinationApi,
} from "../../services/allApi";

const AdminDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [destination, setDestination] = useState({
    imageurl: "",
    name: "",
    description: "",
    besttime: "",
    tags: [],
  });

  const token = sessionStorage.getItem("token");

  const reqHeader = {
    Authorization: `Bearer ${token}`,
  };


  const getDestination = async () => {
    setLoading(true);
    try {
      const res = await getDestinationApi(reqHeader);
      if (res.status === 200) {
        setDestinations(res.data);
      }
    } catch (err) {
      console.error("Get Destination Error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDestination();
  }, []);

 
  const handleReset = () => {
    setDestination({
      imageurl: "",
      name: "",
      description: "",
      besttime: "",
      tags: [],
    });
    setEditId(null);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        await updateDestinationApi(editId, destination, reqHeader);
      } else {
        await addDestinationApi(destination, reqHeader);
      }

      await getDestination();
      setShowModal(false);
      handleReset();
    } catch (err) {
      console.error("Submit Error:", err);
    }

    setLoading(false);
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?"))
      return;

    setLoading(true);
    try {
      await deleteDestinationApi(id, reqHeader);
      await getDestination();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };


  const handleEdit = (des) => {
    setEditId(des._id);
    setDestination({
      imageurl: des.imageurl,
      name: des.name,
      description: des.description,
      besttime: des.besttime,
      tags: des.tags || [],
    });
    setShowModal(true);
  };

  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-[1fr_4fr]">
        <AdminSideBar />

        <div className="bg-gray-50 min-h-screen p-6">
          <h2 className="text-4xl font-serif text-center mb-10">
            Manage Destinations
          </h2>

          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-full"
            >
              Add Destination
            </button>
          </div>

          {loading && <p className="text-center">Loading...</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {destinations.length > 0 ? (
              destinations.map((des) => (
                <div
                  key={des._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <img
                    src={des.imageurl}
                    alt={des.name}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-lg font-bold">{des.name}</h3>
                    <p className="text-sm text-gray-600">
                      {des.description}
                    </p>

                    <div className="flex flex-wrap gap-2 my-2">
                      {des.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm">
                      <strong>Best Time:</strong> {des.besttime}
                    </p>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(des)}
                        className="flex-1 border border-yellow-500 text-yellow-500 rounded py-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(des._id)}
                        className="flex-1 border border-red-500 text-red-500 rounded py-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              !loading && (
                <p className="text-center col-span-3">
                  No destinations found
                </p>
              )
            )}
          </div>

          
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <h3 className="text-xl font-bold mb-4">
                  {editId ? "Edit Destination" : "Add Destination"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={destination.imageurl}
                    onChange={(e) =>
                      setDestination({
                        ...destination,
                        imageurl: e.target.value,
                      })
                    }
                    className="w-full border px-3 py-2 rounded"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Destination Name"
                    value={destination.name}
                    onChange={(e) =>
                      setDestination({
                        ...destination,
                        name: e.target.value,
                      })
                    }
                    className="w-full border px-3 py-2 rounded"
                    required
                  />

                  <textarea
                    placeholder="Description"
                    value={destination.description}
                    onChange={(e) =>
                      setDestination({
                        ...destination,
                        description: e.target.value,
                      })
                    }
                    className="w-full border px-3 py-2 rounded"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Best Time"
                    value={destination.besttime}
                    onChange={(e) =>
                      setDestination({
                        ...destination,
                        besttime: e.target.value,
                      })
                    }
                    className="w-full border px-3 py-2 rounded"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={destination.tags.join(", ")}
                    onChange={(e) =>
                      setDestination({
                        ...destination,
                        tags: e.target.value
                          .split(",")
                          .map((t) => t.trim()),
                      })
                    }
                    className="w-full border px-3 py-2 rounded"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        handleReset();
                      }}
                      className="px-4 py-2 border rounded"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      {loading
                        ? editId
                          ? "Updating..."
                          : "Adding..."
                        : editId
                        ? "Update Destination"
                        : "Add Destination"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminDestination
