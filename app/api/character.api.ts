import { API_ROUTES } from "$constants/api.constants";
import { ICharacterApiRequestDto, ICharacterApiResponseDto, ISingleCharacterApiResponseDto } from "$dto/character.dto";
import { convertToQueryParams } from "$helpers/api.helper";
import { axiosInstance } from "$utils/axios-instance";

export const characterApi = async (filters: ICharacterApiRequestDto): Promise<ICharacterApiResponseDto> => {
    const query = convertToQueryParams(filters);
    const response = await axiosInstance.get<ICharacterApiResponseDto>(API_ROUTES.CHARACTERS.concat(`?${query}`));
    return response.data;
};

export const singleCharacterApi = async (id: number): Promise<ISingleCharacterApiResponseDto> => {
    const response = await axiosInstance.get<ISingleCharacterApiResponseDto>(API_ROUTES.CHARACTERS.concat(`/${id}`));
    return response.data;
};
