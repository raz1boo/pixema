import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovie } from "../types/IMovie";
import { IBaseQuery, IQuery } from "../types/IQuery";
import { getCurrentYear } from "../helpers/getCurrentYear";
import { IPerson } from "../types/IPerson";
import { IData, IDataPerson } from "../types/IData";
import { API_KEY, API_URL } from "../constants/api";

export const pixemaAPI = createApi({
  reducerPath: "pixemaAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getMovieById: build.query<IMovie, number | string | string[] | undefined>({
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
    getMoviesByFilters: build.query<IData, IQuery>({
      query: ({ filters, limit }) =>
        `/movie?${filters.genres.map(i=>i.value.length?`search[]=${i.value}&field[]=genres.name`:null).join('&')}&search[]=${filters.year.join('-')}&field[]=year&search[]=${filters.rating.join('-')}&field=rating.kp&sortField=year&sortType=${filters.sortBy}&limit=${limit}&selectFields=genres name id poster rating &token=${API_KEY}`,
    }),
    getMoviesBySearch: build.query<IData, IBaseQuery>({
      query: ({ query, type, limit }) =>
        `/movie?search=${query}&field=name&limit=${limit}&sortField=rating.kp&sortType=-1&field=typeNumber&search=${type}&isStrict=false&token=${API_KEY}`,
    }),
    getMoviesByName: build.query<IData, IBaseQuery>({
      query: ({ query, limit }) =>
        `/movie?search=${query}&field=name&limit=${limit}&sortField=rating.kp&sortType=-1&isStrict=false&selectFields=genres name id poster rating &token=${API_KEY}`,
    }),
    getPersonsBySearch: build.query<IDataPerson, IBaseQuery>({
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
  useGetMoviesByFiltersQuery,
  useGetMoviesBySearchQuery,
  useGetPersonByIdQuery,
  useGetMoviesByIdQuery,
  useGetMovieByIdQuery,
  useGetPersonsBySearchQuery,
  useGetMoviesByNameQuery,
} = pixemaAPI;

export const {
  getNewMovies,
  getMoviesByFilters,
  getMoviesBySearch,
  getPersonById,
  getMovieById,
  getMoviesById,
  getPersonsBySearch,
  getMoviesByName,
} = pixemaAPI.endpoints;
