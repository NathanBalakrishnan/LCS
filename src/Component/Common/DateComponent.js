import React, { useState, useRef, useEffect } from "react";

const MonthScorePicker = ({ monthScores, formatMonth, onMonthSelect }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showGrid, setShowGrid] = useState(false);

  const containerRef = useRef(null);
  const handleMonthClick = () => {
    setShowGrid(!showGrid);
  };

  const handleSelectMonth = (key) => {
    setSelectedMonth(key);
    setShowGrid(false);
    if (onMonthSelect) {
      onMonthSelect(key);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowGrid(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const tagStyle = (tag) => ({
    marginTop: "6px",
    fontSize: "12px",
    fontWeight: 500,
    borderRadius: "999px",
    backgroundColor:tag === "ME" ? "#008B8B" : tag === "MSE" ? "orange" : "#2196f3",
    color: "white",
    borderColor:"#008B8B",
    position: "absolute",
    bottom: "-8px", 
    right: "40px", 
    padding: "2px 8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  });
  const containerStyle = {
    maxWidth: "900px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    position: "relative",
  };

  const inputStyle = {
    width: "100%",
    padding: "16px 16px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "8px",
    fontSize: "14px",
    marginTop: "0px",
    color: "#333",
  };

  const gridStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "422px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    borderColor:"#008B8B",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 9999,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  };

  const cardStyle = (isSelected) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    minHeight: "80px",
    boxSizing: "border-box",
    borderRadius: "18px",
    border: "1px solid  #14b8a6",
    backgroundColor: isSelected ? "#f0fdfa" : "#ebf9f9ff",
    cursor: "pointer",
    transition: "border 0.2s ease",
    position: "relative",
  });

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      ref={containerRef}
    >
      <div style={containerStyle}>
        <label
          htmlFor="monthPicker"
          style={{
            display: "block",
            fontWeight: 500,
            marginBottom: "2px",
            marginTop: "10px",
          }}
        >
          Select Month
        </label>

        <input
          type="text"
          id="monthPicker"
          value={selectedMonth ? formatMonth(selectedMonth) : ""}
          onClick={handleMonthClick}
          placeholder="Select Month"
          readOnly
          style={inputStyle}
        />

        {showGrid && (
          <div style={gridStyle}>
            {Object.entries(monthScores).map(([key, { score, tag }]) => {
              const isSelected = selectedMonth === key;
              return (
                <div
                  key={key}
                  onClick={() => handleSelectMonth(key)}
                  style={cardStyle(isSelected)}
                >
                  <span
                    style={{
                      backgroundColor: score >= 90 ? "#008B8B": score <60?"#2196f3" : "orange",
                      color: "white",
                      width: "100%",
                      textAlign: "center",
                      borderColor:"#008B8B",
                      padding: "6px 0",
                      borderRadius: "16px 16px 0 0",
                      fontSize: "14px",
                      fontWeight: 600,
                      boxSizing: "border-box",
                    }}
                  >
                    {formatMonth(key)}
                  </span>
                  <span
                    style={{
                      paddingBottom: "18px",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: score >= 90 ? "#008B8B": score <60?"#2196f3" : "orange",
                    }}
                  >
                    {score}%
                  </span>
                  {tag && <span style={tagStyle(tag)}>{tag}</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthScorePicker;
