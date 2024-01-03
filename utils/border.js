import { colors } from "./colors";

// border functions
export const borders = (borderType, borderColor) => {
  return {
    borderWidth: 1,
    borderColor: borderColor,
    borderStyle: borderType === "s" ? "solid" : "dashed",
    elevation: 0,
    shadowColor: colors.TRANSPARENT, // For iOS box shadow
    shadowOpacity: 0,
  };
};
