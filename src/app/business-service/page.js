'use client';

import { Poppins } from 'next/font/google';
import { useState } from 'react';

const PoppinsFont = Poppins({
  subsets: ['latin'],
  weight: "400",
  variable: '--font-poppins',
});

const ServiceManagement = () => {
  // Service Management State
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [priceType, setPriceType] = useState('Flat Fee');
  const [price, setPrice] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Working Hours State
  const [workingHours, setWorkingHours] = useState({
    Monday: { start: '09:00', end: '17:00', active: true },
    Tuesday: { start: '09:00', end: '17:00', active: true },
    Wednesday: { start: '09:00', end: '17:00', active: true },
    Thursday: { start: '09:00', end: '17:00', active: true },
    Friday: { start: '09:00', end: '17:00', active: true },
    Saturday: { start: '09:00', end: '17:00', active: false },
    Sunday: { start: '09:00', end: '17:00', active: false },
  });

  const [selectedTone, setSelectedTone] = useState('Friendly');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    const newService = { 
      serviceName, 
      description, 
      priceType, 
      price, 
      isActive,
      id: Date.now()
    };
    setServices([...services, newService]);
    setServiceName('');
    setDescription('');
    setPrice('');
    setIsActive(true);
  };

  // Delete Service Handler
  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  // Working Hours Handlers
  const toggleDayActive = (day) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: { ...prev[day], active: !prev[day].active },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  // Submit All Data to Backend
  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const payload = {
        services,
        workingHours,
        chatTone: selectedTone,
      };

      const response = await fetch('/api/save-business-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save settings');

      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error.message || 'Failed to save. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen text-black bg-slate-900 bg-gradient-to-bl from-blue-900 via-transparent to-blue-900 ${PoppinsFont.variable} font-sans`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-white text-2xl font-bold pl-5 pb-5 font-poppins`}>Echo</h1>

        <div className="bg-white p-5 rounded-lg shadow-md max-w-4xl mx-auto">
          <h1 className="text-gray-900 text-xl font-semibold mb-6">Service Management</h1>
          
          {/* Service Form */}
          <form onSubmit={handleServiceSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700 mb-1">Service Name*</label>
                <input
                  type="text"
                  id="serviceName"
                  placeholder="AC Service Car Service"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="priceType" className="block text-sm font-medium text-gray-700 mb-1">Pricing Type*</label>
                <select
                  id="priceType"
                  value={priceType}
                  onChange={(e) => setPriceType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Flat Fee">Flat Fee</option>
                  <option value="Price per Hour">Price per Hour</option>
                  <option value="Custom Pricing">Custom Pricing</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <textarea
                id="description"
                placeholder="I need a serice for AC indoor outdoor"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                maxLength={100}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">{description.length}/100 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                <div className="relative">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="number"
                    id="price"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <label className="inline-flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable Service</span>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Service
              </button>
            </div>
          </form>

          {/* Working Hours */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Working Hours</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.keys(workingHours).map((day) => (
                    <tr key={day}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{day}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="time"
                          value={workingHours[day].start}
                          onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="time"
                          value={workingHours[day].end}
                          onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={workingHours[day].active}
                          onChange={() => toggleDayActive(day)}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Service List */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Services List</h2>
            {services.length === 0 ? (
              <p className="text-gray-500 text-sm">No services added yet</p>
            ) : (
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{service.serviceName}</h3>
                        {service.description && <p className="text-sm text-gray-600 mt-1">{service.description}</p>}
                        <div className="flex space-x-4 mt-2 text-sm">
                          <span>Type: {service.priceType}</span>
                          <span>Price: ${service.price}</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {service.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Chat Communication Style */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Chat Communication Style</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="friendly-tone"
                  name="tone"
                  checked={selectedTone === 'Friendly'}
                  onChange={() => setSelectedTone('Friendly')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="friendly-tone" className="ml-2 block text-sm text-gray-700">
                  <span className="font-medium">Friendly</span> - Warm and approachable tone
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="formal-tone"
                  name="tone"
                  checked={selectedTone === 'Formal'}
                  onChange={() => setSelectedTone('Formal')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="formal-tone" className="ml-2 block text-sm text-gray-700">
                  <span className="font-medium">Formal</span> - Professional and precise tone
                </label>
              </div>
            </div>
          </div>

          {/* Submit All Button */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={handleSubmitAll}
              disabled={isSubmitting || services.length === 0}
              className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : 'Confirm & Save Settings'}
            </button>
          </div>

          {/* Status Messages */}
          {submitError && (
            <div className="mt-4 p-3 bg-red-50 rounded-md">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}
          {submitSuccess && (
            <div className="mt-4 p-3 bg-green-50 rounded-md">
              <p className="text-sm text-green-600">Settings saved successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;