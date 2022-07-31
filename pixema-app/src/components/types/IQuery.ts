interface IGenres {
  label: string;
  value: string;
}

interface IFilters {
  rating: number[];
  year: number[];
  sortBy?: string;
  genres: IGenres[];
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
