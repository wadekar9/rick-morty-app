import React, { useCallback } from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/ui';
import { TabHeader } from '$components/navigation';
import { useAppSelector, useAppTheme } from '$hooks/common';
import { styling } from './styles';
import { FlatList } from 'react-native';
import { ICharacter } from '$types/data.types';
import { Character } from '$components/layout';
import { EmptyFavouritesStatePage } from '$components/pages';

const Favourites: React.FC<BottomTabStackScreenProps<EBottomScreens.FAVOURITES>> = () => {

    const { theme, insets } = useAppTheme();
    const styles = styling(theme, insets);

    const favorites = useAppSelector((state) => state.favourites) || [];

    const renderItem = useCallback(({ item }: { item: ICharacter }) => {
        return <Character character={item} theme={theme} />;
    }, [theme]);

    return (
        <ThemedView>
            <TabHeader headerText='Favourites' theme={theme} />
            <FlatList
                data={favorites}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.contentContainer}
                renderItem={renderItem}
                ListEmptyComponent={() => <EmptyFavouritesStatePage />}
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                initialNumToRender={5}
                scrollEventThrottle={16}
            />
        </ThemedView>
    );
};

export default Favourites;
