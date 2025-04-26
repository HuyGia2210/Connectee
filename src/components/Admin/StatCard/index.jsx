// src/assets/components/StatCard/index.jsx
export default function StatCard({ title, value, change, changeColor }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm text-gray-600">{title}</h3>
        <div className="flex items-center justify-center mt-2">
          <div>
            <div className="text-2xl font-semibold">{value}</div>
            <div className={`text-sm ${changeColor}`}>{change}</div>
          </div>
        </div>
      </div>
    );
  }