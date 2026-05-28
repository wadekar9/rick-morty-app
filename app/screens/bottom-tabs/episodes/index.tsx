import React from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { ThemedView, ThemeText } from '$components/ui';

const Episodes: React.FC<BottomTabStackScreenProps<EBottomScreens.EPISODES>> = () => {

    return (
        <ThemedView>
            <ThemeText>Episodes</ThemeText>
        </ThemedView>
    );
};

export default Episodes;
