export default function FeatureCard({ title, description }) {
    return (
      <div className="bg-blue-50 p-6 rounded-xl w-64 shadow-sm hover:shadow-md transition">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a href="#" className="text-blue-600 text-xl hover:underline">
          →
        </a>
      </div>
    );
  }
  