import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";

export default function AppError(props) {
    const { message } = props
    return (
        <View style={styles.container} className="bg-pink-100 text-pink-800 w-100 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
            <Text style={styles.error}>{message}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colors.TRANSPARENT,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    error: {
        color: colors.ERROR,
        fontSize: 12,
        fontFamily: fonts.MONTSERRAT_SEMI_BOLD,

    }
})
