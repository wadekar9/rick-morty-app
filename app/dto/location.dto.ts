import { ILocation } from "$types/data.types";

export interface ILocationApiResponseDto {
    readonly info: Info;
    readonly results: ILocation[];
}

interface Info {
    readonly count: number;
    readonly pages: number;
    readonly next: string | null;
    readonly prev: string | null;
}