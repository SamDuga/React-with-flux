import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const activeStyle = {
        color: 'orange'
    };

    return (
        <nav>
            <NavLink exact to='/' activeStyle={activeStyle}>Home</NavLink>
            {' | '}
            <NavLink to='/courses' activeStyle={activeStyle}>Courses</NavLink>
            {' | '}
            <NavLink to='/authors' activeStyle={activeStyle}>Authors</NavLink>
            {' | '}
            <NavLink to='/about' activeStyle={activeStyle}>About</NavLink>
        </nav>
    );
}
