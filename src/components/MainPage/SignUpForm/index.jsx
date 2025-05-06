import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUpForm({ onBack }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    email: "",
    nickname: "",
    username: "",
    password: "",
    dob: "",
  });

  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [dayError, setDayError] = useState(null);
  const [monthError, setMonthError] = useState(null);
  const [yearError, setYearError] = useState(null);
  const [genderError, setGenderError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [nicknameError, setNicknameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [suggestedUsernames, setSuggestedUsernames] = useState([]);
  const [suggestedNicknames, setSuggestedNicknames] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkNullInput = (e) => {
    let pointer = e.target.name;
    let value = e.target.value;
    switch (pointer) {
      case "firstName":
        if (value === null || value === "") {
          setFirstNameError("Không được để trống");
        } else {
          setFirstNameError(null);
        }
        break;

      case "lastName":
        if (value === null || value === "") {
          setLastNameError("Không được để trống");
        } else {
          setLastNameError(null);
        }
        break;

      case "day":
        if (isNaN(value)) {
          setDayError("Không để trống");
        } else {
          setDayError(null);
        }
        break;

      case "month":
        if (isNaN(value)) {
          setMonthError("Không để trống");
        } else {
          setMonthError(null);
        }
        break;

      case "year":
        if (isNaN(value)) {
          setYearError("Không để trống");
        } else {
          setYearError(null);
        }
        break;

      case "gender":
        if (value === "") {
          setGenderError("Không được để trống");
        } else {
          setGenderError(null);
        }
        break;

      case "email":
        if (value === null || value === "") {
          setEmailError("Không được để trống");
        } else {
          setEmailError(null);
        }
        break;

      case "password":
        if (value === null || value === "") {
          setPasswordError("Không được để trống");
        } else {
          setPasswordError(null);
        }
        break;
      case "nickname":
        if (value === null || value === "") {
          setNicknameError("Không được để trống");
        } else {
          setNicknameError(null);
        }
        break;
      case "username":
        if (value === null || value === "") {
          setUsernameError("Không được để trống");
        } else {
          setUsernameError(null);
        }
        break;
    }
  };

  const checkNicknameAvailability = async (nickname) => {
    try {
      const res = await fetch(
        `${API_URL}/api/user/check-valid-nickname?nickname=${nickname}`,
        { method: "GET" }
      );

      if (!res.ok) {
        throw new Error("Không thể kiểm tra biệt danh.");
      }

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        return data;
      } catch (e) {
        console.error("Phản hồi không phải JSON hợp lệ:", e);
        return false;
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra biệt danh:", error);
      return false;
    }
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const res = await fetch(
        `${API_URL}/api/user/check-valid-username?username=${username}`,
        { method: "GET" }
      );

      if (!res.ok) {
        throw new Error("Không thể kiểm tra tên đăng nhập.");
      }

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        return data;
      } catch (e) {
        console.error("Phản hồi không phải JSON hợp lệ:", e);
        return false;
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra tên đăng nhập:", error);
      return false;
    }
  };

  const handleUsernameBlur = async (e) => {
    const isExist = await checkUsernameAvailability(form.username);
    if (isExist) {
      setUsernameError("Username đã tồn tại!");
      setSuggestedUsernames(generateRandomSuggestions("username"));
    } else {
      setUsernameError(null);
      setSuggestedUsernames([]);
      checkNullInput(e);
    }
  };

  const handleNicknameBlur = async (e) => {
    const isExist = await checkNicknameAvailability(form.nickname);
    if (isExist) {
      setNicknameError("Nickname đã tồn tại!");
      setSuggestedNicknames(generateRandomSuggestions("nickname"));
    } else {
      setNicknameError(null);
      setSuggestedNicknames([]);
      checkNullInput(e);
    }
  };

  const generateRandomSuggestions = (type) => {
    const prefix = type === "username" ? "user" : "nick";
    const suggestions = [];
    for (let i = 0; i < 5; i++) {
      suggestions.push(`${prefix}${Math.floor(Math.random() * 10000)}`);
    }
    return suggestions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      usernameError ||
      nicknameError ||
      firstNameError ||
      lastNameError ||
      dayError ||
      monthError ||
      yearError ||
      passwordError ||
      genderError
    ) {
      alert("Vui lòng không để trống các ô điền thông tin đăng ký");
      return;
    }

    const fullName = `${form.lastName} ${form.firstName}`;
    const dob = `${form.year}-${form.month.padStart(
      2,
      "0"
    )}-${form.day.padStart(2, "0")}`;
    const gender = form.gender.toUpperCase();

    const payload = {
      username: form.username,
      fullName,
      nickName: form.nickname,
      dob,
      gender,
      email: form.email,
      password: form.password,
    };

    try {
      setIsSubmitting(true);
      const res = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (res.ok) {
        const nickResp = await axios.get(
          `${API_URL}/api/user/get-nickname`,
          { withCredentials: true }
        );

        if (nickResp.status === 200) {
          const nickname = nickResp.data;
          localStorage.setItem("nickname", nickname);
        }
        navigate("/chat");
      } else {
        const errMsg = await res.text();
        console.error("Server trả lỗi:", res.status, errMsg);
        alert("Đăng ký thất bại: " + errMsg);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md mx-auto">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              name="lastName"
              type="text"
              placeholder="Họ"
              className="px-4 py-2 border rounded-md w-full"
              onChange={handleChange}
              onBlur={checkNullInput}
            />
            {lastNameError !== null && (
              <span className="text-red-500 text-sm">{lastNameError}</span>
            )}
          </div>
          <div>
            <input
              name="firstName"
              type="text"
              placeholder="Tên"
              className="px-4 py-2 border rounded-md w-full"
              onChange={handleChange}
              onBlur={checkNullInput}
            />
            {firstNameError !== null && (
              <span className="text-red-500 text-sm">{firstNameError}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <select
              name="day"
              className="px-4 py-2 border rounded-md w-full"
              onChange={handleChange}
              onBlur={checkNullInput}
            >
              <option>Ngày</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {dayError !== null && (
              <span className="text-red-500 text-sm">{dayError}</span>
            )}
          </div>
          <div>
            <select
              name="month"
              className="px-4 py-2 border rounded-md w-full"
              onChange={handleChange}
              onBlur={checkNullInput}
            >
              <option>Tháng</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {monthError !== null && (
              <span className="text-red-500 text-sm">{monthError}</span>
            )}
          </div>
          <div>
            <select
              name="year"
              className="px-4 py-2 border rounded-md w-full"
              onChange={handleChange}
              onBlur={checkNullInput}
            >
              <option>Năm</option>
              {Array.from({ length: 100 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            {yearError !== null && (
              <span className="text-red-500 text-sm">{yearError}</span>
            )}
          </div>
        </div>

        <div>
          <select
            name="gender"
            onChange={handleChange}
            value={form.gender}
            onBlur={checkNullInput}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
          {genderError !== null && (
            <span className="text-red-500 text-sm">{genderError}</span>
          )}
        </div>

        <div>
          <input
            name="email"
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            onBlur={checkNullInput}
          />
          {emailError !== null && (
            <span className="text-red-500 text-sm">{emailError}</span>
          )}
        </div>

        <div>
          <input
            name="nickname"
            type="text"
            placeholder="Biệt danh (Không trùng biệt danh với người khác)"
            className={`w-full px-4 py-2 border rounded-md ${
              nicknameError ? "border-red-500" : ""
            }`}
            onChange={handleChange}
            onBlur={handleNicknameBlur}
          />
          {nicknameError && <p className="text-red-500 text-sm">{nicknameError}</p>}
          <div className="flex flex-wrap gap-2 mt-2">
            {nicknameError != null && nicknameError != "Không được để trống" && (
              <span className="text-sm text-gray-600">
                Một số biệt danh bạn có thể chọn:
              </span>
            )}
            {suggestedNicknames.map((suggestion, index) => (
              <span
                key={index}
                className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300 text-sm"
              >
                {suggestion}
              </span>
            ))}
          </div>
        </div>

        <div>
          <input
            name="username"
            type="text"
            placeholder="Tên đăng nhập (Không trùng với người khác)"
            className={`w-full px-4 py-2 border rounded-md ${
              usernameError ? "border-red-500" : ""
            }`}
            onChange={handleChange}
            onBlur={handleUsernameBlur}
          />
          {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
          <div className="flex flex-wrap gap-2 mt-2">
            {usernameError != null && usernameError != "Không được để trống" && (
              <span className="text-sm text-gray-600">
                Một số tên đăng nhập bạn có thể chọn:
              </span>
            )}
            {suggestedUsernames.map((suggestion, index) => (
              <span
                key={index}
                className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300 text-sm"
              >
                {suggestion}
              </span>
            ))}
          </div>
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            onBlur={checkNullInput}
          />
          {passwordError != null && (
            <span className="text-red-500 text-sm">{passwordError}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 text-white font-semibold rounded-md ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Đang gửi..." : "Gửi"}
        </button>
      </form>

      <button
        onClick={onBack}
        className="w-full mt-4 border text-blue-600 border-gray-300 py-2 rounded-md hover:bg-gray-50"
      >
        Tôi có tài khoản rồi
      </button>
    </div>
  );
}
