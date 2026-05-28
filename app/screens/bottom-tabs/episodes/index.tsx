import React, { useMemo, useCallback } from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { ThemedView, ThemeText } from '$components/ui';
import { TabHeader } from '$components/navigation';
import { useAppTheme } from '$hooks/common';
import { styling } from './styles';
import { Episode } from '$components/layout';
import { SectionList } from 'react-native';

const MOCK_EPISODES = Array.from({ length: 51 }).map((_, i) => {
    const season = Math.floor(i / 11) + 1;
    const episode = (i % 11) + 1;
    // Generate some random character IDs for each episode
    const characterCount = Math.floor(Math.random() * 15) + 5;
    const characters = Array.from({ length: characterCount }).map(() => {
        const charId = Math.floor(Math.random() * 800) + 1;
        return `https://rickandmortyapi.com/api/character/${charId}`;
    });

    return {
        id: String(i + 1),
        name: `Episode ${i + 1}`,
        air_date: 'December 2, 2013',
        episode: `S${season.toString().padStart(2, '0')}E${episode.toString().padStart(2, '0')}`,
        characters,
        url: `https://rickandmortyapi.com/api/episode/${i + 1}`
    }
});

const Episodes: React.FC<BottomTabStackScreenProps<EBottomScreens.EPISODES>> = () => {

    const { theme, insets } = useAppTheme();
    const styles = styling(theme, insets);

    const sections = useMemo(() => {
        const grouped = MOCK_EPISODES.reduce((acc, ep) => {
            const seasonStr = ep.episode.substring(1, 3);
            const seasonName = `Season ${parseInt(seasonStr, 10)}`;
            if (!acc[seasonName]) {
                acc[seasonName] = [];
            }
            acc[seasonName].push(ep);
            return acc;
        }, {} as Record<string, typeof MOCK_EPISODES>);

        return Object.entries(grouped).map(([title, data]) => ({
            title,
            data
        }));
    }, []);

    const renderItem = useCallback(({ item }: any) => {
        return <Episode episode={item} theme={theme} />;
    }, [theme]);

    const renderSectionHeader = useCallback(({ section: { title } }: any) => {
        return <ThemeText style={styles.sectionHeader}>{title}</ThemeText>;
    }, [styles.sectionHeader]);

    return (
        <ThemedView>
            <TabHeader headerText='Episodes' theme={theme} />
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.contentContainer}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                stickySectionHeadersEnabled={true}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
            />
        </ThemedView>
    );
};

export default Episodes;
