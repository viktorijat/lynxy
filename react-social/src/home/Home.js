import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <div className="container">
                    <div className="graf-bg-container">
                        <img src="logo.png" width="600"/>
                    </div>
                    <h1 className="home-title">Don't be fat and ugly. Be just ugly.</h1>
                </div>
            </div>
        )
    }
}

export default Home;