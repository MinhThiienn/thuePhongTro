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
    <section className="mb-6 p-6 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Tổng quan bằng biểu đồ
      </h2>
      <div className="flex flex-wrap gap-8">
        <div className="flex-1 p-6 bg-gray-50 rounded-2xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Thống kê bằng Bar
          </h3>
          <div className="flex justify-center">
            <BarChart width={400} height={250} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fill: "#4b5563" }} />
              <YAxis tick={{ fill: "#4b5563" }} />
              <Tooltip wrapperClassName="bg-gray-50 p-2 rounded shadow-md" />
              <Legend wrapperClassName="font-semibold" />
              <Bar dataKey="qty" fill="#8884d8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </div>
        </div>

        {/* PieChart */}
        <div className="flex-1 p-6 bg-gray-50 rounded-2xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Thống kê bằng Pie
          </h3>
          <div className="flex justify-center">
            <PieChart width={400} height={250}>
              <Pie
                data={chartData}
                dataKey="qty"
                nameKey="name"
                label={{
                  position: "outside",
                  fill: "#4b5563",
                  fontWeight: "bold",
                }}
                labelLine={{ stroke: "#4b5563", strokeWidth: 1 }}
                outerRadius={100}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip wrapperClassName="bg-gray-50 p-2 rounded shadow-md" />
            </PieChart>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardChart;
