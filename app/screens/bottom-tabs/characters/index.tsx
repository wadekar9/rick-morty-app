import React, { useRef } from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { ThemedView, ThemeText } from '$components/ui';
import { TabHeader } from '$components/navigation';
import { useAppTheme } from '$hooks/common';
import { styling } from './styles';
import { useAnimatedValue, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Character } from '$components/layout';
import { CharacterFilterModal } from '$components/modals';
import { SheetModalRef } from '$types/common.types';

const Characters: React.FC<BottomTabStackScreenProps<EBottomScreens.CHARACTERS>> = () => {

    const { theme, insets } = useAppTheme();
    const styles = styling(theme, insets);

    const scrollY = useAnimatedValue(0);

    const modalRef = useRef<SheetModalRef>(null);

    return (
        <ThemedView>
            <TabHeader onPressFilter={() => modalRef.current?.open()} hasSearchBar headerText='Characters' theme={theme} />
            <View style={styles.container}>

                <FlatList
                    data={Array.from({ length: 5 }).fill(1)}
                    keyExtractor={(_, idx) => idx.toString()}
                    contentContainerStyle={styles.contentContainer}
                    scrollEventThrottle={16}
                    renderItem={() => <Character theme={theme} />}
                />

            </View>

            <CharacterFilterModal ref={modalRef} theme={theme} />
        </ThemedView>
    );
};

export default Characters;
