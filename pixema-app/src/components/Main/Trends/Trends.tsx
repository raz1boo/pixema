import TrendMovies from "../Movies/TrendMovies";
import "./Trends.scss";

const Trends = () => {
  return (
    <div className="trends">
        <TrendMovies type={1} />
        <TrendMovies type={2} />
        <TrendMovies type={3} />
    </div>
  );
};

export default Trends;
