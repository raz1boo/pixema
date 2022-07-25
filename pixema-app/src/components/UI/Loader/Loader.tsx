import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__container">
        <div className="loader__container__dot"></div>
        <div className="loader__container__dot"></div>
        <div className="loader__container__dot"></div>
        <div className="loader__container__dot"></div>
        <div className="loader__container__dot"></div>
      </div>
    </div>
  );
};

export default Loader;
