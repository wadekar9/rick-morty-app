import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './bottom-tab-navigator.navigation';
import { AppStackParamsList } from '$types/navigation.types';
import { appStackNavigationRef } from '$utils/navigation';
import { EStackScreens } from '$constants/screen.constants';
import { StackRoutes } from './routes';
import BootSplash from 'react-native-bootsplash';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

const AppStackNavigator = () => {

    useEffect(() => {
        BootSplash.hide({ fade: true })
    }, [])

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
