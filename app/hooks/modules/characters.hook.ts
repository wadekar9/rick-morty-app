import { characterApi, singleCharacterApi } from "$api/character.api";
import { ICharacterApiRequestDto } from "$dto/character.dto";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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


/**
 * Hook to fetch a single character by ID from the Rick & Morty API.
 * Results are cached for 5 minutes and retained in memory for 30 minutes.
 * The query is disabled if the provided `id` is falsy.
 *
 * @param id - The numeric ID of the character to fetch.
 * @returns The character data along with React Query loading, error, and refetch states.
 */
export const useCharacter = (id: number) => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['character', id],
        queryFn: () => singleCharacterApi(id),
        retry: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        enabled: !!id
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch
    }
}