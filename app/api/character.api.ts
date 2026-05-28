import { API_ROUTES } from "$constants/api.constants";
import { ICharacterApiRequestDto, ICharacterApiResponseDto } from "$dto/character.dto";
import { convertToQueryParams } from "$helpers/api.helper";
import { axiosInstance } from "$utils/axios-instance";

export const characterApi = async (filters: ICharacterApiRequestDto): Promise<ICharacterApiResponseDto> => {
    const query = convertToQueryParams(filters);
    const response = await axiosInstance.get<ICharacterApiResponseDto>(API_ROUTES.CHARACTERS.concat(`?${query}`));
    return response.data;
};
