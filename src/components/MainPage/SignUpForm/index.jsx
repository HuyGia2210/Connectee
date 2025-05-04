import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUpForm({ onBack }) {
  const navigate = useNavigate();
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

  // Error states for username and nickname
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
        `http://localhost:8080/api/user/check-valid-nickname?nickname=${nickname}`,
        { method: "GET" }
      );

      if (!res.ok) {
        throw new Error("Không thể kiểm tra biệt danh.");
      }

      // Kiểm tra xem phản hồi có phải là JSON hợp lệ
      const text = await res.text(); // Chuyển sang text trước
      try {
        const data = JSON.parse(text); // Cố gắng parse thành JSON
        return data; // Trả về true nếu trùng, false nếu không trùng
      } catch (e) {
        console.error("Phản hồi không phải JSON hợp lệ:", e);
        return false; // Xử lý khi JSON không hợp lệ
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra biệt danh:", error);
      return false; // Giả sử không trùng khi có lỗi
    }
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/user/check-valid-username?username=${username}`,
        { method: "GET" }
      );

      if (!res.ok) {
        throw new Error("Không thể kiểm tra tên đăng nhập.");
      }

      // Kiểm tra phản hồi là JSON hợp lệ
      const text = await res.text(); // Chuyển sang text trước
      try {
        const data = JSON.parse(text); // Cố gắng parse thành JSON
        return data; // Trả về true nếu trùng, false nếu không trùng
      } catch (e) {
        console.error("Phản hồi không phải JSON hợp lệ:", e);
        return false; // Xử lý khi JSON không hợp lệ
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra tên đăng nhập:", error);
      return false; // Giả sử không trùng khi có lỗi
    }
  };

  // Handle username blur
  const handleUsernameBlur = async (e) => {
    const isExist = await checkUsernameAvailability(form.username);
    if (isExist) {
      setUsernameError("Username đã tồn tại!");
      // Suggest some random usernames
      setSuggestedUsernames(generateRandomSuggestions("username"));
    } else {
      setUsernameError(null);
      setSuggestedUsernames([]);
      checkNullInput(e);
    }
  };

  // Handle nickname blur
  const handleNicknameBlur = async (e) => {
    const isExist = await checkNicknameAvailability(form.nickname);
    if (isExist) {
      setNicknameError("Nickname đã tồn tại!");
      // Suggest some random nicknames
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

    // Nếu có lỗi thì không cho phép đăng ký
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

    // Chuẩn hóa dữ liệu theo DTO RegisterRequest
    const fullName = `${form.lastName} ${form.firstName}`;
    const dob = `${form.year}-${form.month.padStart(
      2,
      "0"
    )}-${form.day.padStart(2, "0")}`;
    const gender = form.gender.toUpperCase(); // MALE / FEMALE / OTHER

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
      const res = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (res.ok) {
        const nickResp = await axios.get(
          "http://localhost:8080/api/user/get-nickname",
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
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
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
              <span className="text-red-500">{lastNameError}</span>
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
              <span className="text-red-500">{firstNameError}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <select
              name="day"
              className="px-4 py-2 border rounded-md"
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
              <span className="text-red-500">{dayError}</span>
            )}
          </div>
          <div>
            <select
              name="month"
              className="px-4 py-2 border rounded-md"
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
              <span className="text-red-500">{monthError}</span>
            )}
          </div>
          <div>
            <select
              name="year"
              className="px-4 py-2 border rounded-md"
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
              <span className="text-red-500">{yearError}</span>
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
            <span className="text-red-500">{genderError}</span>
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
            <span className="text-red-500">{emailError}</span>
          )}
        </div>

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
        {nicknameError && <p className="text-red-500">{nicknameError}</p>}
        <div className="flex overflow-x-auto space-x-4 mt-2 items-center">
          {nicknameError != null && nicknameError != "Không được để trống" && (
            <span className="whitespace-nowrap">
              Một số biệt danh bạn có thể chọn:{" "}
            </span>
          )}
          {suggestedNicknames.map((suggestion, index) => (
            <span
              key={index}
              className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300"
            >
              {suggestion}
            </span>
          ))}
        </div>

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
        {usernameError && <p className="text-red-500">{usernameError}</p>}

        <div className="flex overflow-x-auto space-x-4 mt-2 items-center">
          {usernameError != null && usernameError != "Không được để trống" && (
            <span className="whitespace-nowrap">
              Một số tên đăng nhập bạn có thể chọn:{" "}
            </span>
          )}
          {suggestedUsernames.map((suggestion, index) => (
            <span
              key={index}
              className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300"
            >
              {suggestion}
            </span>
          ))}
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
            <span className="text-red-500">{passwordError}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
        >
          Gửi
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
