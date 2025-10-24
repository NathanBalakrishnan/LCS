import React, { useEffect } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
export default function Performance() {
 
  return (
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
                // value={jobName}
                // onChange={(e) => setJobName(e.value)}
                // options={JobTitle}
                optionLabel="name"
                placeholder="Select a job"
                className="w-full md:w-14rem custom-dropdown"
                style={{ maxWidth: "500px" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="jobDropdown"
                style={{ marginBottom: "4px", fontWeight: "500" }}
              >
                Goal Objective ID
              </label>
              <Dropdown
                id="jobDropdown"
               
                // onChange={(e) => setGoal(e.value)}
                // options={goalList}
                optionLabel="name"
                placeholder="Select a job"
                className="w-full md:w-14rem custom-dropdown"
                style={{ maxWidth: "500px" }}
              />
            </div>
          </div>
        </Card>
      </div>

  );
}
