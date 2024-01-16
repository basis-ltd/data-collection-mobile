import { View, Text } from "react-native";

export default function AppError(props) {
    const { message } = props
    return (
        <View className="bg-pink-100 text-pink-800 w-100 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
            <Text>{message}</Text>
        </View>
    )
}
