import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import axios from "axios";
import { useWebContext } from "../../context/WebContext";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { API_LINK } = useWebContext();

  const getAllEVStations = async () => {
    try {
      const evData = await axios.get(
        `${API_LINK}/api/charging-station/get-all-charging-station`
      );
      console.log(evData.data.allEVStations);
      setTimeout(() => {
        setStations(evData.data.allEVStations);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.log(
        "There are some errors in your getAllEVStations plz fix the err ",
        error
      );
    }
  };
  useEffect(() => {
    getAllEVStations();
  }, []);
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
    address: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const openAddForm = () => {
    setEditingStation(null);
    setFormData({
      name: "",
      lat: "",
      lng: "",
      status: "active",
      powerOutput: "",
      connectorType: "",
      address: "",
    });
    setFormErrors({});
    setFormVisible(true);
  };

  const openEditForm = (station) => {
    setEditingStation(station);
    setFormData({
      name: station.name,
      lat: station.location.lat,
      lng: station.location.lng,
      status: station.status,
      powerOutput: station.powerOutput,
      connectorType: station.connectorType,
      address: "",
    });
    setFormErrors({});
    setFormVisible(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.lat || isNaN(formData.lat))
      errors.lat = "Valid latitude required";
    if (!formData.lng || isNaN(formData.lng))
      errors.lng = "Valid longitude required";
    if (!formData.status.trim()) errors.status = "Status is required";
    if (!formData.powerOutput.trim())
      errors.powerOutput = "Power output is required";
    if (!formData.connectorType.trim())
      errors.connectorType = "Connector type is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const stationData = {
      name: formData.name,
      location: {
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
      },
      status: formData.status,
      powerOutput: formData.powerOutput,
      connectorType: formData.connectorType,
    };

    try {
      if (editingStation) {
        //Update station via PUT request
        const res = await axios.put(
          `${API_LINK}/api/charging-station/update-prev-charging-station/${editingStation._id}`,
          stationData
        );
        console.log(res);

        // Update local state
        setStations((prev) =>
          prev.map((st) =>
            st._id === editingStation._id ? res.data.updatedStation : st
          )
        );
      } else {
        // Add new station via POST request
        const res = await axios.post(
          `${API_LINK}/api/charging-station/add-new-charging-station`,
          stationData
        );

        setStations((prev) => [res.data.newEVStation, ...prev]);
      }
      setFormVisible(false);
      setEditingStation(null);
      setFormData({
        name: "",
        status: "active",
        powerOutput: "",
        connectorType: "",
        lat: "",
        lng: "",
        address: "",
      });
    } catch (error) {
      console.error("API error:", error);
      alert("Something went wrong while saving the station.");
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: "",
        }));
        setFormErrors((prev) => ({ ...prev, lat: null, lng: null }));
        setIsFetchingLocation(false);
      },
      (error) => {
        alert("Unable to retrieve your location: " + error.message);
        setIsFetchingLocation(false);
      }
    );
  };
  const geocodeAddress = async () => {
    if (!formData.address.trim()) {
      alert("Please enter an address to convert");
      return;
    }

    setIsGeocoding(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          formData.address
        )}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const place = data[0];
        setFormData((prev) => ({
          ...prev,
          lat: parseFloat(place.lat),
          lng: parseFloat(place.lon),
        }));
        setFormErrors((prev) => ({ ...prev, lat: null, lng: null }));
      } else {
        alert("Address not found. Please enter a valid address.");
      }
    } catch (err) {
      alert("Failed to fetch location from address");
    }
    setIsGeocoding(false);
  };

  const handleDelete = async (id) => {
    try {
      const deleteStation = await axios.delete(
        `${API_LINK}/api/charging-station/delete-one-charging-station/${id}`
      );
      if (deleteStation.status == 200) {
        window.location.reload();
        navigate("/admin-page");
      }
    } catch (error) {
      console.log(
        "There are some errors inHandleDelete controller plz fix the bug first ",
        error
      );
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto mt-16 bg-gray-900 p-6 text-white">
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
        <p className="text-center mt-20 text-lg text-gray-400">
          No stations found.
        </p>
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
                    {station.location.lat.toFixed(3)},{" "}
                    {station.location.lng.toFixed(3)}
                  </td>
                  <td className="py-4 px-6 capitalize">{station.status}</td>
                  <td className="py-4 px-6">{station.powerOutput}</td>
                  <td className="py-4 px-6">{station.connectorType}</td>
                  <td className="py-4 px-6 flex justify-center space-x-4">
                    <button
                      onClick={() => openEditForm(station)}
                      className="bg-blue-600 px-3 py-1 rounded-md border-1 border-white hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(station._id)}
                      className="bg-red-600 px-3 py-1 rounded-md border-1 border-white hover:bg-red-700 transition"
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

      <AnimatePresence>
        {formVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 flex items-center overflow-y-auto ` justify-center bg-black bg-opacity-70 z-50 p-4"
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-gray-800 p-6 rounded-md max-w-lg w-full shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-semibold mb-4">
                {editingStation ? "Edit Station" : "Add New Station"}
              </h2>

              <label className="block mb-3">
                <span className="text-gray-300">Station Name</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </label>

              <label className="block mb-3">
                <span className="text-gray-300">Status</span>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>

              <label className="block mb-3">
                <span className="text-gray-300">Power Output</span>
                <input
                  type="text"
                  value={formData.powerOutput}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      powerOutput: e.target.value,
                    }))
                  }
                  placeholder="e.g., 50kW"
                  className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {formErrors.powerOutput && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.powerOutput}
                  </p>
                )}
              </label>

              <label className="block mb-3">
                <span className="text-gray-300">Connector Type</span>
                <input
                  type="text"
                  value={formData.connectorType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      connectorType: e.target.value,
                    }))
                  }
                  placeholder="e.g., Type2, CHAdeMO"
                  className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                {formErrors.connectorType && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.connectorType}
                  </p>
                )}
              </label>

              <hr className="my-4 border-gray-600" />

              <p className="mb-2 text-gray-400 font-semibold">Location</p>

              {/* Current Location Button */}
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={isFetchingLocation}
                className="mb-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md transition"
              >
                {isFetchingLocation
                  ? "Getting Location..."
                  : "Add Current Location"}
              </button>

              <p className="mb-2 text-gray-400">
                Or enter address manually to get coordinates:
              </p>

              {/* Address Input + Geocode Button */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  placeholder="Enter address"
                  className="flex-grow rounded-md bg-gray-900 border border-gray-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  type="button"
                  onClick={geocodeAddress}
                  disabled={isGeocoding}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-md transition"
                >
                  {isGeocoding ? "Searching..." : "Get Coordinates"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <label>
                  <span className="text-gray-300">Latitude</span>
                  <input
                    type="number"
                    value={formData.lat}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, lat: e.target.value }))
                    }
                    step="any"
                    className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  {formErrors.lat && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.lat}
                    </p>
                  )}
                </label>

                <label>
                  <span className="text-gray-300">Longitude</span>
                  <input
                    type="number"
                    value={formData.lng}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, lng: e.target.value }))
                    }
                    step="any"
                    className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  {formErrors.lng && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.lng}
                    </p>
                  )}
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition"
                >
                  {editingStation ? "Update Station" : "Add Station"}
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
