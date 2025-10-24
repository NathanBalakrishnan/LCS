import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const CommonDataTable = ({
  title,
  data,
  columns,
  rows = 5,
  paginator = true,
  onView,
  onEdit,
}) => {
  const renderBodyTemplate = (rowData, column) => {
    if (column.body) {
      return column.body(rowData);
    }
    return rowData[column.field];
  };

  return (
    <DataTable
    
      value={data}
      tableStyle={{ minWidth: "50rem" }}
      className="dataTable"
      paginator={data.length>1?paginator:!paginator}
      rows={rows}
      header={
        <h5
          style={{
            margin: 0,
            fontWeight: 900,
            fontSize: "12px",
            color: "#333",
            textAlign: "left",
          }}
        >
          {title}
        </h5>
      }
    >
      {columns.map((col, idx) => {
        if (col.type === "action") {
          return (
            <Column
              key={idx}
              header={col.header}
              style={col.style}
              body={(rowData) => (
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  {onView && (
                    <Button
                      icon="pi pi-eye"
                      className="p-button-white p-button-sm bg-white"
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #61dafb",
                        color: "#007ad9",
                      }}
                      onClick={() => onView(rowData)}
                    />
                  )}
                  {onEdit && (
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-white p-button-sm bg-white"
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #61dafb",
                        color: "#007ad9",
                      }}
                      onClick={() => onEdit(rowData)}
                    />
                  )}
                </div>
              )}
            />
          );
        }

        return (
          <Column
            key={idx}
            field={col.field}
            header={col.header}
            sortable={col.sortable}
            style={col.style}
            body={(rowData) => renderBodyTemplate(rowData, col)}
          />
        );
      })}
    </DataTable>
  );
};

export default CommonDataTable;
