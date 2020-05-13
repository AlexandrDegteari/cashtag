const MaxDate = () => {
  const dateString = new Date().toISOString().split("-");
  const year = dateString[0] - 18;
  const month = dateString[1];
  const day = dateString[2].split("T")[0];
  return `${year}-${month}-${day}`;
};

export default {
  MaxDate
};
