import React, { useCallback, useMemo, useState } from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/ui';
import { TabHeader } from '$components/navigation';
import { useAppTheme } from '$hooks/common';
import { styling } from './styles';
import { Location } from '$components/layout';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { useLocations } from '$hooks/modules';
import { ILocation } from '$types/data.types';
import { moderateScale } from '$constants/styles.constants';

const Locations: React.FC<BottomTabStackScreenProps<EBottomScreens.LOCATIONS>> = () => {

    const { theme, insets, colors } = useAppTheme();
    const styles = styling(theme, insets);

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useLocations();

    const locations = useMemo(() => {
        return data?.pages.flatMap(page => page.results) || [];
    }, [data]);

    const renderItem = useCallback(({ item }: { item: ILocation }) => {
        return <Location location={item} theme={theme} />;
    }, [theme]);

    const [isRefreshing, setIsRefreshing] = useState(false);

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
            <TabHeader headerText='Locations' theme={theme} />
            <FlatList
                data={locations}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.contentContainer}
                renderItem={renderItem}
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

export default Locations;
