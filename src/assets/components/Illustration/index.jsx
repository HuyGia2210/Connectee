// src/components/Illustration.jsx

export default function Illustration() {
  return (
    <div className="relative w-full md:w-[420px] mt-10 md:mt-0">
      {/* Ảnh hoạt hình: cầu vồng */}
      <img
        src="/rainbow-character.png"
        alt="Rainbow Character"
        className="absolute -top-10 -left-10 w-20"
      />

      {/* Ảnh hoạt hình: trái tim */}
      <img
        src="/heart.png"
        alt="Heart"
        className="absolute bottom-0 -right-10 w-20"
      />

      {/* Hình điện thoại thứ nhất (sau) */}
      <img
        src="/messenger-mockup-2.png"
        alt="Connectee Screen 2"
        className="w-full rounded-xl shadow-xl opacity-90"
      />

      {/* Hình điện thoại thứ hai (trước) */}
      <img
        src="/messenger-mockup-1.png"
        alt="Connectee Screen 1"
        className="absolute top-10 left-10 w-full rounded-xl shadow-2xl"
      />
    </div>
  );
}
