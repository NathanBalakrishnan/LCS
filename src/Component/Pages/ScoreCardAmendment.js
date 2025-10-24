import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../Style/Common.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import DialogForm from "../Common/DailogForm.js";
import MonthScorePicker from "../Common/DateComponent.js";
import { formatMonthString } from "../Utils/Utilityfunction.js";
import monthScores from "../../Mocks/MonthMock.js";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonDataTable from "../Common/TableComponent.js";
import { formatMonth } from "../Utils/Utilityfunction.js";
export default function ScoreCardAmendment() {
  const [products, setProducts] = useState([]);
  const [jobName, setJobName] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadData, setLoadedData] = useState(false);
  const [loadedDate, setLoadedDate] = useState(null);
   const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const totalTarget = products.reduce((val, item) => val + item.target, 0);
  const totalActual = products.reduce((val, item) => val + item.actual, 0);
  let averagePercentage = totalTarget
    ? Math.round((totalActual / totalTarget) * 100)
    : 0;
  averagePercentage = averagePercentage > 100 ? 100 : averagePercentage;
  const handleMonthClick = () => {
    // Toggle your custom grid when clicking input
    setShowGrid(!showGrid);
  };

 
  useEffect(() => {
    const savedData = localStorage.getItem("scoreCardData");
    if (savedData) {
      setProducts(JSON.parse(savedData)); // initial empty or all data
    }
  }, []);

  const JobTitle = [
    { name: "FrontEnd Developer", code: "FrontEnd Developer" },
    { name: "BackEnd Developer", code: "BackEnd Developer" },
    { name: "Testing", code: "Testing" },
  ];
  const handleMonthSelect = (selectedMonth) => {
    setDate(selectedMonth);
  };
  const columns = [
    { field: "id", header: "Obj-Id", sortable: true, style: { width: "8%" } },
    { field: "accountability", header: "Acc", sortable: true },
    { field: "measureDescription", header: "Description", sortable: true },
    { field: "uom", header: "UOM", sortable: true },
    { field: "scenario", header: "Scenario", sortable: true },
    { field: "jobAssignment", header: "Job Asgn", sortable: true },
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


  let style = {
    display: "inline-block",
    width: "60px",
    textAlign: "center",
    padding: "4px",
    borderRadius: "15px",
  };
  const handleLoadData = () => {
    setIsLoading(true);
    setLoadedData(false);

    setTimeout(() => {
      const savedData = localStorage.getItem("scoreCardData");

      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const filteredData = date
          ? parsedData.filter((data) => data.date === date)
          : parsedData;

        setProducts(filteredData);
        setLoadedData(true);
        setLoadedDate(date); // <-- save the loaded month here
      } else {
        setProducts([]);
        setLoadedData(false);
        setLoadedDate(null);
      }

      setIsLoading(false);
    }, 500); // optional small delay
  };

  const [loading, setLoading] = useState(false);

  const onLoadClick = async () => {
    try {
      setLoading(true);
      await handleLoadData(); // your async logic here
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                style={{ width: "100%", minWidth: "250px" }}
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
            <div
              style={{
                marginTop: "24px",
                opacity: jobName && date ? 1 : 0.5,
                pointerEvents: jobName && date ? "auto" : "none",
              }}
            >
              <Button
                onClick={async () => {
                  setLoading(true);
                  await new Promise((resolve) => setTimeout(resolve, 800)); // small delay for UX
                  handleLoadData();

                  setLoading(false);
                }}
                disabled={loading}
                style={{
                  width: "100px",
                  height: "46px",
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
        <Card
          style={{
            marginTop: "20px",
            boxShadow: "1px 1px 5px 2px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <div style={{ minWidth: "120px" }}>
              {isLoading && !loadedDate ? (
                <h4 style={{ margin: 0, fontWeight: 900, color: "#999" }}>
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
                    ""
                  )}
                </h4>
              ) : loadedDate ? (
                <h4 style={{ margin: 0, fontWeight: 900 }}>
                  {formatMonthString(loadedDate)}
                </h4>
              ) : (
                <h4
                  style={{ margin: 0, fontWeight: 900, color: "transparent" }}
                >
                  ----
                </h4>
              )}
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <h3
                style={{
                  margin: 0,
                  fontWeight: 600,
                  marginRight: "18px",
                }}
              >
                Pref.Score:{" "}
                <span style={{ color: "orange" }}>
                  {averagePercentage.toFixed(2)}%
                </span>
              </h3>

              <h3 style={{ margin: 0, fontWeight: 600 }}>
                Pref.Rating:{" "}
                <span
                  style={{
                    display: "inline-block",
                    width: "50px",
                    fontSize: "12px",
                    textAlign: "center",
                    padding: "4px 8px",
                    borderRadius: "12px",
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
          {/* <DataTable
            value={products}
            tableStyle={{ minWidth: "50rem" }}
            className="dataTable"
            paginator
            rows={3}
          >
            <Column
              field="id"
              header="Obj-Id"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="accountability"
              header="Account"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="measureDescription"
              header="Description"
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
              header="Job Assgn"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="periodicity"
              header="Period"
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
                  : 0;

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
              }}
            ></Column>
            <Column
              field="weightagePercentage"
              header="Weigh %"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="weightagePref"
              header="Weigh Pref"
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
                  <Button
                    icon="pi pi-eye"
                    className="p-button-white p-button-xs bg-white small-icon-button"
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
          </DataTable> */}
          <CommonDataTable
            title=""
            data={products}
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
