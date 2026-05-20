import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  Legend,
  Tooltip,
  DataLabel
} from "@syncfusion/ej2-react-charts";

// ✅ Monthly dummy attendance data (percentage)
const dummyData = [78, 82, 80, 88, 86, 91, 85, 87, 89, 92, 93, 88];

export default function AttendanceChart({ data = dummyData }) {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const seriesData = months.map((month, index) => ({
    x: month,
    y: data[index] ?? 0
  }));

  return (
    <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm w-full">
      {/* ✅ Title Updated */}
      <p className="text-md font-semibold mb-3">Attendance</p>

      <div className="w-full h-56">
        <ChartComponent
          primaryXAxis={{
            valueType: "Category",
            majorGridLines: { width: 0 }
          }}
          primaryYAxis={{
            minimum: 0,
            maximum: 100,
            interval: 20,
            labelFormat: "{value}%",
          }}
          tooltip={{ enable: true }}
          legendSettings={{ visible: false }}
        >
          <Inject
            services={[
              ColumnSeries,
              Category,
              Legend,
              Tooltip,
              DataLabel,
            ]}
          />

          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={seriesData}
              xName="x"
              yName="y"
              type="Column"
              name="Attendance"
              fill="#4f46e5"  // Indigo (shadcn style)
              border={{ width: 0 }}
              animation={{ enable: true, duration: 800 }}
              marker={{
                dataLabel: {
                  visible: true,
                  position: "Top",
                  font: { fontWeight: "600", color: "#111" },
                  format: "{value}%",
                },
              }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}
