import { inputTypes } from "../constants/inputTypes";


export const returnKeyBoardtype = (field_type) => {

    let keyBoardType = "default"

    switch (field_type) {
        case inputTypes.text:
        case inputTypes.textarea:
        case inputTypes.url:
            break;
        case inputTypes.tel:
            keyBoardType = "phone-pad";
            break;
        case inputTypes.email:
            keyBoardType = "email-address";
            break;
        case inputTypes.number:
            keyBoardType = "numeric";
            break;
        default:
            keyBoardType = "default";
            break;
    }

    return keyBoardType
};

