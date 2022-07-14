interface IFilters {
    rating: string;
    year: string;
    sortBy?: string;
    genre: string;
    country: string;
}

export interface IBaseQuery {
    type?: number;
    query?: string;
    limit?: number;
    page?: number;
}

export interface IQuery extends IBaseQuery {
    filters: IFilters;
    name?: string | string[] | undefined;
    id?: string | string[] | undefined;
}