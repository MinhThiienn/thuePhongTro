const objToArr = (obj) => {
  if (!obj || typeof obj !== "object") return [];

  return Object.entries(obj).map(([key, value]) => ({ [key]: value }));
};

export default objToArr;
