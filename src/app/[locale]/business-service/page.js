"use client";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "@/lib/translations";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";
import LogoutButton from "@/app/components/LogoutButton";
import LanguageButton from "@/app/components/LanguageButton";
import FloatingLanguageButton from "@/app/components/FloatingLanguagebutton";
import Navbar from "@/app/components/Navbar";

const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poppins",
});

const ServiceManagement = () => {
  const router = useRouter();
  const { locale } = useParams();
  const t = useTranslation(locale || "he");

  // Service Management State
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [priceType, setPriceType] = useState(t("flatFee"));
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Working Hours State
  const [workingHours, setWorkingHours] = useState({
    [t("monday")]: { start: "09:00", end: "17:00", active: true },
    [t("tuesday")]: { start: "09:00", end: "17:00", active: true },
    [t("wednesday")]: { start: "09:00", end: "17:00", active: true },
    [t("thursday")]: { start: "09:00", end: "17:00", active: true },
    [t("friday")]: { start: "09:00", end: "17:00", active: true },
    [t("saturday")]: { start: "09:00", end: "17:00", active: false },
    [t("sunday")]: { start: "09:00", end: "17:00", active: false },
  });

  const [selectedTone, setSelectedTone] = useState(t("friendlyOption"));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [addServiceSuccess, setAddServiceSuccess] = useState(false);

  const handleServiceSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!serviceName.trim() || !price.trim()) {
      setSubmitError(t("Please Fill out the required Fields")); // Or hardcode a message like "Please fill in required fields."
      return;
    }

    const convertWorkingHours = (hoursObj) => {
      const converted = {};
      for (const day in hoursObj) {
        converted[day.toLowerCase()] = hoursObj[day];
      }
      return converted;
    };

    const newService = {
      serviceName,
      description,
      priceType,
      price,
      isActive,
      id: Date.now(),
      working_hours: convertWorkingHours(workingHours),
    };

    try {
      setIsSubmitting(true);
      setSubmitError("");
      setAddServiceSuccess(false);

      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://ecochatbot-production.up.railway.app/business-service",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            services: [newService],
            working_hours: {},
            chat_tone: selectedTone,
          }),
        }
      );

      if (!response.ok) throw new Error(t("error.saveFailed"));

      const result = await response.json();
      setAddServiceSuccess(true);
      setServices([...services, newService]);

      // Reset fields
      setServiceName("");
      setDescription("");
      setPrice("");
      setIsActive(true);
      setTimeout(() => setAddServiceSuccess(false), 3000);
    } catch (error) {
      setSubmitError(error.message || t("error.saveFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Working Hours Handlers
  const toggleDayActive = (day) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], active: !prev[day].active },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleSubmitAll = () => {
    // Since we're saving each service immediately, this can just redirect
    router.push(`/${locale}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push(`/${locale}/login`);
    } else {
      setIsAuthChecked(true);
    }
  }, []);

  if (isAuthChecked) {
    return (
      <>
        <div className=" top-4 right-25 z-50">
          {/* <LogoutButton />
          <FloatingLanguageButton/> */}
          <Navbar />
          </div>

        <div
          className={`min-h-screen text-black bg-slate-900 bg-gradient-to-bl from-blue-900 via-transparent to-blue-900 ${PoppinsFont.variable} font-sans`}
        >
          {/* <BackButton /> */}

          <div className="container mx-auto px-3 py-4">
            {/* <Image
              src="/images/logo.png"
              height="180"
              width="180"
              alt="this is our logo"
            /> */}

            <div className="bg-white p-5 rounded-lg shadow-md max-w-4xl mx-auto">
              <h1 className="text-gray-900 text-xl font-semibold mb-6">
                {t("serviceManagement")}
              </h1>

              {/* Service Form */}
              <form onSubmit={handleServiceSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="serviceName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("serviceName")}*
                    </label>
                    <input
                      type="text"
                      id="serviceName"
                      placeholder={t("acService")}
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="priceType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("pricingType")}*
                    </label>
                    <select
                      id="priceType"
                      value={priceType}
                      onChange={(e) => setPriceType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={t("flatFee")}>{t("flatFee")}</option>
                      <option value={t("pricePerHour")}>
                        {t("pricePerHour")}
                      </option>
                      <option value={t("customPricing")}>
                        {t("customPricing")}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("description")} {t("optional")}
                  </label>
                  <textarea
                    id="description"
                    placeholder={t("serviceNeed")}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {description.length} {t("characters")}
                  </p>
                </div>

              

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("price")}*
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2">$</span>
                      <input
                        type="text"
                        id="price"
                        placeholder={t("priceValue")}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        min="0"
                        // step="0.01"
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
                      <span className="ml-2 text-sm text-gray-700">
                        {t("enableService")}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Add Service Button moved inside form */}
              </form>

              {/* Working Hours */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">
                  {t("workingHours")}
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("day")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("startTime")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("endTime")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("active")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.keys(workingHours).map((day) => (
                        <tr key={day}>
                          <td className="px-4 py-3">{day}</td>
                          <td className="px-4 py-3">
                            <select
                              value={workingHours[day].start}
                              onChange={(e) =>
                                handleTimeChange(day, "start", e.target.value)
                              }
                              className="border rounded px-2 py-1"
                            >
                              {Array.from({ length: 24 * 2 }, (_, i) => {
                                const hour = Math.floor(i / 2)
                                  .toString()
                                  .padStart(2, "0");
                                const minute = i % 2 === 0 ? "00" : "30"; // change to "15" and "45" for 15-min steps
                                const time = `${hour}:${minute}`;
                                return (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                );
                              })}
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={workingHours[day].end}
                              onChange={(e) =>
                                handleTimeChange(day, "end", e.target.value)
                              }
                              className="border rounded px-2 py-1"
                            >
                              {Array.from({ length: 24 * 2 }, (_, i) => {
                                const hour = Math.floor(i / 2)
                                  .toString()
                                  .padStart(2, "0");
                                const minute = i % 2 === 0 ? "00" : "30"; // change to "15" and "45" for 15-min steps
                                const time = `${hour}:${minute}`;
                                return (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                );
                              })}
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <input
                              step="60"
                              lang="en-GB"
                              type="checkbox"
                              checked={workingHours[day].active}
                              onChange={() => toggleDayActive(day)}
                              className="h-4 w-4"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Chat Communication Style */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">
                  {t("chatCommunicationStyle")}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="friendly-tone"
                      name="tone"
                      checked={selectedTone === t("friendlyOption")}
                      onChange={() => setSelectedTone(t("friendlyOption"))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="friendly-tone"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      <span className="font-medium">{t("friendlyOption")}</span>{" "}
                      - {t("warmTone")}
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="formal-tone"
                      name="tone"
                      checked={selectedTone === t("formalOption")}
                      onChange={() => setSelectedTone(t("formalOption"))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="formal-tone"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      <span className="font-medium">{t("formalOption")}</span> -{" "}
                      {t("professionalTone")}
                    </label>
                  </div>
                </div>
              </div>

              {/* Done Button */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={handleSubmitAll}
                  className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {t("done")}
                </button>
                <button
                  onClick={handleServiceSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isSubmitting ? t("saving") : t("addService")}
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
                  <p className="text-sm text-green-600">
                    {t("Service Setting Added Succesfully")}
                  </p>
                </div>
              )}
              {addServiceSuccess && (
                <div className="mt-4 p-3 bg-green-50 rounded-md">
                  <p className="text-sm text-green-600">
                    {t("Service Setting Added Succesfully")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ServiceManagement;
