export const formatMonthString = (monthStr) => {
  if (!monthStr) return "";
  
  const [year, month] = monthStr.split("-");
  const date = new Date(year, month - 1); // JS months are 0-indexed
  const monthName = date.toLocaleString("default", { month: "long" });
  
  return `${monthName}-${year}`;
};
