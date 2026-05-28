import React, { useRef, useState, useMemo, useCallback } from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { TabHeader } from '$components/navigation';
import { useAppTheme } from '$hooks/common';
import { styling } from './styles';
import { View, ActivityIndicator, Animated } from 'react-native';
import { Character, CharacterSkeleton } from '$components/layout';
import { CharacterFilterModal } from '$components/modals';
import { EmptyCharactersStatePage } from '$components/pages';
import { SheetModalRef } from '$types/common.types';
import { useCharacters } from '$hooks/modules';
import { moderateScale } from '$constants/styles.constants';

const Characters: React.FC<BottomTabStackScreenProps<EBottomScreens.CHARACTERS>> = () => {

    const { theme, colors, insets } = useAppTheme();
    const styles = styling(theme, insets);

    const [headerHeight, setHeaderHeight] = useState(moderateScale(130));

    const scrollY = useRef(new Animated.Value(0)).current;

    const positiveScrollY = scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
    });

    const diffClampScrollY = Animated.diffClamp(positiveScrollY, 0, headerHeight);

    const headerTranslateY = diffClampScrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -headerHeight],
        extrapolate: 'clamp',
    });

    const modalRef = useRef<SheetModalRef>(null);

    const [search, setSearch] = useState<string>('');
    const [filters, setFilters] = useState<{ status: string; gender: string }>({ status: '', gender: '' });

    const { data, isLoading, fetchNextPage, refetch, hasNextPage, isFetchingNextPage } = useCharacters({
        name: search,
        status: filters.status,
        gender: filters.gender
    });

    const characters = useMemo(() => {
        return data?.pages.flatMap(page => page.results) || [];
    }, [data]);

    const renderFooter = useCallback(() => {
        if (!isFetchingNextPage && !isLoading) return null;
        return (
            <View style={{ padding: moderateScale(16), alignItems: 'center' }}>
                <ActivityIndicator size="small" color={colors['brand-primary']} />
            </View>
        );
    }, [isFetchingNextPage, isLoading]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <View style={{ height: insets.top, backgroundColor: colors.border, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 11 }} />

            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        top: insets.top,
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        backgroundColor: colors.border,
                        transform: [{ translateY: headerTranslateY }]
                    }
                ]}
                onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
            >
                <TabHeader
                    onPressFilter={() => modalRef.current?.open()}
                    onChangeSearch={setSearch}
                    hasSearchBar
                    headerText='Characters'
                    theme={theme}
                />
            </Animated.View>

            <Animated.FlatList
                data={characters}
                keyExtractor={(item, idx) => `${item.id}-${idx}`}
                contentContainerStyle={{
                    paddingTop: headerHeight + insets.top + moderateScale(10),
                    paddingBottom: moderateScale(100) + insets.bottom,
                    paddingHorizontal: moderateScale(20),
                    gap: moderateScale(12)
                }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                initialNumToRender={20}
                maxToRenderPerBatch={10}
                renderItem={({ item }) => <Character character={item} theme={theme} />}
                ListEmptyComponent={() => {
                    if (isLoading && !isFetchingNextPage) {
                        return (
                            <View style={{ gap: moderateScale(12) }}>
                                {[...Array(5)].map((_, i) => (
                                    <CharacterSkeleton key={`skeleton-${i}`} theme={theme} />
                                ))}
                            </View>
                        );
                    }
                    if (!isLoading && !isFetchingNextPage) {
                        return <EmptyCharactersStatePage />;
                    }
                    return null;
                }}
                onEndReached={() => {
                    if (hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                    }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                onRefresh={refetch}
                refreshing={isLoading}
            />

            <CharacterFilterModal
                ref={modalRef}
                theme={theme}
                onApply={setFilters}
            />
        </View>
    );
};

export default Characters;
