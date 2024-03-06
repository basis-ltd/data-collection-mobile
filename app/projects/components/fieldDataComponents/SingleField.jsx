import { useState } from "react";
import FieldtypesWithTypes from "./AllFieldTypes";

const SingleField = ({ field }) => {

    return (
        <FieldtypesWithTypes field={field} />
    );
};

export default SingleField;
