import { View } from "react-native";
import { createContext } from "react";


// form comtext
export const FormikSubmitContext = createContext(null)

const SingleField = ({ children, formSubmitRef, isFormSubmited }) => {

    return (
        <FormikSubmitContext.Provider value={{ formSubmitRef, isFormSubmited }}>
            <View style={{ minHeight: 50, backgroundColor: 'transparent' }}>
                {children}
            </View>
        </FormikSubmitContext.Provider>

    );
};

export default SingleField;
