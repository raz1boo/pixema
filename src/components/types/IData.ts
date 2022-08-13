import {IMovie, IMoviePerson} from './IMovie';

export interface IData {
    docs: IMovie[];
    total?: number;
    limit?: number;
    page?: number;
    pages?: number;
}
export interface IDataPerson {
    docs: IMoviePerson[];
    total?: number;
    limit?: number;
    page?: number;
    pages?: number;
}