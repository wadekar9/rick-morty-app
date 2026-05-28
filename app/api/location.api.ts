import { API_ROUTES } from "$constants/api.constants";
import { ILocationApiResponseDto } from "$dto/location.dto";
import { convertToQueryParams } from "$helpers/api.helper";
import { axiosInstance } from "$utils/axios-instance";

export const locationApi = async (page: number): Promise<ILocationApiResponseDto> => {
    const query = convertToQueryParams({ page });
    const response = await axiosInstance.get<ILocationApiResponseDto>(API_ROUTES.LOCATIONS.concat(`?${query}`));
    return response.data;
};
