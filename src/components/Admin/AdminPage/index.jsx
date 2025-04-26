// src/assets/components/AdminPage/index.jsx
import AdminSidebar from "../AdminSidebar";
import AdminHeader from "../AdminHeader";
import StatisticsSection from "../StatisticsSection";
import UserTable from "../UserTable";

export default function AdminPage() {
  return (
    <div className="h-screen flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
          <StatisticsSection />
          <UserTable />
        </div>
      </div>
    </div>
  );
}