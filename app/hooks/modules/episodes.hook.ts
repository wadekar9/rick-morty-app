import { episodeApi } from "$api/episode.api";
import { useInfiniteQuery } from "@tanstack/react-query";

/**
 * Hook to fetch paginated episode data from the API.
 * Returns infinite query properties to support flat list scrolling.
 * @returns Episode data and React Query pagination helpers.
 */
export const useEpisodes = () => {
    const { data, isLoading, isError, error, fetchNextPage, refetch, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['episodes'],
        queryFn: ({ pageParam = 1 }) => episodeApi(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.info?.next ? Number(lastPage.info?.next?.split('page=')[1]) : undefined;
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });


    return {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        refetch,
        hasNextPage,
        isFetchingNextPage
    }
}