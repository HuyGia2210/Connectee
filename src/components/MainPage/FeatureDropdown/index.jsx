export default function FeatureDropdown() {
  const features = [
    {
      title: "Trợ giúp",
      description: "Quan tâm đến gia đình và bạn bè bằng cách kết nối hàng ngày.",
    },
    {
      title: "Kết nối",
      description: "Xây dựng cộng đồng với những người có cùng đam mê và sở thích.",
    },
    {
      title: "Thể hiện",
      description: "Thể hiện cá tính và bày tỏ bản thân mà không giới hạn ở ngôn từ.",
    },
  ];

  return (
    <div className="bg-blue-50 rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-[900px]">
      {features.map((item, index) => (
        <div
          key={index}
          className="bg-white/50 hover:bg-white transition rounded-lg p-4"
        >
          <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
          <p className="text-gray-700 mt-2">{item.description}</p>
          <div className="mt-4 text-blue-600 text-lg">→</div>
        </div>
      ))}
    </div>
  );
}
