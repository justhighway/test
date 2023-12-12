export const mapConditionToLabel = (condition) => {
  switch (condition) {
    case 1:
      return "S";
    case 2:
      return "A";
    case 3:
      return "B";
    case 4:
      return "C";
    case 5:
      return "D";
    default:
      return "";
  }
};
