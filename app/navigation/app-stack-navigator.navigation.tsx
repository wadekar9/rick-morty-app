import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './bottom-tab-navigator.navigation';
import { AppStackParamsList } from '$types/navigation.types';
import { useNavigationTheme } from '$hooks/navigation';
import { appStackNavigationRef } from '$utils/navigation';
import { EStackScreens } from '$constants/screen.constants';
import { StackRoutes } from './routes';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

const AppStackNavigator = () => {

    const navigationTheme = useNavigationTheme();

    return (
        <NavigationContainer
            ref={appStackNavigationRef}
        >
            <AppStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
                <AppStack.Screen name={EStackScreens.BOTTOM_TAB_NAVIGATOR} component={BottomTabNavigator} />
                <AppStack.Screen name={EStackScreens.CHARACTER_DETAIL} component={StackRoutes.CharacterDetails} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default AppStackNavigator;
