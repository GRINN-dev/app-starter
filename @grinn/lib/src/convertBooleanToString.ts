export const convertBooleanToString = (
  value: boolean | string | number | undefined
) => {
  if (value === true) {
    return "oui";
  }
  if (value === false) {
    return "non";
  }
  return value;
};
