import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsRoutes } from './routes';
import { useAppTheme } from '$hooks/common';
import { BottomTabParamsList, AppStackScreenProps } from '$types/navigation.types';
import { EBottomScreens, EStackScreens } from '$constants/screen.constants';

const BottomTab = createBottomTabNavigator<BottomTabParamsList>();

const BottomTabNavigator: React.FC<AppStackScreenProps<EStackScreens.BOTTOM_TAB_NAVIGATOR>> = () => {

    const { theme, colors } = useAppTheme();

    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors['brand-primary'],
                tabBarInactiveTintColor: colors['text-secondary'],
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                },
            }}
        >
            <BottomTab.Screen
                name={EBottomScreens.CHARACTERS}
                component={BottomTabsRoutes.Characters}
            />
            <BottomTab.Screen
                name={EBottomScreens.EPISODES}
                component={BottomTabsRoutes.Episodes}
            />
            <BottomTab.Screen
                name={EBottomScreens.LOCATIONS}
                component={BottomTabsRoutes.Locations}
            />
            <BottomTab.Screen
                name={EBottomScreens.FAVOURITES}
                component={BottomTabsRoutes.Favourites}
            />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigator;
