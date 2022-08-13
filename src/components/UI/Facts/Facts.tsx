import { useAppSelector } from "../../store/hooks/redux";
import { IFact } from "../../types/IFact";
import "./Facts.scss";

interface IFacts {
  facts: IFact[] | undefined;
}

const Facts = ({ facts }: IFacts) => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  return (
    <>
      <ul className="facts">
        {facts?.map((item) => (
          <li
            className="facts-item"
            key={item.value}
            dangerouslySetInnerHTML={{ __html: item.value }}
            style={{ color: theme === "light" ? "#242426" : "#afb2b6" }}
          />
        ))}
      </ul>
    </>
  );
};

export default Facts;
