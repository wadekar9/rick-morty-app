import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsRoutes } from './routes';
import { useAppTheme } from '$hooks/common';
import { BottomTabParamsList, AppStackScreenProps } from '$types/navigation.types';
import { EBottomScreens, EStackScreens } from '$constants/screen.constants';
import { TabNavigator } from '$components/navigation';
import { UsersRound, Clapperboard, MapPinned, Heart } from 'lucide-react-native';

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
            tabBar={(props) => <TabNavigator theme={theme} {...props} />}
        >
            <BottomTab.Screen
                name={EBottomScreens.CHARACTERS}
                component={BottomTabsRoutes.Characters}
                options={{
                    tabBarIcon: (props) => <UsersRound size={props.size} color={props.color} />
                }}
            />
            <BottomTab.Screen
                name={EBottomScreens.EPISODES}
                component={BottomTabsRoutes.Episodes}
                options={{
                    tabBarIcon: (props) => <Clapperboard size={props.size} color={props.color} />
                }}
            />
            <BottomTab.Screen
                name={EBottomScreens.LOCATIONS}
                component={BottomTabsRoutes.Locations}
                options={{
                    tabBarIcon: (props) => <MapPinned size={props.size} color={props.color} />
                }}
            />
            <BottomTab.Screen
                name={EBottomScreens.FAVOURITES}
                component={BottomTabsRoutes.Favourites}
                options={{
                    tabBarIcon: (props) => <Heart size={props.size} color={props.color} />
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigator;
