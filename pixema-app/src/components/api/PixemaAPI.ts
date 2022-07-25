import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovie } from "../types/IMovie";
import { IBaseQuery, IQuery } from "../types/IQuery";
import { getCurrentYear } from "../helpers/getCurrentYear";
import { IPerson } from "../types/IPerson";
import { IData } from "../types/IData";
import { API_KEY, API_URL } from "../constants/api";
import { IMovies } from "../types/IMovies";

export const pixemaAPI = createApi({
  reducerPath: "pixemaAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getMovieById: build.query<IMovie, string | string[] | undefined>({
      query: (id) => `/movie?search=${id}&field=id&token=${API_KEY}`,
    }),
    getMoviesById: build.query<IData, IBaseQuery>({
      query: ({ query, limit }) =>
        `/movie?${query}&limit=${limit}&sortField=rating.kp&sortType=-1&selectFields=genres year name typeNumber id poster rating &token=${API_KEY}`,
    }),
    getNewMovies: build.query<IData, IBaseQuery>({
      query: ({ limit, type }) =>
        `/movie?field=rating.kp&search=1-10&field=year&search=2021-${getCurrentYear()}&field=typeNumber&search=${type}&limit=${limit}&sortField=year&selectFields=genres videos.trailers year name description ageRating id poster rating &sortType=-1&sortField=votes.imdb&sortType=-1&token=${API_KEY}`,
    }),
    getTrendMovies: build.query<IData, IBaseQuery>({
      query: ({ limit, type }) =>
        `/movie?field=rating.kp&search=1-10&field=typeNumber&search=${type}&limit=${limit}&sortField=year&selectFields=genres videos.trailers year name description ageRating id poster rating &sortType=-1&sortField=rating.imdb&sortType=-1&token=${API_KEY}`,
    }),
    getMovies: build.query<IData, IQuery>({
      query: ({ filters, page, type }) =>
        `/movie?${filters.genre}&search[]=${filters.year}&field[]=year&search[]=${filters.rating}&field=rating.kp&search=!null&field=name&search=${type}&field=typeNumber&search=!null&field=votes.kp&sortField=year&sortType=${filters.sortBy}&limit=10&page=${page}&token=${API_KEY}`,
    }),
    getMoviesBySearch: build.query<IMovies, IBaseQuery>({
      query: ({ query, type, limit }) =>
        `/movie?search=${query}&field=name&limit=${limit}&sortField=rating.kp&sortType=-1&field=typeNumber&search=${type}&isStrict=false&token=${API_KEY}`,
    }),
    getPersonsBySearch: build.query<IData, IBaseQuery>({
      query: ({ query, limit }) =>
        `/person?${query}&isStrict=false&limit=${limit}&token=${API_KEY}`,
    }),
    getPersonById: build.query<IPerson, string | string[] | undefined>({
      query: (id) => `/person?search=${id}&field=id&token=${API_KEY}`,
    }),
  }),
});

export const {
  useGetNewMoviesQuery,
  useGetTrendMoviesQuery,
  useGetMoviesQuery,
  useGetMoviesBySearchQuery,
  useGetPersonByIdQuery,
  useGetMoviesByIdQuery,
  useGetMovieByIdQuery,
  useGetPersonsBySearchQuery,
} = pixemaAPI;

export const {
  getNewMovies,
  getTrendMovies,
  getMovies,
  getMoviesBySearch,
  getPersonById,
  getMovieById,
  getMoviesById,
  getPersonsBySearch,
} = pixemaAPI.endpoints;
