import { IFact } from "../../types/IFact";
import "./Facts.scss";

interface IFacts {
  facts: IFact[] | undefined;
}

const Facts = ({ facts }: IFacts) => {
  return (
    <>
      <ul className="facts">
        {facts?.map((item) => (
          <li
          className="facts-item"
            key={item.value}
            dangerouslySetInnerHTML={{ __html: item.value }}
          />
        ))}
      </ul>
    </>
  );
};

export default Facts;
