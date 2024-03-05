import * as Yup from "yup";
import { inputTypes } from "../constants/inputTypes";

const rwandanNumberRegex = /^(\+25)?07[1-9]\d{7}$/;
// const PhoneRegex = /^\+?(\d{1,3})?[\s-]?(\(\d{1,3}\)[\s-]?)?[\d\s-]{6,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export const inputValidationSchema = (field) => {
    let schema = field.is_required ? Yup.string().required("This Field is required") : Yup.string();

    switch (field.field_type) {
        case inputTypes.text:
            break;
        case inputTypes.textarea:
            break;
        case inputTypes.tel:
            schema = schema.matches(rwandanNumberRegex, "Phone number must be Rwandan: ex: 07********");
            break;
        case inputTypes.email:
            schema = schema.matches(emailRegex, "Invalid Email");
            break;
        case inputTypes.url:
            schema = schema.matches(urlRegex, "Invalid url");
            break;
        default:
            schema = field.is_required ? Yup.string().required("This Field is required") : Yup.string();
            break;
    }

    return Yup.object({
        value: schema,
    });
};

