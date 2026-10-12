import React, { useEffect, useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSideBar from '../components/AdminSideBar';
import Footer from '../../components/Footer';
import { addPackageApi, allPackageApi, deletePackageApi, updatePackageApi } from '../../services/allApi';
import { toast } from 'react-toastify';

const AdminPackage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    destination: "",
    price: "",
    duration: "",
    imageurl: "",
    highlights: "",
    startDate: "",
    endDate: ""
  });
  console.log(form);
  

  const getPackages = async () => {
    try {
      const res = await allPackageApi();
      if (res.status === 200) setPackages(res.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch packages");
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  // Reset form
  const handleReset = () => {
    setForm({
      title: "",
      destination: "",
      price: "",
      duration: "",
      imageurl: "",
      highlights: "",
      startDate: "",
      endDate: ""
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = sessionStorage.getItem("token");

    const data = {
      ...form,
      highlights: form.highlights.split(","),
      startDate: new Date(form.startDate),
      endDate: new Date(form.endDate)
    };

    try {
      let res;
      if (editId) {
        res = await updatePackageApi(editId, data, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        res = await addPackageApi(data, { headers: { Authorization: `Bearer ${token}` } });
      }

      if (res.status === 200) {
        toast.success(editId ? "Package updated successfully" : "Package added successfully");
        setModalOpen(false);
        handleReset();
        // Update state locally
        if (editId) {
          setPackages(prev => prev.map(pkg => pkg._id === editId ? { ...pkg, ...data } : pkg));
        } else {
         
          setPackages(prev => [...prev, res.data]);
        }
      } else {
        toast.error("Operation failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  
  const deletePackageController = async (id) => {
    try {
      const res = await deletePackageApi(id);
      if (res.status === 200) {
        setPackages(prev => prev.filter(pkg => pkg._id !== id));
        toast.success("Package deleted permanently!");
      } else {
        toast.error("Failed to delete package");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete package");
    }
  };

  
  const handleEdit = (pkg) => {
    setEditId(pkg._id);
    setForm({
      title: pkg.title,
      destination: pkg.destination,
      price: pkg.price,
      duration: pkg.duration,
      imageurl: pkg.imageurl,
      highlights: pkg.highlights,
      startDate: new Date(pkg.startDate).toISOString().split("T")[0],
      endDate: new Date(pkg.endDate).toISOString().split("T")[0]
    });
    setModalOpen(true);
  };

  return (
    <>
      <AdminHeader />
      <div className="p-10">
        <h1 className="text-center font-bold text-2xl mb-6">Travel Packages</h1>
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => { handleReset(); setModalOpen(true); }}
            className="border border-gray-100 bg-blue-400 text-white p-3 rounded hover:bg-blue-500 font-semibold"
          >
            Add New Package
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-gray-100 border-b text-left">
                <th className="py-4 px-6 font-semibold">Image</th>
                <th className="py-4 px-6 font-semibold">Title</th>
                <th className="py-4 px-6 font-semibold">Destination</th>
                <th className="py-4 px-6 font-semibold">Duration</th>
                <th className="py-4 px-6 font-semibold">Price</th>
                <th className="py-4 px-6 font-semibold">Highlights</th>
                <th className="py-4 px-6 font-semibold">Start Date</th>
                <th className="py-4 px-6 font-semibold">End Date</th>
                <th className="py-4 px-6 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {packages.length > 0 ? packages.map(pkg => (
                <tr key={pkg._id} className='border-b'>
                  <td className='py-4 px-6'>
                    <img src={pkg.imageurl} alt={pkg.title} className='h-10 w-10 object-cover rounded' />
                  </td>
                  <td className='py-4 px-6'>{pkg.title}</td>
                  <td className='py-4 px-6'>{pkg.destination}</td>
                  <td className='py-4 px-6'>{pkg.duration}</td>
                  <td className='py-4 px-6'>{pkg.price}</td>
                  <td className='py-4 px-6'>{pkg.highlights}</td>
                  <td className='py-4 px-6'>{new Date(pkg.startDate).toLocaleDateString()}</td>
                  <td className='py-4 px-6'>{new Date(pkg.endDate).toLocaleDateString()}</td>
                  <td>
                    <div className='flex gap-2 justify-end'>
                      <button
                        className='bg-yellow-500 text-white px-4 py-2 rounded text-sm'
                        onClick={() => handleEdit(pkg)}
                      >
                        Edit
                      </button>
                      <button
                        className='bg-red-700 text-white px-4 py-2 rounded text-sm'
                        onClick={() => deletePackageController(pkg._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className='py-8 text-center text-black '>No package found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
            <div className="border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {editId ? "Edit Package" : "Add New Package"}
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-3">
                <input
                  type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Package Name"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-800"
                  required
                />
                <input
                  type="text" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  placeholder="Destination"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-800"
                  required
                />
                <input
                  type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="Price"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-800"
                  required
                />
                <input
                  type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  placeholder="Duration (e.g., 10 Days)"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-800"
                  required
                />
                <input
                  type="text" value={form.imageurl} onChange={(e) => setForm({ ...form, imageurl: e.target.value })}
                  placeholder="Image URL"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-800"
                />
                <input
                  type="text" value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                  placeholder="Highlights (comma separated)"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-800"
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="date" name='startDate' value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="flex-1 rounded-lg border px-3 py-2"
                    required
                  />
                  <input
                    type="date" name='endDate' value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="flex-1 rounded-lg border px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); handleReset(); }}
                  className="flex-1 rounded-lg bg-gray-200 py-2 font-medium text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? (editId ? "Updating..." : "Adding...") : (editId ? "Update Package" : "Add Package")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default AdminPackage;
