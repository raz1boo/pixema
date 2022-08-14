import "./PlayerModal.scss";
import cn from "classnames";
import { HiOutlineX } from "react-icons/hi";
import { useOutsideClick } from "rooks";
import { useEffect, useRef } from "react";

interface IPlayer {
  id: number | undefined;
  active: boolean;
  closeModal: () => void;
}

const IPlayerModal = ({ id, active, closeModal }: IPlayer) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, closeModal);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "film/pixema/player.js";
    document.body.appendChild(script);
    script.remove();
  }, [id]);
  return (
    <div className={cn("player-modal", active && "active")}>
      <div className="player-modal__close-button" onClick={closeModal}>
        <HiOutlineX />
      </div>
      <div
        className={cn("player-modal__content", active && "active")}
        ref={ref}
      >
        <div
          id="kinobd"
          data-resize="1"
          data-bg="#000"
          data-kinopoisk={id}
        ></div>
      </div>
    </div>
  );
};

export default IPlayerModal;
