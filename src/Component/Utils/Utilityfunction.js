export const formatMonthString = (monthStr) => {
  if (!monthStr) return "";
  
  const [year, month] = monthStr.split("-");
  const date = new Date(year, month - 1);
  const monthName = date.toLocaleString("default", { month: "long" });
  
  return `${monthName}-${year}`;
};

 export const formatMonth = (value) => {
    const date = new Date(value + "-01");
    return date.toLocaleString("en-US", { month: "short" });
  };