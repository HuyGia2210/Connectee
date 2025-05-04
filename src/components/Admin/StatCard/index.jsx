// src/assets/components/StatCard/index.jsx
export default function StatCard({ title, value, textColor  }) {
    return (
      <div className="bg-gray-200 p-4 rounded-lg shadow-xl ">
        <h3 className="text-md text-gray-600">{title}</h3>
        <div className="flex items-center justify-center mt-2">
          <div>
            <div className={`text-2xl font-semibold ${textColor}`}>{value}</div>
          </div>
        </div>
      </div>
    );
  }