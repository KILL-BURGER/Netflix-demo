import React from "react";
import './NotFoundPage.style.css';

const NotFoundPage = () => {
    return <div className={'container not-found-page-main'}>
        <div>
            <h1>😩</h1>
            <h1>404</h1>
            <h3>NOT FOUND</h3>
            <button className={'not-found-page-btn'}>Netflix Home</button>
        </div>
    </div>;
};

export default NotFoundPage;