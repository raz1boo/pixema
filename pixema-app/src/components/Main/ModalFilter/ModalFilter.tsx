import "./ModalFilter.scss";
import cn from "classnames";
import { HiOutlineX } from "react-icons/hi";
import { useRef, useState } from "react";
import { useOutsideClick } from "rooks";
import getAllCountries from "../../constants/getAllCountries";

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
    <div className={cn("modal-filter", open && "active")}>
      <div className={cn("modal-filter__content", open && "active")} ref={ref}>
        <div className="modal-filter__header">
          <h2>Filters</h2>
          <div className="close-button" onClick={closeModal}>
            <HiOutlineX />
          </div>
        </div>
        <div className="modal-filter__main">
          <div className="modal-filter__sort-by">
            <h3>Sort by</h3>
            <div className="sort-switcher">
              <button disabled={dis} onClick={() => setDis(!dis)}>
                Rating
              </button>
              <button
                disabled={dis ? false : true}
                onClick={() => setDis(!dis)}
              >
                Year
              </button>
            </div>
          </div>
          <div className="modal-filter__movie-name">
            <h3>Full or short movie name</h3>
            <input type="text" placeholder="Your text" />
          </div>
          <div className="modal-filter__genre">
            <h3>Genre</h3>
            <div className="genre-block">
              <ul>
                {genres.map((genre) => (
                  <li key={genre}>
                    {genre}
                    <HiOutlineX />
                  </li>
                ))}
                <input type="text" maxLength={20} />
                {/* сделать мультиселект */}
              </ul>
            </div>
          </div>
          <div className="modal-filter__years">
            <h3>Years</h3>
            <div className="years-block">
              <input type="text" placeholder="From" />
              <input type="text" placeholder="To" />
            </div>
          </div>
          <div className="modal-filter__rating">
            <h3>Rating</h3>
            <div className="rating-block">
              <input type="text" placeholder="From" />
              <input type="text" placeholder="To" />
            </div>
          </div>
          <div className="modal-filter__country">
            <h3>Country</h3>
            <select name="country" id="country">
              <option value="0" label="Select country" />
              {Object.entries(getAllCountries).map((country) => (
                <option
                  key={country[0]}
                  label={country[1]}
                  value={country[0]}
                />
              ))}
            </select>
          </div>
        </div>
        <div className="modal-filter__footer">
          <button className="footer-button clear">Clear filter</button>
          <button className="footer-button results">Show results</button>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
