import locales from "@/language/locales";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ChangeInfomation({ appUser, scrMode, lang }) {
  const [formData, setFormData] = useState({
    fullName: appUser.fullName || "",
    dob: appUser.dob || "",
    gender: appUser.gender || "",
    email: appUser.email || "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isDark = scrMode === "dark";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "", // clear lỗi khi người dùng sửa
    }));
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = locales[lang].nullFullName;
    if (!formData.dob) newErrors.dob = locales[lang].nullBirthdate;
    if (!formData.gender) newErrors.gender = locales[lang].nullGender;
    if (!formData.email.trim()) newErrors.email = locales[lang].nullEmail;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const saveInfo = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/user/update-information",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
          }
        );

        if (res.ok) {
          setShowSuccessModal(true);
          setTimeout(() => setShowSuccessModal(false), 1500);
        }
      } catch (e) {
        console.log(e);
      }
    };
    saveInfo();
  };

  return (
    <div
      className={`relative p-6 rounded-xl shadow-md transition-all duration-300 ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="text-xl font-semibold mb-4">{locales[lang].changeInfomation}</h3>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block mb-1 text-sm font-medium">{locales[lang].fullName}</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full p-2 border rounded transition ${
              isDark
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-1 text-sm font-medium">{locales[lang].birthdate}</label>
          <DatePicker
            selected={formData.dob ? new Date(formData.dob) : null}
            onChange={(date) => {
              setFormData({ ...formData, dob: date });
              setErrors((prev) => ({ ...prev, dob: "" }));
            }}
            dateFormat="dd/MM/yyyy"
            className={`w-full p-2 border rounded ${
              isDark
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 text-sm font-medium">{locales[lang].gender}</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full p-2 border rounded transition ${
              isDark
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          >
            <option value="">{locales[lang].chooseGender}</option>
            <option value="MALE">{locales[lang].male}</option>
            <option value="FEMALE">{locales[lang].female}</option>
            <option value="OTHER">{locales[lang].other}</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded transition ${
              isDark
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {locales[lang].save}
        </button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            className={`p-6 rounded-xl shadow-lg text-center ${
              isDark ? "bg-gray-700 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-lg font-semibold mb-2">
              ✔️ {locales[lang].updateSuccessful}
            </h2>
            <p className="text-sm">{locales[lang].saveInfoSuccessfull}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangeInfomation;
