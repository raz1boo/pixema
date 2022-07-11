import React from "react";
import "./Movie.scss";

interface MovieProps {
  poster: string;
  rating: number;
  title: string;
  genre: string;
}

const Movie = ({ title, poster, genre, rating }: MovieProps) => {
  return (
    <section className="movie">
      <span>
        <span className="rating"><p>{rating}</p></span>
        <img className="poster" src={poster} alt="" />
      </span>
      <h2>{title}</h2>
      <h3>{genre}</h3>
    </section>
  );
};

export default Movie;
