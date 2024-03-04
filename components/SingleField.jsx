import { useState } from "react";
import AppInput from "./AppInput";


const SingleField = ({ field }) => {
    const [change, setChange] = useState("")

    return (
        <AppInput
            iconUrl={null}
            labelText={field.label}
            placeholder={field.placeholder}
            keyboardType={"default"}
            onChangeText={setChange}
            error={null}
            value={change}
        />

    );
};


export default SingleField;