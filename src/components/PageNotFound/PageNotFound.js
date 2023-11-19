import "./PageNotFound.css";
import { Link } from "react-router-dom";
import { PAGE_MAIN } from "../../utils/constants";

function PageNotFound() {
  return (
    <section className="page-not-found">
      <h2 className="page-not-found__title">404</h2>
      <p className="page-not-found__text">Страница не найдена</p>
      <Link className="page-not-found__link" to={PAGE_MAIN}>
        Назад
      </Link>
    </section>
  );
}

export default PageNotFound;
