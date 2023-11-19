import "./AboutMe.css";
import ownerPhoto from "../../images/owner-photo.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <div className="section">
        <div className="section__title-container">
          <h2 className="section__title">Студент</h2>
        </div>
        <article className="about-me__container">
          <div className="about-me__info">
            <h3 className="about-me__name">Сергей</h3>
            <p className="about-me__profession">
              Фронтенд-разработчик, 32 года
            </p>
            <div className="about-me__description-container">
              <p className="section__paragraph about-me__description">
                Я родился в Ставрополе, закончил факультет филологии и
                журналистики СГУ. С 2015 года живу в Санкт-Петербурге. Женат.
                Люблю играть на электрогитаре, слушать музыку и читать книги. А
                еще у меня есть прекрасный песик породы вельш-корги пемброк по
                кличке Ойсин. С 2018 года работаю в известной российской
                компании REDMOND, пишу инструкции на бытовую технику. После
                окончания учебы надеюсь найти работу в IT.
              </p>
              <a
                href="https://github.com/FrolDissonator"
                target="_blank"
                rel="noreferrer"
                className="about-me__link"
              >
                Github
              </a>
            </div>
          </div>
          <img
            src={ownerPhoto}
            alt="фотография владельца страницы"
            className="about-me__photo"
          />
        </article>
      </div>
    </section>
  );
}

export default AboutMe;
