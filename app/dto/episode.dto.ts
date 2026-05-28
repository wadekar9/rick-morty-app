import { IEpisode } from "$types/data.types";

export interface IEpisodeApiResponseDto {
    readonly info: Info;
    readonly results: IEpisode[];
}

interface Info {
    readonly count: number;
    readonly pages: number;
    readonly next: string | null;
    readonly prev: string | null;
}