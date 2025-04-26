// src/assets/components/Pagination/index.jsx
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Tạo mảng các số trang để hiển thị
  const getPageNumbers = () => {
    const maxPagesToShow = 5; // Số trang tối đa hiển thị trước khi dùng "..."
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Thêm các số trang vào mảng
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Thêm "..." và trang cuối nếu cần
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    // Thêm trang 1 và "..." nếu cần
    if (startPage > 1) {
      pages.unshift(1);
      if (startPage > 2) pages.splice(1, 0, "...");
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center mt-4 space-x-2">
      {/* Nút Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>

      {/* Các số trang */}
      {pageNumbers.map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`px-3 py-1 rounded-full ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : typeof page === "number"
              ? "text-gray-600 hover:bg-gray-100"
              : "text-gray-600"
          } ${typeof page !== "number" ? "cursor-default" : ""}`}
        >
          {page}
        </button>
      ))}

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
}