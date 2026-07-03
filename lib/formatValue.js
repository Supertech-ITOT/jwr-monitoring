export const formatValue = (value, parameterId) => {
  if (value == null) return "-";

  switch (parameterId) {
    case 1: // Temperature
      return Number(value).toFixed(1);

    case 2: // Energy
      return Number(value).toFixed(2);

    case 3: // RH
      return Math.round(Math.abs(Number(value)));

    default:
      return value;
  }
};
