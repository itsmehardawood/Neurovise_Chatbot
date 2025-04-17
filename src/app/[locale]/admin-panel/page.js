"use client";

import { useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { BsToggle2Off } from "react-icons/bs";
import { BsToggle2On } from "react-icons/bs";
import ChatHistory from "@/app/components/chathistory";
import BackButton from "@/app/components/BackButton";

export default function ServicesAdminPage() {
  const [services, setServices] = useState([]);
  const [chatTone, setChatTone] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    serviceName: "",
    price: "",
    description: "",
    working_hours: {},
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await fetch("http://localhost:8000/business-service", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();

        setServices(data.services || []);
        setChatTone(data.chat_tone || "");
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleViewMore = (desc) => {
    setSelectedDescription(desc);
    setShowModal(true);
  };

  const fetchServiceDetails = async (serviceId, editMode = false) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8000/service/${serviceId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch service details: ${response.status}`);
      }

      const data = await response.json();
      setSelectedService(data);
      setEditForm({
        serviceName: data.serviceName,
        price: data.price,
        description: data.description,
        working_hours: data.working_hours || {},
      });
      setIsEditMode(editMode);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching service details:", error);
      alert(`Error loading service details: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // edit handler

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8000/service/${selectedService.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      if (response.ok) {
        alert("Changes Updated Successfully");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update service");
      }

      const updated = await response.json();
      setServices((prev) =>
        prev.map((svc) =>
          String(svc.id) === String(updated.id) ? updated : svc
        )
      );
      setShowModal(false);
      setIsEditMode(false);
      setSelectedService(null);
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating service: " + error.message);
    }
  };

  // del handler

  const deleteService = async (serviceId) => {
    try {
      const res = await fetch(`http://localhost:8000/service/${serviceId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to delete service");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error deleting service:", error.message);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
        setServices((prevList) =>
          prevList.filter((service) => String(service.id) !== String(id))
        );
      } catch (error) {
        alert("Error deleting service: " + error.message);
      }
    }
  };

  const toggleServiceStatus = async (serviceId, currentStatus) => {
    try {
      const token = localStorage.getItem("access_token");
      const newStatus = !currentStatus;

      const response = await fetch(
        `http://localhost:8000/service/${serviceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isActive: newStatus }),
        }
      );

      if (response.ok) {
        alert("Are you really want to change Active Status. If yes Press OK.");
      }

      if (!response.ok) {
        throw new Error("Failed to update service status");
      }

      // Update local state
      setServices(
        services.map((service) =>
          service.id === serviceId
            ? { ...service, isActive: newStatus }
            : service
        )
      );
    } catch (error) {
      console.error("Error toggling service status:", error);
      alert("Error updating service status: " + error.message);
    }
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const formatted = `${String(hour).padStart(2, "0")}:${String(
          min
        ).padStart(2, "0")}`;
        times.push(formatted);
      }
    }
    return times;
  };

  return (
    <div className="p-8 space-y-12 text-black min-h-screen bg-gradient-to-br from-slate-800 to-slate-900">
      <BackButton/>
      {/* SERVICES TABLE */}
      <section className="py-5">
        <h1 className="text-3xl font-bold mb-6 text-white">Services</h1>

        <div className="overflow-x-auto border border-gray-200 shadow-md rounded-lg bg-white">
          {/* Single table structure with scrollable body */}
          <div className="overflow-y-auto max-h-[40vh]">
            <table className="min-w-full table-fixed">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="w-1/5 text-left py-3 px-4 border-b">
                    Service
                  </th>
                  <th className="w-1/6 text-left py-3 px-4 border-b">Price</th>
                  <th className="w-2/5 text-left py-3 px-4 border-b">
                    Description
                  </th>
                  <th className="w-1/6 text-left py-3 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((service, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="py-3 px-4 border-b truncate">
                        {service.serviceName}
                      </td>
                      <td className="py-3 px-4 border-b truncate">
                        ${service.price}
                      </td>
                      <td className="py-3 px-4 border-b truncate">
                        {service.description.length > 30 ? (
                          <>
                            {service.description.substring(0, 40)}...
                            <button
                              onClick={() =>
                                handleViewMore(service.description)
                              }
                              className="text-blue-500 text-sm ml-2 underline"
                            >
                              View More
                            </button>
                          </>
                        ) : (
                          service.description
                        )}
                      </td>
                      <td className="py-3 px-4 border-b w-1/6">
                        {/* Options  Buttons */}

                        <div className="flex flex-row space-x-4 items-center">
                          {/* view */}
                          <button
                            onClick={() => {
                              fetchServiceDetails(service.id);
                            }}
                          >
                            <IoEyeSharp className="text-xl text-blue-950 hover:text-blue-600" />
                          </button>

                          {/* delete */}
                          <button onClick={() => handleDelete(service.id)}>
                            <RiDeleteBinLine className="text-xl text-red-500 hover:text-red-700" />
                          </button>

                          {/* edit */}
                          <button
                            onClick={() =>
                              fetchServiceDetails(service.id, true)
                            }
                          >
                            <FaEdit className="text-xl text-blue-500 hover:text-blue-700" />
                          </button>
                          {service.isActive ? (
                            <button
                              onClick={() =>
                                toggleServiceStatus(service.id, true)
                              }
                              title="Deactivate service"
                            >
                              <BsToggle2On className="text-3xl text-green-600" />
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                toggleServiceStatus(service.id, false)
                              }
                              title="Activate service"
                            >
                              <BsToggle2Off className="text-3xl text-gray-400" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No services available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CHAT HISTORY TABLE (static for now) */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">Chat History</h2>
            <ChatHistory/>

      </section>

      {/* MODAL FOR FULL DESCRIPTION */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50  z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode
                ? "Edit Service"
                : selectedService
                ? "Service Details"
                : "Full Description"}
            </h2>

            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : selectedService ? (
              <div className="space-y-4">
                {isEditMode ? (
                  <>
                    <div>
                      <label className="block font-medium">Service Name</label>
                      <input
                        className="border p-2 rounded w-full"
                        value={editForm.serviceName}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            serviceName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Price</label>
                      <input
                        type="text"
                        className="border p-2 rounded w-full"
                        value={editForm.price}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            price: parseFloat(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Description</label>
                      <textarea
                        className="border p-2 rounded w-full"
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Working hours{" "}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(editForm.working_hours || {}).map(
                          ([day, hours]) => (
                            <div
                              key={day}
                              className="border rounded-lg p-3 space-y-2"
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium capitalize">
                                  {day}
                                </span>
                                <label className="flex items-center space-x-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={hours.active}
                                    onChange={(e) =>
                                      setEditForm((prev) => ({
                                        ...prev,
                                        working_hours: {
                                          ...prev.working_hours,
                                          [day]: {
                                            ...prev.working_hours[day],
                                            active: e.target.checked,
                                          },
                                        },
                                      }))
                                    }
                                  />
                                  <span>{hours.active ? "open" : "close"}</span>
                                </label>
                              </div>

                              {hours.active && (
                                <div className="flex justify-between text-sm text-gray-600 space-x-2">
                                  {/* Start Time */}
                                  <select
                                    value={hours.start}
                                    onChange={(e) =>
                                      setEditForm((prev) => ({
                                        ...prev,
                                        working_hours: {
                                          ...prev.working_hours,
                                          [day]: {
                                            ...prev.working_hours[day],
                                            start: e.target.value,
                                          },
                                        },
                                      }))
                                    }
                                    className="border p-1 rounded w-full"
                                  >
                                    {generateTimeOptions().map((time) => (
                                      <option key={time} value={time}>
                                        {time}
                                      </option>
                                    ))}
                                  </select>

                                  <span className="self-center">to</span>

                                  {/* End Time */}
                                  <select
                                    value={hours.end}
                                    onChange={(e) =>
                                      setEditForm((prev) => ({
                                        ...prev,
                                        working_hours: {
                                          ...prev.working_hours,
                                          [day]: {
                                            ...prev.working_hours[day],
                                            end: e.target.value,
                                          },
                                        },
                                      }))
                                    }
                                    className="border p-1 rounded w-full"
                                  >
                                    {generateTimeOptions().map((time) => (
                                      <option key={time} value={time}>
                                        {time}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Service Name
                      </h3>
                      <p className="text-gray-700">
                        {selectedService.serviceName}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Price</h3>
                      <p className="text-gray-700">${selectedService.price}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Description</h3>
                      <p className="text-gray-700">
                        {selectedService.description}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Status</h3>
                      <p className="text-gray-700">
                        <span
                          className={`inline-block w-3 h-3 rounded-full mr-2 ${
                            selectedService.isActive
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></span>
                        {selectedService.isActive ? "Active" : "Inactive"}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Working Hours
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedService.working_hours &&
                          Object.entries(selectedService.working_hours).map(
                            ([day, hours]) => (
                              <div key={day} className="border rounded-lg p-3">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-medium capitalize">
                                    {day}
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-1 rounded ${
                                      hours.active
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {hours.active ? "Open" : "Closed"}
                                  </span>
                                </div>
                                {hours.active && (
                                  <div className="flex justify-between text-sm text-gray-600">
                                    <span>{hours.start}</span>
                                    <span>to</span>
                                    <span>{hours.end}</span>
                                  </div>
                                )}
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p className="text-gray-700">{selectedDescription}</p>
            )}

            <div className="mt-6 text-right space-x-2">
              {selectedService && (
                <>
                  {!isEditMode ? (
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  )}
                </>
              )}
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedService(null);
                  setIsEditMode(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        
      )}
    </div>
  );
}
