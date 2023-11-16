import React from "react";
import "./Loader.css";

function Loader({ showButton, onClick }) {
  return (
    <div className="loader">
      {showButton && (
        <button className="loader__button" type="button" onClick={onClick}>
          Ещё
        </button>
      )}
    </div>
  );
}

export default Loader;
