import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NowPlayingScreen from './screens/NowPlayingScreen';
import PopularScreen from './screens/PopularScreen';
import UpcomingScreen from './screens/UpcomingScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Now Playing':
                            iconName = focused ? 'play-circle' : 'play-circle-outline';
                            break;
                        case 'Popular':
                            iconName = focused ? 'star' : 'star-outline';
                            break;
                        case 'Upcoming':
                            iconName = focused ? 'time' : 'time-outline';
                            break;
                        case 'Favorites':
                            iconName = focused ? 'heart' : 'heart-outline';
                            break;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#20B2AA',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Now Playing" component={NowPlayingScreen} />
            <Tab.Screen name="Popular" component={PopularScreen} />
            <Tab.Screen name="Upcoming" component={UpcomingScreen} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
    );
};

export default Tabs;
