
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/home.scss';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <h1 className="text-center light-gray">{"Occupation Import Formatter"}</h1>
                <Link to="/youtube-import-formatter/youtube">
                    <div className="home__logo-container">
                        <img src={require("./assets/youtube_logo.png")} alt="" />
                    </div>
                </Link>
            </div>
        );
    }
}

export default Home;
