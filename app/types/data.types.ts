export interface ICharacter {
    readonly id: number;
    readonly name: string;
    readonly status: string;
    readonly species: string;
    readonly type: string;
    readonly gender: string;
    readonly origin: Pick<ILocation, 'name' | 'url'>;
    readonly location: Pick<ILocation, 'name' | 'url'>;
    readonly image: string;
    readonly episode: string[];
    readonly url: string;
    readonly created: string;
}

export interface IEpisode {
    readonly id: number;
    readonly name: string;
    readonly air_date: string;
    readonly episode: string;
    readonly characters: string[];
    readonly url: string;
    readonly created: string;
}


export interface ILocation {
    readonly id: number;
    readonly name: string;
    readonly type: string;
    readonly dimension: string;
    readonly residents: string[];
    readonly url: string;
    readonly created: string;
}
