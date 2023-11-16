import "./Techs.css";

function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="section">
        <div className="section__title-container">
          <h2 className="section__title">Технологии</h2>
        </div>
        <h3 className="techs__title">7 технологий</h3>
        <div className="techs__subtitle">
          <p className="section__paragraph">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </div>
        <ul className="techs__grid">
          <li className="techs__card">HTML</li>
          <li className="techs__card">CSS</li>
          <li className="techs__card">JS</li>
          <li className="techs__card">React</li>
          <li className="techs__card">Git</li>
          <li className="techs__card">Express.js</li>
          <li className="techs__card">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
