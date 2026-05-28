import { API_ROUTES } from "$constants/api.constants";
import { IEpisodeApiResponseDto } from "$dto/episode.dto";
import { convertToQueryParams } from "$helpers/api.helper";
import { axiosInstance } from "$utils/axios-instance";

export const episodeApi = async (page: number): Promise<IEpisodeApiResponseDto> => {
    const query = convertToQueryParams({ page });
    const response = await axiosInstance.get<IEpisodeApiResponseDto>(API_ROUTES.EPISODES.concat(`?${query}`));
    return response.data;
};
