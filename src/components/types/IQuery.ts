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

export interface IAuth {
  email: string;
  id?: number;
  username: string;
}

export interface ISignUp extends IAuth {
  password: string;
  cpassword?: string;
  npassword?: string;
}

export interface IToken {
  refresh?: string;
  access: string;
}

export interface ICreateToken {
  email: string;
  password: string;
}

export interface IPatchUserName {
  token?: string;
  username: string;
  id: number;
}

export interface IPatchPassword {
  token?: string;
  new_password?: string;
  current_password?: string;
}

export interface IActivate {
  uid: string;
  token: string;
}

export interface IResetPassword {
  uid: string;
  token: string;
  password: string;
  cpassword?: string;
}
