import { allowedFileTypes } from "../constants/allowedFileTypes";

export const isAllowedFileType = (file) => {
    return allowedFileTypes.some(type => file.mimeType === type)
};