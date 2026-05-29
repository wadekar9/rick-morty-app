import { ICharacter } from "$types/data.types";

export interface ICharacterApiRequestDto {
    page?: number;
    name?: string;
    status?: string;
    gender?: string;
}

export interface ICharacterApiResponseDto {
    readonly info: Info;
    readonly results: ICharacter[];
}

export interface ISingleCharacterApiResponseDto extends ICharacter { }

interface Info {
    readonly count: number;
    readonly pages: number;
    readonly next: string | null;
    readonly prev: string | null;
}