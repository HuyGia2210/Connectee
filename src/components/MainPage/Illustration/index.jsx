// src/components/Illustration.jsx
import messageSample from "../../../images/tinnhan.png"

export default function Illustration() {
  return (
    <div className="relative w-full md:w-[420px] mt-10 md:mt-0">
      
      {/* Hình điện thoại thứ nhất (sau) */}
      <img
        src={messageSample}
        alt="Connectee Screen 2"
        className="absolute top-20 w-full rounded-xl shadow-xl opacity-90"
      />

      {/* Hình điện thoại thứ hai (trước) */}
      <img
        src={messageSample}
        alt="Connectee Screen 1"
        className="absolute top-50 left-30 w-full rounded-xl shadow-2xl"
      />
    </div>
  );
}
