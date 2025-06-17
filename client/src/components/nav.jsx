import React from 'react';
import './nav.css'; // Optional: Add styles in a separate CSS file
import mru from '../assets/image2.png'
const Nav = () => {
    return (
        <header style={{ backgroundColor: 'blue', padding: '10px' }}>
            <img
                src={mru}
                alt="Logo"
                style={{ height: '50px' }}
            />
        </header>
    );
};

export default Nav;