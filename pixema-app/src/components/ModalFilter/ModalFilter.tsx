import "./ModalFilter.scss";
import cn from "classnames";
import { useRef, useState } from "react";
import { useOutsideClick } from "rooks";

interface IModal {
  open: boolean;
  closeModal: () => void;
}

const ModalFilter = ({ open, closeModal }: IModal) => {
  const genres = ["Adventure", "Dramma", "Documental", "Thriller"];
  const [dis, setDis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, closeModal);
  return (
    <>
      {open && <div className="dark-background"></div>}
      <div
        className={cn("modal-filter", open && "modal-filter__active")}
        ref={ref}
      >
        <div className="modal-filter__header">
          <h2>Filters</h2>
          <div className="close-button" onClick={closeModal}>
            <i className="uit uit-multiply"></i>
          </div>
        </div>
        <div className="modal-filter__main">
          <div className="sort-by">
            <h3>Sort by</h3>
            <div className="sort-switcher">
              <button
                disabled={dis}
                onClick={() => setDis(!dis)}
              >
                Rating
              </button>
              <button disabled={dis?false:true} onClick={() => setDis(!dis)}>
                Year
              </button>
            </div>
          </div>
          <div className="movie-name">
            <h3>Full or short movie name</h3>
            <input type="text" placeholder="Your text" />
          </div>
          <div className="genre">
            <h3>Genre</h3>
            <div className="genre-block">
              <ul>
                {genres.map((genre) => (
                  <li key={genre}>
                    {genre}
                    <i className="uit uit-multiply"></i>
                  </li>
                ))}
                <input type="text" maxLength={20} />
                {/* сделать мультиселект */}
              </ul>
            </div>
          </div>
          <div className="years">
            <h3>Years</h3>
            <div className="years-block">
              <input type="text" placeholder="From" />
              <input type="text" placeholder="To" />
            </div>
          </div>
          <div className="rating">
            <h3>Rating</h3>
            <div className="rating-block">
              <input type="text" placeholder="From" />
              <input type="text" placeholder="To" />
            </div>
          </div>
          <div className="country">
            <h3>Country</h3>
            <select name="country" id="country">
              <option value="0" label="Select country">
                Select country
              </option>
              <option value="BLR" label="Belarus">
                Belarus
              </option>
              <option value="RUS" label="Russia">
                Russia
              </option>
            </select>
          </div>
        </div>
        <div className="modal-filter__footer">
          <button className="footer-button clear">Clear filter</button>
          <button className="footer-button results">Show results</button>
        </div>
      </div>
    </>
  );
};

export default ModalFilter;
