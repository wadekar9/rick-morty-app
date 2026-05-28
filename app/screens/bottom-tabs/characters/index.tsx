import React from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { ThemedView, ThemeText } from '$components/ui';

const Characters: React.FC<BottomTabStackScreenProps<EBottomScreens.CHARACTERS>> = () => {

    return (
        <ThemedView>
            <ThemeText>Characters</ThemeText>
        </ThemedView>
    );
};

export default Characters;
