// border functions
export const borders = (borderType, borderColor) => {
  return {
    borderWidth: 1,
    borderColor: borderColor,
    borderStyle: borderType === "s" ? "solid" : "dashed",
  };
};
