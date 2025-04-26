import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    nickName: "",
    dob: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    console.log(payload)

    try {
      const res = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include"
      });

      if (res.ok) {
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
          <input
            name="lastName"
            type="text"
            placeholder="Họ"
            className="px-4 py-2 border rounded-md w-full"
            onChange={handleChange}
          />
          <input
            name="firstName"
            type="text"
            placeholder="Tên"
            className="px-4 py-2 border rounded-md w-full"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <select
          name="day"
          className="px-4 py-2 border rounded-md"
          onChange={handleChange}
          >
            <option>Ngày</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
          name="month"
          className="px-4 py-2 border rounded-md"
          onChange={handleChange}
          >
            <option>Tháng</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
          name="year"
          className="px-4 py-2 border rounded-md"
          onChange={handleChange}
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
        </div>

        <select
          name="gender"
          onChange={handleChange}
          value={form.gender}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">Chọn giới tính</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="other">Khác</option>
        </select>

        <input
          name="email"
          type="text"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md"
          onChange={handleChange}
        />

        <input
          name="nickname"
          type="text"
          placeholder="Biệt danh của người dùng (Không trùng với các biệt danh khác)"
          className="w-full px-4 py-2 border rounded-md"
          onChange={handleChange}
        />

        <input
          name="username"
          type="text"
          placeholder="Tên người dùng (tên đăng nhập)"
          className="w-full px-4 py-2 border rounded-md"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          className="w-full px-4 py-2 border rounded-md"
          onChange={handleChange}
        />

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
