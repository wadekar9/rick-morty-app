import React from 'react';
import { Text } from 'react-native';
import { ThemedView, ThemeText } from '$components/ui';
import { AppStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';

const CharacterDetails: React.FC<AppStackScreenProps<EStackScreens.CHARACTER_DETAIL>> = () => {

    return (
        <ThemedView>
            <ThemeText>Character Details</ThemeText>
        </ThemedView>
    );
};

export default CharacterDetails;
