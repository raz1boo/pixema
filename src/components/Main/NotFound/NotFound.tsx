import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/redux";
import "./NotFound.scss";

const NotFound = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  return (
    <section className="not-found">
      <h1 style={{ color: theme === "light" ? "#242426" : "#fff" }}>
        404. Страница не найдена
      </h1>
      <p style={{ color: theme === "light" ? "#242426" : "#fff" }}>
        Возможно, она была перемещена, или вы просто неверно указали адрес
        страницы.
      </p>
      <Link to="/" style={{ color: theme === "light" ? "#242426" : "#fff" }}>
        Вернуться на главную
      </Link>
    </section>
  );
};

export default NotFound;
