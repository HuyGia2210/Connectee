export default function StatCard({ title, value, textColor }) {
  return (
    <div className="bg-gradient-to-r from-white to-gray-50 p-4 sm:p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-200">
      <h3 className="text-sm sm:text-lg font-semibold text-gray-600">{title}</h3>
      <div className="flex items-center justify-center mt-2 sm:mt-3">
        <div>
          <div className={`text-xl sm:text-2xl font-bold ${textColor}`}>{value}</div>
        </div>
      </div>
    </div>
  );
}
