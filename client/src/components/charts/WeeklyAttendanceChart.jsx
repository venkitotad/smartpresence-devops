import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Category,
  Legend,
  Tooltip,
  DataLabel,
  DateTime
} from "@syncfusion/ej2-react-charts";

// import "@syncfusion/ej2-react-charts/styles/material.css";

/**
 * props:
 *  - data: number[] // 7 values for Mon..Sun (0-100)
 */
export default function WeeklyAttendanceChart({ data = [85, 90, 92, 88, 86, 80, 91] }) {
  // map to x labels (Mon..Sun)
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const seriesData = labels.map((l, i) => ({ x: l, y: data[i] ?? 0 }));

  return (
    <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm">
      <p className="text-md font-semibold mb-3">Weekly Attendance</p>
      <div className="w-full h-48">
        <ChartComponent
          primaryXAxis={{ valueType: "Category", labelPlacement: "OnTicks" }}
          primaryYAxis={{ minimum: 0, maximum: 100, interval: 20 }}
          tooltip={{ enable: true }}
        >
          <Inject services={[LineSeries, Category, Legend, Tooltip, DataLabel]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={seriesData}
              xName="x"
              yName="y"
              type="Line"
              marker={{ visible: true, width: 6, height: 6 }}
              name="Attendance"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}
