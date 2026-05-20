import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip
} from "@syncfusion/ej2-react-charts";

// component-level CSS only for charts (safe)
// import "@syncfusion/ej2-react-charts/styles/material.css";

/**
 * props:
 *  - value (number 0-100) attendance percent
 */
export default function TodayAttendanceChart({ value = 78 }) {
  const present = Math.max(0, Math.min(100, Math.round(value)));
  const absent = 100 - present;
  const data = [
    { x: "Present", y: present, text: `${present}%` },
    { x: "Absent", y: absent, text: `${absent}%` }
  ];

  return (
    <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-4 shadow-sm">
      <p className="text-md font-semibold mb-3">Today Attendance</p>
      <div className="flex items-center gap-4">
        <div className="w-36 h-36">
          <AccumulationChartComponent
            id="today-donut"
            legendSettings={{ visible: false }}
            tooltip={{ enable: true }}
            enableSmartLabels={true}
          >
            <Inject services={[AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                dataSource={data}
                xName="x"
                yName="y"
                innerRadius="60%"
                dataLabel={{ visible: true, name: "text", position: "Inside" }}
                explode={false}
              />
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>

        <div className="flex-1">
          <p className="text-3xl font-bold">{present}%</p>
          <p className="text-sm text-gray-500 mt-1">of students present today</p>
          <div className="mt-4 text-sm text-gray-600">
            <div><strong>Present:</strong> {present}%</div>
            <div><strong>Absent:</strong> {absent}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
