import { characterApi } from "$api/character.api";
import { ICharacterApiRequestDto } from "$dto/character.dto";
import { useInfiniteQuery } from "@tanstack/react-query";

/**
 * Hook to fetch paginated character data from the Rick & Morty API.
 * Supports filtering by character name, status, and gender.
 * @param filters Object containing search and filter criteria.
 * @returns Paginated character results and React Query states.
 */
export const useCharacters = (filters: Omit<ICharacterApiRequestDto, 'page'>) => {

    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
        queryKey: ['characters', filters.status, filters.gender, filters.name],
        queryFn: ({ pageParam = 1 }) => characterApi({ ...filters, page: pageParam as number }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.info?.next ? Number(lastPage.info?.next?.split('page=')[1]) : undefined;
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    })

    return {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    }
}