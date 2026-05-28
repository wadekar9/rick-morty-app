import React from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { ThemedView, ThemeText } from '$components/ui';

const Favourites: React.FC<BottomTabStackScreenProps<EBottomScreens.FAVOURITES>> = () => {

    return (
        <ThemedView>
            <ThemeText>Favourites</ThemeText>
        </ThemedView>
    );
};

export default Favourites;
