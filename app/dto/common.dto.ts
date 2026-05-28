export interface BaseApiResponse<T> {
    data: T;
    message: string;
    status: number | boolean;
}

export interface IDDto {
    id: number | string;
}

export interface IPaginationDto {
    page: number;
    limit?: number;
}
