import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../Style/Common.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import DialogForm from "../Common/DailogForm.js";
import MonthScorePicker from "../Common/DateComponent.js";
import monthScores from "../../Mocks/MonthMock.js";
export default function ScoreCardAmendment() {
  const [products, setProducts] = useState([]);
  const [readOnly, setReadOnly] = useState(false);

  const [jobName, setJobName] = useState(null);
  const [goal, setGoal] = useState(null);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);
  useEffect(() => {
    const savedData = localStorage.getItem("bulkResetData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      const filteredData = date
        ? parsedData.filter((data) => data.date === date )
        : parsedData;

      console.log("filteredData", filteredData);
      setProducts(filteredData);
    }
  }, [date]);
  const [currentRow, setCurrentRow] = useState(null);
  const managingPoints = products.filter((p) => p.type === "Managing Point");
  const checkingPoints = products.filter((p) => p.type === "Checking Point");
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
  const formatMonth = (value) => {
    const date = new Date(value + "-01");
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };
  const handleMonthSelect = (selectedMonth) => {
    setDate(selectedMonth);
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
        paginator 
        rows={3}
      >
        <Column
          field="id"
          header="Obj-Id"
          sortable
          style={{ width: "8%" }}
        />
        <Column field="accountability" header="Account" sortable />
        <Column
          field="measureDescription"
          header="Des"
          sortable
        />
        <Column field="uom" header="UOM" sortable />
        <Column field="scenario" header="Scenario" sortable />
        <Column field="jobAssignment" header="Job Assign" sortable />
        <Column field="periodicity" header="Periodicity" sortable />
        <Column field="target" header="Target" sortable />
        <Column field="actual" header="Actual" sortable />
        <Column
          field="perfScore"
          header="Perf.Scr"
          sortable
          style={{ width: "25%" }}
          body={(rowData) => {
            const value = rowData.actual;
            const actualValue = rowData.target;
            const percentage = value
              ? ((value / actualValue) * 100).toFixed(0)
              : 0;

            return <span>{percentage}%</span>;
          }}
        ></Column>
        <Column
          field="perfRating"
          header="Perf.Rating"
          sortable
          style={{ width: "25%" }}
          body={(rowData) => {
            const actualValue = Number(rowData.actual);
            const targetValue = Number(rowData.target);
            const percentage = targetValue
              ? (actualValue / targetValue) * 100
              : 0; // use numeric value here for comparison

            let style = {
              padding: "4px 8px",
              borderRadius: "12px",
              display: "inline-block",
              width: "50px", // fixed width for all badges
              textAlign: "center",
            };

            if (percentage >= 85 && percentage <= 100) {
              style = {
                ...style,
                backgroundColor: "#efb326ff",
                color: "white",
                fontWeight: 600,
              };
              return <span style={style}>ME</span>;
            } else if (percentage >= 60 && percentage < 85) {
              style = {
                ...style,
                backgroundColor: "#4caf50",
                color: "white",
                fontWeight: 600,
              };
              return <span style={style}>MSE</span>;
            } else if (percentage < 60) {
              style = {
                ...style,
                backgroundColor: "#2196f3",
                color: "white",
                fontWeight: 600,
              };
              return <span style={style}>BE</span>;
            }
          }}
        ></Column>
        <Column field="weightagePercentage" header="Weigh %" sortable />
        <Column field="weightagePref" header="Weigh Pref" sortable />
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
                style={{ minWidth: "250px" }}
              />
            </div>
            <div
              style={{
                opacity: jobName ? 1 : 0.5,
                pointerEvents: jobName ? "auto" : "none",
              }}
            >
              <MonthScorePicker
                monthScores={monthScores}
                formatMonth={formatMonth}
                onMonthSelect={handleMonthSelect}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="jobDropdown"
                style={{ marginBottom: "4px", fontWeight: "500" }}
              >
                Goal Objective ID
              </label>
              <div
                style={{
                  opacity: date ? 1 : 0.5,
                  pointerEvents: date ? "auto" : "none",
                }}
              >
                <Dropdown
                  id="jobDropdown"
                  value={goal}
                  onChange={(e) => setGoal(e.value)}
                  options={goalList}
                  optionLabel="name"
                  placeholder="Select a job"
                  className="w-full md:w-14rem custom-dropdown"
                  style={{ minWidth: "250px" }}
                />
              </div>
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
              (goal?.code === undefined || goal?.code === "Managing Point") &&
              renderTable("Managing Points", managingPoints)}
            {checkingPoints.length > 0 &&
              (goal?.code === "Managing Point" ||
                goal?.code === undefined ||
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
          const savedData = localStorage.getItem("scoreCardData");
          const allProducts = savedData ? JSON.parse(savedData) : [];
          const updatedProducts = allProducts.map((p) =>
            p.id === currentRow.id ? { ...p, ...updatedRow } : p
          );
          localStorage.setItem(
            "scoreCardData",
            JSON.stringify(updatedProducts)
          );
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
