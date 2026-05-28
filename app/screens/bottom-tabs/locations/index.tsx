import React from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { ThemedView, ThemeText } from '$components/ui';

const Locations: React.FC<BottomTabStackScreenProps<EBottomScreens.LOCATIONS>> = () => {

    return (
        <ThemedView>
            <ThemeText>Locations</ThemeText>
        </ThemedView>
    );
};

export default Locations;
