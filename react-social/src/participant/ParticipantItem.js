import React, {Component} from "react";
import './ParticipantItem.css';
import {Link} from 'react-router-dom';

class ParticipantItem extends Component {

    render() {
        const {item} = this.props;

        console.log("ParticipantItem:", item.winner == null);

        return (
            <div className="card__meta">
                <div className="participants card__author">
                    <div>
                        <img id="participant_image" src={item.imageUrl} alt="user"/>
                        <div className="card__author-content">
                            <a href="#">{item.name}</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (ParticipantItem);