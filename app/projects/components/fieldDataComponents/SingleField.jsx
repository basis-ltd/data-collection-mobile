import { View } from "react-native";
import FieldtypesWithTypes from "./AllFieldTypes";

const SingleField = ({ field }) => {

    return (
        <View style={{ minHeight: 50, backgroundColor: 'green' }}>
            <FieldtypesWithTypes field={field} />
        </View>
    );
};

export default SingleField;
