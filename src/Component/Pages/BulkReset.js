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
import { ProgressSpinner } from "primereact/progressspinner";
import CommonDataTable from "../Common/TableComponent.js";
import { formatMonth } from "../Utils/Utilityfunction.js";
export default function ScoreCardAmendment() {
  const [products, setProducts] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [jobName, setJobName] = useState(null);
  const [goal, setGoal] = useState(null);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
    const columns = [
    { field: "id", header: "Obj-Id", sortable: true, style: { width: "8%" } },
    { field: "accountability", header: "Acc", sortable: true },
    { field: "measureDescription", header: "Description", sortable: true },
    { field: "uom", header: "UOM", sortable: true },
    { field: "scenario", header: "Scenario", sortable: true },
    { field: "jobAssignment", header: "Job Assign", sortable: true },
    { field: "periodicity", header: "Period", sortable: true },
    { field: "target", header: "Target", sortable: true },
    { field: "actual", header: "Actual", sortable: true },
    {
      field: "perfScore",
      header: "Perf.Scr",
      sortable: true,
      body: (rowData) => {
        const value = rowData.actual;
        const actualValue = rowData.target;
        const percentage = value ? ((value / actualValue) * 100).toFixed(0) : 0;
        return <span>{percentage}%</span>;
      },
    },
    {
      field: "perfRating",
      header: "Perf.Rating",
      sortable: true,
      body: (rowData) => {
        const actualValue = Number(rowData.actual);
        const targetValue = Number(rowData.target);
        const percentage = targetValue ? (actualValue / targetValue) * 100 : 0;

        let style = {
          padding: "4px 8px",
          borderRadius: "12px",
          display: "inline-block",
          width: "50px",
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
      },
    },
    { field: "weightagePercentage", header: "Weigh %", sortable: true },
    { field: "weightagePref", header: "Weigh Pref", sortable: true },
    {
      type: "action",
      header: "Actions",
      style: { width: "20%", textAlign: "center" },
    },
  ];
  useEffect(() => {
    const savedData = localStorage.getItem("bulkResetData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      const filteredData = date
        ? parsedData.filter((data) => data.date === date)
        : parsedData;

      console.log("filteredData", filteredData);
      setProducts(filteredData);
    }
  }, [date]);
  const handleLoadData = () => {
    const savedData = localStorage.getItem("bulkResetData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const filteredData = date
        ? parsedData.filter((data) => data.date === date)
        : parsedData;

      setFilteredProducts(filteredData); 
    } else {
      setFilteredProducts([]);
    }
    setDataLoaded(true);
  };

  const managingPoints = filteredProducts.filter(
    (p) => p.type === "Managing Point"
  );
 
  const checkingPoints = filteredProducts.filter(
    (p) => p.type === "Checking Point"
  );
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
  const handleMonthSelect = (selectedMonth) => {
    setDate(selectedMonth);
  };
  const handleMonthClick = () => {
    // Toggle your custom grid when clicking input
    setShowGrid(!showGrid);
  };
  const renderTable = (title, data) => (
    <>
      <CommonDataTable
            title={title}
            data={data}
            columns={columns}
            onView={(row) => {
              setCurrentRow(row);
              setReadOnly(true);
              setVisible(true);
            }}
            onEdit={(row) => {
              setCurrentRow(row);
              setReadOnly(false);
              setVisible(true);
            }}
          />
    </>
  );
  return (
  
    <>
    { console.log("managingPoints",managingPoints)}
      <div className="card">
        <Card
          style={{
            boxShadow: "1px 1px 5px 2px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
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
                  placeholder="Select a Goal"
                  className="w-full md:w-14rem custom-dropdown"
                  style={{ minWidth: "250px" }}
                />
              </div>
            </div>
            <div
              style={{
                opacity: jobName && date && goal ? 1 : 0.5,
                pointerEvents: jobName && date && goal ? "auto" : "none",
              }}
            >
              <Button
                onClick={async () => {
                  setLoading(true);
                  await new Promise((resolve) => setTimeout(resolve, 800));
                  handleLoadData();

                  setLoading(false);
                }}
                disabled={loading}
                style={{
                  width: "100px",
                  height: "46px",
                  marginTop: "21px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#008B8B",
                  border: "none",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                {loading ? (
                  <ProgressSpinner
                    style={{
                      width: "24px",
                      height: "24px",
                    }}
                    strokeWidth="6"
                    fill="transparent"
                    animationDuration=".5s"
                  />
                ) : (
                  "Load"
                )}
              </Button>
            </div>
          </div>
        </Card>
        <Card style={{ marginTop: "18px", boxShadow: "1px 2px 5px 2px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
          {dataLoaded && managingPoints.length > 0 && (goal?.code === undefined || goal?.code === "Managing Point") && renderTable("Managing Points", managingPoints)}

          <Card style={{ margin: "12px", background: "#ebf9f9ff" }}>
            {dataLoaded && checkingPoints.length > 0 && (goal?.code === "Managing Point" || goal?.code === undefined || goal?.code === "Checking Point") && renderTable("Checking Points", checkingPoints)}
          </Card>
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
