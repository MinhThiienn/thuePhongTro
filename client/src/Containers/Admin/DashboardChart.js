import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardChart = ({ chartData, COLORS }) => {
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Tổng quan bằng biểu đồ</h2>
      <div className="flex gap-10">
        {/* BarChart */}
        <div className="flex-1 p-4 bg-gray-100 rounded shadow-md">
          <BarChart width={400} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="qty" fill="#8884d8" />
          </BarChart>
        </div>

        {/* PieChart */}
        <div className="flex-1 p-4 bg-gray-100 rounded shadow-md">
          <PieChart width={250} height={250}>
            <Pie
              data={chartData}
              dataKey="qty"
              nameKey="name"
              label
              outerRadius={100}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </section>
  );
};

export default DashboardChart;
