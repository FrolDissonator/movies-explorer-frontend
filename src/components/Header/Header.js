import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import { useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const isBlackBackground = location.pathname !== '/';

    return (
        <header className={`header ${isBlackBackground ? 'header_background_black' : ''}`}>
            <Navigation />
        </header>
    );
}

export default Header;
