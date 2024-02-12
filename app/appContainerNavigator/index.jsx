import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Projects from '../projects';
import Profile from '../profile';
import { colors } from '../../utils/colors';
import HomeScreen from '../homeScreen';

function AppNavigator() {
    const Tab = createBottomTabNavigator();

    const generalStyles = {
        headerStyle: {
            backgroundColor: colors.LIGHT,
            elevation: 0,
            borderBottomWidth: 0,
            shadowColor: colors.TRANSPARENT,
        },
        headerShadowVisible: false,
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeScreen') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Projects') {
                        iconName = focused ? 'briefcase' : 'briefcase-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    iconName = iconName || 'alert-circle-outline';

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.PRIMARY,
                tabBarInactiveTintColor: colors.GRAY,
            })}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    headerTitle: "",
                    ...generalStyles,
                    headerShown: false,
                    title: 'Home',
                }} />
            <Tab.Screen name="Projects" component={Projects}
                options={{
                    headerTitle: "",
                    ...generalStyles,
                    headerShown: false,
                }} />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    headerTitle: "",
                    ...generalStyles,
                    headerShown: false,
                }} />
        </Tab.Navigator>
    )
}

export default AppNavigator