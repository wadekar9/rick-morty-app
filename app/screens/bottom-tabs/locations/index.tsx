import React, { useCallback } from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/ui';
import { TabHeader } from '$components/navigation';
import { useAppTheme } from '$hooks/common';
import { styling } from './styles';
import { Location } from '$components/layout';
import { FlatList } from 'react-native';

const MOCK_LOCATIONS = Array.from({ length: 126 }).map((_, i) => {
    // Generate some random character IDs for each location residents
    const characterCount = Math.floor(Math.random() * 8); // 0 to 7 residents
    const residents = Array.from({ length: characterCount }).map(() => {
        const charId = Math.floor(Math.random() * 800) + 1;
        return `https://rickandmortyapi.com/api/character/${charId}`;
    });

    const types = ["Planet", "Cluster", "Space station", "Microverse", "TV", "Resort", "Fantasy town", "Dream"];
    const type = types[Math.floor(Math.random() * types.length)];

    return {
        id: i + 1,
        name: `Location ${i + 1}`,
        type,
        dimension: `Dimension C-${100 + i}`,
        residents,
        url: `https://rickandmortyapi.com/api/location/${i + 1}`,
        created: "2017-11-10T12:42:04.162Z"
    };
});

const Locations: React.FC<BottomTabStackScreenProps<EBottomScreens.LOCATIONS>> = () => {

    const { theme, insets } = useAppTheme();
    const styles = styling(theme, insets);

    const renderItem = useCallback(({ item }: any) => {
        return <Location location={item} theme={theme} />;
    }, [theme]);

    return (
        <ThemedView>
            <TabHeader headerText='Locations' theme={theme} />
            <FlatList
                data={MOCK_LOCATIONS}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.contentContainer}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
            />
        </ThemedView>
    );
};

export default Locations;
