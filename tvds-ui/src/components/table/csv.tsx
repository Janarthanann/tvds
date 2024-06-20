export const toCsv = (data: unknown[][]) => {
  const lineArray = data.map((dataArray) => {
    const line = dataArray
      .map((value) => {
        const v = typeof value === "string" ? value.replace(/"/g, '""') : value;
        return JSON.stringify(v);
      })
      .join(",");
    return line;
  });
  return lineArray.join("\n");
};
