import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dummyStations = [
  {
    _id: "1",
    name: "Station A",
    location: { lat: 12.34, lng: 56.78 },
    status: "active",
    powerOutput: "50kW",
    connectorType: "Type2",
  },
  {
    _id: "2",
    name: "Station B",
    location: { lat: 22.22, lng: 44.44 },
    status: "inactive",
    powerOutput: "100kW",
    connectorType: "CHAdeMO",
  },
];

function Admin() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formVisible, setFormVisible] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lat: "",
    lng: "",
    status: "active",
    powerOutput: "",
    connectorType: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Simulate fetching from API
  useEffect(() => {
    setTimeout(() => {
      setStations(dummyStations);
      setLoading(false);
    }, 800);
  }, []);

  // Open add form
  const openAddForm = () => {
    setEditingStation(null);
    setFormData({
      name: "",
      lat: "",
      lng: "",
      status: "active",
      powerOutput: "",
      connectorType: "",
    });
    setFormErrors({});
    setFormVisible(true);
  };

  // Open edit form
  const openEditForm = (station) => {
    setEditingStation(station);
    setFormData({
      name: station.name,
      lat: station.location.lat,
      lng: station.location.lng,
      status: station.status,
      powerOutput: station.powerOutput,
      connectorType: station.connectorType,
    });
    setFormErrors({});
    setFormVisible(true);
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.lat || isNaN(formData.lat)) errors.lat = "Valid latitude required";
    if (!formData.lng || isNaN(formData.lng)) errors.lng = "Valid longitude required";
    if (!formData.status.trim()) errors.status = "Status is required";
    if (!formData.powerOutput.trim()) errors.powerOutput = "Power output is required";
    if (!formData.connectorType.trim()) errors.connectorType = "Connector type is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit (add or update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingStation) {
      setStations((prev) =>
        prev.map((st) =>
          st._id === editingStation._id
            ? {
                ...st,
                name: formData.name,
                location: { lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) },
                status: formData.status,
                powerOutput: formData.powerOutput,
                connectorType: formData.connectorType,
              }
            : st
        )
      );
    } else {
      const newStation = {
        _id: Date.now().toString(),
        name: formData.name,
        location: { lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) },
        status: formData.status,
        powerOutput: formData.powerOutput,
        connectorType: formData.connectorType,
      };
      setStations((prev) => [newStation, ...prev]);
    }

    setFormVisible(false);
  };

  // Delete station
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this station?")) {
      setStations((prev) => prev.filter((st) => st._id !== id));
    }
  };

  return (
    <div className="min-h-screen mt-16 bg-gray-900 p-6 text-white">
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Admin Dashboard - EV Charging Stations
      </motion.h1>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openAddForm}
        className="bg-green-500 px-6 py-3 rounded-md font-semibold mb-6 block mx-auto max-w-xs w-full shadow-lg hover:bg-green-600 transition"
      >
        + Add New Charging Station
      </motion.button>

      {loading ? (
        <p className="text-center mt-20 text-lg">Loading stations...</p>
      ) : stations.length === 0 ? (
        <p className="text-center mt-20 text-lg text-gray-400">No stations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-md shadow-md">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-6">Name</th>
                <th className="text-left py-3 px-6">Location (Lat, Lng)</th>
                <th className="text-left py-3 px-6">Status</th>
                <th className="text-left py-3 px-6">Power Output</th>
                <th className="text-left py-3 px-6">Connector Type</th>
                <th className="text-center py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((station) => (
                <tr
                  key={station._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="py-4 px-6">{station.name}</td>
                  <td className="py-4 px-6">
                    {station.location.lat.toFixed(3)}, {station.location.lng.toFixed(3)}
                  </td>
                  <td className="py-4 px-6 capitalize">{station.status}</td>
                  <td className="py-4 px-6">{station.powerOutput}</td>
                  <td className="py-4 px-6">{station.connectorType}</td>
                  <td className="py-4 px-6 flex justify-center space-x-4">
                    <button
                      onClick={() => openEditForm(station)}
                      className="bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(station._id)}
                      className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {formVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          >
            <motion.form
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onSubmit={handleSubmit}
              className="bg-gray-800 rounded-md p-6 w-full max-w-md"
            >
              <h2 className="text-2xl font-semibold mb-4">
                {editingStation ? "Edit Charging Station" : "Add New Charging Station"}
              </h2>

              <div className="mb-3">
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-md p-2 text-black"
                />
                {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
              </div>

              <div className="mb-3 grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                    className="w-full rounded-md p-2 text-black"
                  />
                  {formErrors.lat && <p className="text-red-500 text-sm">{formErrors.lat}</p>}
                </div>
                <div>
                  <label className="block mb-1 font-medium">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.lng}
                    onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                    className="w-full rounded-md p-2 text-black"
                  />
                  {formErrors.lng && <p className="text-red-500 text-sm">{formErrors.lng}</p>}
                </div>
              </div>

              <div className="mb-3">
                <label className="block mb-1 font-medium">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-md p-2 text-black"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {formErrors.status && <p className="text-red-500 text-sm">{formErrors.status}</p>}
              </div>

              <div className="mb-3">
                <label className="block mb-1 font-medium">Power Output</label>
                <input
                  type="text"
                  value={formData.powerOutput}
                  onChange={(e) => setFormData({ ...formData, powerOutput: e.target.value })}
                  className="w-full rounded-md p-2 text-black"
                />
                {formErrors.powerOutput && (
                  <p className="text-red-500 text-sm">{formErrors.powerOutput}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Connector Type</label>
                <input
                  type="text"
                  value={formData.connectorType}
                  onChange={(e) => setFormData({ ...formData, connectorType: e.target.value })}
                  className="w-full rounded-md p-2 text-black"
                />
                {formErrors.connectorType && (
                  <p className="text-red-500 text-sm">{formErrors.connectorType}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  {editingStation ? "Update" : "Add"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Admin;