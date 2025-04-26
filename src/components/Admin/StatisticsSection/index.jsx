// src/assets/components/StatisticsSection/index.jsx
import StatCard from "../StatCard";

export default function StatisticsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard
        title="New Users Today"
        value="124"
        change="+15%"
        changeColor="text-green-500"
      />
      <StatCard
        title="Total Messages Sent"
        value="1,245"
        change="-8.5%"
        changeColor="text-red-500"
      />
      <StatCard
        title="Total Active Users"
        value="1250"
        change="-85.5"
        changeColor="text-red-500"
      />
      <StatCard
        title="Steps walked today"
        value="7520"
        change="+75%"
        changeColor="text-green-500"
      />
    </div>
  );
}