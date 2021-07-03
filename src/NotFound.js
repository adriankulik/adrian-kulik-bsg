import './style/style.css';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="notFound">
    <div className="notFound__container">
        <h1 className="notFound__container__h1">OOPS!</h1>
        <h2 className="notFound__container__h2">We can't find the page you're looking for.</h2>
        <Link to="/">
            <button className="notFound__container__button">
                Back
            </button>
        </Link>
    </div>
  </div>
);

export default NotFound;