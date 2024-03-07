import { inputTypes } from "../../../../constants/inputTypes";
import TextInputType from "../fieldDataComponents/TextInputType";
import RadioInputType from "../fieldDataComponents/RadioInputType";
import SelectInputType from "../fieldDataComponents/SelectInputType";
import DateInputType from "../fieldDataComponents/DateInputType";
import FilesInputType from "../fieldDataComponents/FilesInputType";

const FieldtypesWithTypes = ({ field, inputIndex }) => {
    const typesComponent = [
        {
            type: inputTypes.tel,
            FieldInput: <TextInputType field={field} inputIndex={inputIndex} />
        },
        {
            type: inputTypes.textarea,
            FieldInput: <TextInputType field={field} inputIndex={inputIndex} />
        },
        {
            type: inputTypes.text,
            FieldInput: <TextInputType field={field} inputIndex={inputIndex} />
        },
        {
            type: inputTypes.number,
            FieldInput: <TextInputType field={field} inputIndex={inputIndex} />
        },
        {
            type: inputTypes.email,
            FieldInput: <TextInputType field={field} inputIndex={inputIndex} />
        },
        {
            type: inputTypes.url,
            FieldInput: <TextInputType field={field} inputIndex={inputIndex} />
        },
        {
            type: inputTypes.file,
            FieldInput: <FilesInputType field={field} inputIndex={inputIndex} />
        },
        {
            type: inputTypes.select,
            FieldInput: <SelectInputType field={field} inputIndex={inputIndex} />
        },
        {
            type: inputTypes.radio,
            FieldInput: <RadioInputType field={field} inputIndex={inputIndex} />
        },
        {
            type: inputTypes.date,
            FieldInput: <DateInputType field={field} inputIndex={inputIndex} />
        },
    ]
    const FieldType = typesComponent.filter(typeItem => typeItem.type === field.field_type)
    return FieldType[0]?.FieldInput
}

export default FieldtypesWithTypes;
