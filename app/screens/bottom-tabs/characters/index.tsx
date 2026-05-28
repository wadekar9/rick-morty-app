import React, { useRef, useState, useMemo, useCallback } from 'react';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/ui';
import { TabHeader } from '$components/navigation';
import { useAppTheme } from '$hooks/common';
import { styling } from './styles';
import { useAnimatedValue, View, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Character, CharacterSkeleton } from '$components/layout';
import { CharacterFilterModal } from '$components/modals';
import { EmptyCharactersStatePage } from '$components/pages';
import { SheetModalRef } from '$types/common.types';
import { useCharacters } from '$hooks/modules';
import { moderateScale } from '$constants/styles.constants';

const Characters: React.FC<BottomTabStackScreenProps<EBottomScreens.CHARACTERS>> = () => {

    const { theme, insets, colors } = useAppTheme();
    const styles = styling(theme, insets);

    const scrollY = useAnimatedValue(0);

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
        <ThemedView>
            <TabHeader
                onPressFilter={() => modalRef.current?.open()}
                onChangeSearch={setSearch}
                hasSearchBar
                headerText='Characters'
                theme={theme}
            />
            <View style={styles.container}>

                <FlatList
                    data={characters}
                    keyExtractor={(item, idx) => `${item.id}-${idx}`}
                    contentContainerStyle={styles.contentContainer}
                    scrollEventThrottle={16}
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
                />

            </View>

            <CharacterFilterModal
                ref={modalRef}
                theme={theme}
                onApply={setFilters}
            />
        </ThemedView>
    );
};

export default Characters;
