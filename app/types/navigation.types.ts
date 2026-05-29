import { EBottomScreens, EStackScreens } from '$constants/screen.constants';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type AppStackParamsList = {
    [EStackScreens.CHARACTER_DETAIL]: { id: number };
    [EStackScreens.BOTTOM_TAB_NAVIGATOR]: undefined;
}

export type BottomTabParamsList = {
    [EBottomScreens.CHARACTERS]: undefined;
    [EBottomScreens.EPISODES]: undefined;
    [EBottomScreens.LOCATIONS]: undefined;
    [EBottomScreens.FAVOURITES]: undefined;
}

export type BottomTabStackScreenProps<T extends keyof BottomTabParamsList> = BottomTabScreenProps<BottomTabParamsList, T>;
export type BottomTabStackNavigationProps = BottomTabNavigationProp<BottomTabParamsList>;

export type AppStackScreenProps<T extends keyof AppStackParamsList> = NativeStackScreenProps<AppStackParamsList, T>;
export type AppStackNavigationProps = NativeStackNavigationProp<AppStackParamsList>;
