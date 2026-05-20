import React from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Edit,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { studentsData } from "../data/StudentData.js";
import { studentsGrid } from "../data/StudentGrid.js";

const Students = () => {
  const toolbarOptions = ["Search", "Edit", "Update", "Cancel"];

  const editing = {
    allowEditing: true,
    allowDeleting: false,
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text("Student Attendance Report", 14, 15);

    const tableColumn = ["USN", "Name", "Class", "Attendance"];
    const tableRows = [];

    studentsData.forEach((student) => {
      const row = [
        student.USN,
        student.name,
        student.class,
        student.attendance,
      ];
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("attendance-report.pdf");
  };

  return (
    <div className="m-4 md:m-8 p-6 bg-white rounded-2xl shadow-sm">

      {/* ✅ TOP HEADER BAR */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
           Attendance List
        </h2>

        <button
          onClick={handleDownloadPDF}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition cursor-pointer"
        >
          Export Report
        </button>
      </div>

      {/* ✅ TABLE WRAPPER */}
      <div className="rounded-md overflow-hidden border">
        <GridComponent
          dataSource={studentsData}
          height="280"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5, pageSize: 8 }}
          editSettings={editing}
          toolbar={toolbarOptions}
        >
          <ColumnsDirective>
            {studentsGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>

          <Inject services={[Search, Page, Edit, Toolbar, ]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Students;
