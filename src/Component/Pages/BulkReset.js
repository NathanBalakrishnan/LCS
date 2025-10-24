import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import BulkReset from "../../Mocks/BulkReset.js";
import "../../Style/Common.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import DialogForm from "../Common/DailogForm.js";
import MonthScorePicker from "../Common/DateComponent.js";
export default function ScoreCardAmendment() {
  const [products, setProducts] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
useEffect(() => {
  // Try to get data from localStorage
  const savedData = localStorage.getItem("bulkResetData");
  if (savedData) {
    setProducts(JSON.parse(savedData));
    console.log("Loaded from localStorage:", JSON.parse(savedData));
  }
}, []);

  const [jobName, setJobName] = useState(null);
  const [goal, setGoal] = useState(null);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const managingPoints = products.filter((p) => p.type === "Managing Point");
  const checkingPoints = products.filter((p) => p.type === "Checking Point");
  const monthScores = {
    "2025-01": { score: 90, tag: "ME" },
    "2025-02": { score: 85 },
    "2025-03": { score: 98 },
    "2025-04": { score: 95 },
    "2025-05": { score: 90 },
    "2025-06": { score: 85 },
    "2025-07": { score: 65, tag: "MSE" },
    "2025-08": { score: 95 },
    "2025-09": { score: 88 },
    "2025-10": { score: 85 },
    "2025-11": { score: 60 ,tag: "BE" },
    "2025-12": { score: 95 },
  };
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showGrid, setShowGrid] = useState(false);
  const JobTitle = [
    { name: "FrontEnd Developer", code: "FrontEnd Developer" },
    { name: "BackEnd Developer", code: "BackEnd Developer" },
    { name: "Testing", code: "Testing" },
  ];
  const goalList = [
    { name: "Managing Point", code: "Managing Point" },
    { name: "Checking Point", code: "Checking Point" },
  ];
  let style = {
    display: "inline-block",
    width: "60px",
    textAlign: "center",
    padding: "4px",
    borderRadius: "15px",
  };

  const formatMonth = (value) => {
    const date = new Date(value + "-01");
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };
  const handleMonthClick = () => {
    // Toggle your custom grid when clicking input
    setShowGrid(!showGrid);
  };
  const renderTable = (title, data) => (
    <>
      <h5
        style={{
          margin: "20px 0",
          fontWeight: "900",
          textAlign: "left",
          color: "#333",
        }}
      >
        {title}
      </h5>
      <DataTable
        value={data}
        tableStyle={{ minWidth: "50rem" }}
        className="dataTable"
      >
        <Column
          field="id"
          header="Object Id"
          sortable
          style={{ width: "8%" }}
        />
        <Column field="accountability" header="Accountability" sortable />
        <Column
          field="measureDescription"
          header="Measure Description"
          sortable
        />
        <Column field="uom" header="UOM" sortable />
        <Column field="scenario" header="Scenario" sortable />
        <Column field="jobAssignment" header="Job Assignment" sortable />
        <Column field="periodicity" header="Periodicity" sortable />
        <Column field="target" header="Target" sortable />
        <Column field="actual" header="Actual" sortable />
        <Column field="perfScore" header="Perf. Score" sortable />
        <Column
          field="perfRating"
          header="Perf. Rating"
          body={(rowData) => {
            const value = rowData.perfRating;
            const actualValue = rowData.actual;
            if (actualValue >= 85 && actualValue <= 100) {
              style = {
                ...style,
                backgroundColor: "#efb326ff",
                color: "white",
                fontWeight: 600,
              };
            } else if (actualValue >= 60 && actualValue < 85) {
              style = {
                ...style,
                backgroundColor: "#4caf50",
                color: "white",
                fontWeight: 600,
              };
            } else if (actualValue < 60) {
              style = {
                ...style,
                backgroundColor: "#2196f3",
                color: "white",
                fontWeight: 600,
              }; // Blue
            }
            return <span style={style}>{value}</span>;
          }}
        />
        <Column field="weightagePercentage" header="Weightage %" sortable />
        <Column field="weightagePref" header="Weightage Pref" sortable />
        <Column
          header="Actions"
          body={(rowData) => (
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "center",
              }}
            >
              {/* 👁 View Button */}
              <Button
                icon="pi pi-eye"
                className="p-button-white p-button-sm bg-white"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #61dafb",
                  color: "#007ad9",
                }}
                onClick={() => {
                  setCurrentRow(rowData);
                  setReadOnly(true);
                  setVisible(true);
                }}
              />

              {/* ✏️ Edit Button */}
              <Button
                icon="pi pi-pencil"
                className="p-button-white p-button-sm bg-white"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #61dafb",
                  color: "#007ad9",
                }}
                onClick={() => {
                  setCurrentRow(rowData);
                  setReadOnly(false);
                  setVisible(true);
                }}
              />
            </div>
          )}
          style={{ width: "20%", textAlign: "center" }}
        />
      </DataTable>
    </>
  );
  return (
    <>
      <div className="card">
        <Card>
          <div
            style={{
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="jobDropdown"
                style={{ marginBottom: "4px", fontWeight: "500" }}
              >
                Select a Job
              </label>
              <Dropdown
                id="jobDropdown"
                value={jobName}
                onChange={(e) => setJobName(e.value)}
                options={JobTitle}
                optionLabel="name"
                placeholder="Select a job"
                className="w-full md:w-14rem custom-dropdown"
                style={{ maxWidth: "500px" }}
              />
            </div>
            <MonthScorePicker
              monthScores={monthScores}
              formatMonth={formatMonth}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="jobDropdown"
                style={{ marginBottom: "4px", fontWeight: "500" }}
              >
                Goal Objective ID
              </label>
              <Dropdown
                id="jobDropdown"
                value={goal}
                onChange={(e) => setGoal(e.value)}
                options={goalList}
                optionLabel="name"
                placeholder="Select a job"
                className="w-full md:w-14rem custom-dropdown"
                style={{ maxWidth: "500px" }}
              />
            </div>
          </div>
        </Card>
        <Card style={{ marginTop: "8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          ></div>
          <div>
            {managingPoints.length > 0 &&
              goal?.code === "Managing Point" &&
              renderTable("Managing Points", managingPoints)}
            {checkingPoints.length > 0 &&
              (goal?.code === "Managing Point" ||
                goal?.code === "Checking Point") &&
              renderTable("Checking Points", checkingPoints)}
          </div>
        </Card>
      </div>
      <DialogForm
        visible={visible}
        readonly={readOnly}
        onHide={() => setVisible(false)}
        rowData={currentRow}
        onSave={(updatedRow) => {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === currentRow.id ? { ...p, ...updatedRow } : p
            )
          );
        }}
      />
    </>
  );
}
