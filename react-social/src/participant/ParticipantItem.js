import React, {Component} from "react";
import './ParticipantItem.css';
import {Link} from 'react-router-dom';

class ParticipantItem extends Component {

    render() {
        const {item} = this.props;

        console.log("ParticipantItem:", item.winner == null);

        return (
            <div className="wrapper">

                <div className="card radius shadowDepth1">
                    <div className="card__content card__padding">
                        <div className="card__meta">
                            <a href="#">{item.user_id}</a>
                            <time className="time">{item.name}</time>
                            <time className="time">Starting: {item.startDate}</time>
                            <time className="time">Ending: {item.endDate}</time>
                        </div>

                        <article className="card__article">
                            <h2><a href="#"/></h2>

                            <div className="participants card__author">
                                <p>Participants: </p>
                                <div>
                                    <img src="http://lorempixel.com/output/people-q-c-40-40-9.jpg" alt="user"/>
                                    <div className="card__author-content">
                                        <a href="#">Misha Sorokin</a>
                                    </div>
                                </div>

                                <div>
                                    <img src="http://lorempixel.com/output/people-q-c-40-40-1.jpg" alt="user"/>
                                    <div className="card__author-content">
                                        <a href="#">Sergei Kotov</a>
                                    </div>
                                </div>

                                <div>
                                    <img src="http://lorempixel.com/output/people-q-c-40-40-3.jpg" alt="user"/>
                                    <div className="card__author-content">
                                        <a href="#">Marcin Wrzos</a>
                                    </div>
                                </div>
                            </div>


                        </article>
                    </div>

                    <div className="card__action">
                        <div className="card__author">
                            <img src="http://lorempixel.com/40/40/sports/" alt="user"/>
                            <div className="card__author-content">
                                Created By <a href="#">
                                {item.creator == null ? "No creator" : item.creator.name}</a>
                            </div>
                            <div className="card__author-content">
                                Winner <a href="#">
                                    {item.winner == null ? "Nobody won yet" : item.winner.name}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (ParticipantItem);