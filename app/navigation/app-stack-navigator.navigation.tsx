import React, { useEffect, Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './bottom-tab-navigator.navigation';
import { AppStackParamsList } from '$types/navigation.types';
import { appStackNavigationRef } from '$utils/navigation';
import { EStackScreens } from '$constants/screen.constants';
import { StackRoutes } from './routes';
import BootSplash from 'react-native-bootsplash';
import { ActivityIndicator, View } from 'react-native';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

const ScreenFallback = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
        <ActivityIndicator size="large" />
    </View>
);

const AppStackNavigator = () => {

    useEffect(() => {
        BootSplash.hide({ fade: true })
    }, [])

    return (
        <NavigationContainer
            ref={appStackNavigationRef}
        >
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name={EStackScreens.BOTTOM_TAB_NAVIGATOR} component={BottomTabNavigator} />
                <AppStack.Screen name={EStackScreens.CHARACTER_DETAIL}>
                    {(props) => (
                        <Suspense fallback={<ScreenFallback />}>
                            <StackRoutes.CharacterDetails {...props} />
                        </Suspense>
                    )}
                </AppStack.Screen>
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default AppStackNavigator;
