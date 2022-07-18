import "./IframeModal.scss";
import cn from "classnames";
import { HiOutlineX } from "react-icons/hi";
import { useOutsideClick } from "rooks";
import { useRef } from "react";

interface Iframe {
  src: string;
  active: boolean;
  closeModal: () => void;
}

const IframeModal = ({ src, active, closeModal }: Iframe) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, closeModal);
  return (
    <div className={cn("iframe-modal", active && "active")}>
      <div className="iframe-modal__close-button" onClick={closeModal}>
        <HiOutlineX />
      </div>
      <div
        className={cn("iframe-modal__content", active && "active")}
        ref={ref}
      >
        {active && (
          <iframe
            title="video"
            src={src}
            allow="autoplay; fullscreen"
            frameBorder="0"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default IframeModal;
