import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovie } from "../types/IMovie";
import { IBaseQuery, IQuery } from "../types/IQuery";
import { getCurrentYear } from "../helpers/getCurrentYear";
import { IPerson } from "../types/IPerson";
import { IData } from "../types/IData";
import { API_KEY, API_URL } from "../constants/api";

export const pixemaAPI = createApi({
  reducerPath: "pixemaAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getMovieById: build.query<IMovie, string | string[] | undefined>({
      query: (id) => `/movie?search=${id}&field=id&token=${API_KEY}`,
    }),
    getNewMovies: build.query<IData, IBaseQuery>({
      query: ({limit, type}) =>
        `/movie?field=rating.kp&search=1-10&field=year&search=2021-${getCurrentYear()}&field=typeNumber&search=${type}&limit=${limit}&sortField=year&selectFields=genres year name id poster rating &sortType=-1&sortField=votes.imdb&sortType=-1&token=${API_KEY}`,
    }),
    getFilmByName: build.query<IData, IQuery>({
      query: ({ name, page }) =>
        `/movie?search=${name}&field=name&isStrict=false&page=${page}&token=${API_KEY}`,
    }),
    getMovies: build.query<IData, IQuery>({
      query: ({ filters, page, type }) =>
        `/movie?${filters.genre}&search[]=${filters.year}&field[]=year&search[]=${filters.rating}&field=rating.kp&search=!null&field=name&search=${type}&field=typeNumber&search=!null&field=votes.kp&sortField=year&sortType=${filters.sortBy}&limit=10&page=${page}&token=${API_KEY}`,
    }),
    getPersonById: build.query<IPerson, string | string[] | undefined>({
      query: (id) => `/person?search=${id}&field=id&token=${API_KEY}`,
    }),
  }),
});

export const {
  useGetNewMoviesQuery,
  useGetMoviesQuery,
  useGetFilmByNameQuery,
  useGetPersonByIdQuery,
  useGetMovieByIdQuery,
} = pixemaAPI;

export const {
  getNewMovies,
  getMovies,
  getFilmByName,
  getPersonById,
  getMovieById,
} = pixemaAPI.endpoints;
