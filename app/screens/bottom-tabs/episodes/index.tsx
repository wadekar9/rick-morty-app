import React, { useMemo, useCallback, useState } from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { ThemedView, ThemeText } from '$components/ui';
import { TabHeader } from '$components/navigation';
import { useAppTheme } from '$hooks/common';
import { styling } from './styles';
import { Episode } from '$components/layout';
import { SectionList, ActivityIndicator, View } from 'react-native';
import { useEpisodes } from '$hooks/modules';
import { IEpisode } from '$types/data.types';
import { moderateScale } from '$constants/styles.constants';

const Episodes: React.FC<BottomTabStackScreenProps<EBottomScreens.EPISODES>> = () => {

    const { theme, insets, colors } = useAppTheme();
    const styles = styling(theme, insets);

    const [isRefreshing, setIsRefreshing] = useState(false);
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useEpisodes();

    const sections = useMemo(() => {
        const episodes = data?.pages.flatMap(page => page.results) || [];

        const grouped = episodes.reduce((acc, ep) => {
            const seasonStr = ep.episode.substring(1, 3);
            const seasonName = `Season ${parseInt(seasonStr, 10)}`;
            if (!acc[seasonName]) {
                acc[seasonName] = [];
            }
            acc[seasonName].push(ep);
            return acc;
        }, {} as Record<string, IEpisode[]>);

        return Object.entries(grouped).map(([title, data]) => ({
            title,
            data
        }));
    }, [data]);

    const renderItem = useCallback(({ item }: { item: IEpisode }) => {
        return <Episode episode={item} theme={theme} />;
    }, [theme]);

    const renderSectionHeader = useCallback(({ section: { title } }: { section: { title: string } }) => {
        return <ThemeText style={styles.sectionHeader}>{title}</ThemeText>;
    }, [styles.sectionHeader]);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await refetch();
        setIsRefreshing(false);
    }, [refetch]);

    const renderFooter = useCallback(() => {
        if (!isFetchingNextPage && !isLoading) return null;
        return (
            <View style={{ padding: moderateScale(16), alignItems: 'center' }}>
                <ActivityIndicator size="small" color={colors['brand-primary']} />
            </View>
        );
    }, [isFetchingNextPage, isLoading, colors]);

    return (
        <ThemedView>
            <TabHeader headerText='Episodes' theme={theme} />
            <SectionList
                sections={sections}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.contentContainer}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                stickySectionHeadersEnabled={true}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onEndReached={() => {
                    if (hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                    }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                initialNumToRender={15}
                maxToRenderPerBatch={10}
            />
        </ThemedView>
    );
};

export default Episodes;
