import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { assets } from "../utils/assets";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { borders } from "../utils/border";
import { useState } from "react";



const AppCustomSelect = ({ options, onSelect, title }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={styles.button}>
                <View style={styles.filters}>
                    <Text style={styles.title}>{title}</Text>
                    <Image style={styles.icon} source={assets.ArrowDown} alt="Icon" />
                </View>
            </TouchableOpacity>
            {isVisible && (
                <ScrollView style={styles.optionsContainer}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            onPress={() => {
                                onSelect(option.value);
                                setIsVisible(false);
                            }}
                            style={styles.option}
                        >
                            <Text>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: colors.LIGHT,
        padding: 5,
        height: "100%",
        position: "relative",
        zIndex: 2,
    },
    title: {
        color: colors.GRAY,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        fontSize: 14,
        textAlign: "left",
    },
    icon: {
        width: 13,
        height: 9,
    },
    filter: {
        color: colors.DARK,
        fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
        fontSize: 16,
    },
    filters: {
        ...borders("s", colors.ACCENT_LIGHT),
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: colors.GRAY,
        width: "100%",
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 30
    },
    optionsContainer: {
        position: "absolute",
        padding: 10,
        width: "100%",
        backgroundColor: colors.LIGHT,
        borderRadius: 5,
        top: 40,
        right: 0,
        zIndex: 100,
        height: "auto",
        ...borders("s", colors.ACCENT_LIGHT)
    },
    button: {
        padding: 0,
        width: "100%",
        flex: 1,
    },
    option: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.GRAY_LIGHTEST,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        color: colors.GRAY,
        fontSize: 14,
        width: "100%",
        textAlign: "left",
    },


});

export default AppCustomSelect;