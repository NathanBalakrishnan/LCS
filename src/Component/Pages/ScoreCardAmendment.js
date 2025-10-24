import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { ProductService } from './service/ProductService';
import ScoreCardMock from "../../Mocks/ScoreCardMock.js";
import "../../Style/Common.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import DialogForm from "../Common/DailogForm.js";
import MonthScorePicker from "../Common/DateComponent.js";
import { formatMonthString } from "../Utils/Utilityfunction.js";
export default function ScoreCardAmendment() {
  const [products, setProducts] = useState([]);

 useEffect(() => {
   const savedData = localStorage.getItem("scoreCardData");
   if (savedData) {
     setProducts(JSON.parse(savedData));
     console.log("Loaded from localStorage:", JSON.parse(savedData));
   }
 }, []);
  const totalTarget = products.reduce((val, item) => val + item.target, 0);
  const totalActual = products.reduce((val, item) => val + item.actual, 0);
  const averagePercentage = (totalActual / totalTarget) * 100;

  const [jobName, setJobName] = useState(null);
  const [showGrid, setShowGrid] = useState(false);

  const handleMonthClick = () => {
    // Toggle your custom grid when clicking input
    setShowGrid(!showGrid);
  };

  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
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
  const JobTitle = [
    { name: "FrontEnd Developer", code: "FrontEnd Developer" },
    { name: "BackEnd Developer", code: "BackEnd Developer" },
    { name: "Testing", code: "Testing" },
  ];
  const handleMonthSelect = (selectedMonth) => {
    setDate(selectedMonth);
  };
  const [readOnly, setReadOnly] = useState(false);
  const formatMonth = (value) => {
    const date = new Date(value + "-01");
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };
  let style = {
    display: "inline-block",
    width: "60px",
    textAlign: "center",
    padding: "4px",
    borderRadius: "15px",
  };


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
                style={{ width: "100%", maxWidth: "600px" }}
              />
            </div>
            <MonthScorePicker
              monthScores={monthScores}
              formatMonth={formatMonth}
               onMonthSelect={handleMonthSelect}
            />
          </div>
        </Card>
        <Card style={{ marginTop: "12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <h4 style={{ margin: 0, fontWeight: 900 }}>
              {formatMonthString(date)}
            </h4>
            <div style={{ display: "flex", gap: "12px" }}>
              <h3
                style={{
                  margin: 0,
                  fontWeight: 600,
                  marginRight: "18px",
                }}
              >
                Pref.Score:{" "}
                <span style={{ color: "orange" }}>{averagePercentage} %</span>
              </h3>
              <h3 style={{ margin: 0, fontWeight: 600 }}>
                Pref.Rating:{" "}
                <span
                  style={{
                    display: "inline-block",
                    width: "40px",
                    fontSize: "12px",
                    textAlign: "center",
                    padding: "2px",
                    borderRadius: "8px",
                    backgroundColor: "#4caf50",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  MSE
                </span>
              </h3>
            </div>
          </div>
          <DataTable
            value={products}
            tableStyle={{ minWidth: "50rem" }}
            className="dataTable"
          >
            <Column
              field="id"
              header="Object Id"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="accountability"
              header="Accountability"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="measureDescription"
              header="Measure Description"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="uom"
              header="UOM"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="scenario"
              header="Scenario"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="jobAssignment"
              header="Job Assignment"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="periodicity"
              header="Periodicity"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="target"
              header="Target"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="actual"
              header="Actual"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="perfScore"
              header="Perf.Score"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="perfRating"
              header="Perf.Rating"
              sortable
              style={{ width: "25%" }}
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
            ></Column>
            <Column
              field="weightagePercentage"
              header="Weightage %"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="weightagePref"
              header="Weightage Pref"
              sortable
              style={{ width: "25%" }}
            ></Column>
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
