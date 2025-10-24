import React, { useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import "../../Style/Common.css";
import ScoreCardAmendment from "../Pages/ScoreCardAmendment";
import BulkReset from "../Pages/BulkReset";
import BulkResetData from "../../Mocks/BulkReset";
import scoreCardData from "../../Mocks/ScoreCardMock";
import "../../Style/Common.css";
export default function Home() {
  const items = [
    { label: "Home", command: () => console.log("Navigate to Home") },
    { label: "Dashboard", command: () => console.log("Navigate to Dashboard") },
    { label: "Score Amendment" },
  ];
  useEffect(() => {
    localStorage.setItem("bulkResetData", JSON.stringify(BulkResetData));
    localStorage.setItem("scoreCardData", JSON.stringify(scoreCardData));
  }, []);
  return (
    <div className="card" style={{ margin: "12px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 className="title">Score Card Amendment</h3>
        <nav className="breadcrumb">
          <a href="#">Home</a>
          <span className="separator">/</span>
          <a href="#">Dashboard</a>
          <span className="separator">/</span>
          <span className="current">Settings</span>
        </nav>
      </div>
      <TabView>
        <TabPanel header="Score Amendment" className="score-tab">
          <ScoreCardAmendment/>
        </TabPanel>
        <TabPanel header="Bulk Reset" className="score-tab">
          <BulkReset />
        </TabPanel>
      </TabView>
    </div>
  );
}
