import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";
import { PAGE_MAIN } from "../../utils/constants";

function Header({ loggedIn }) {
  const location = useLocation();
  const isBlackBackground = location.pathname !== PAGE_MAIN;

  return (
    <header
      className={`header ${isBlackBackground ? "header_background_black" : ""}`}
    >
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}

export default Header;
