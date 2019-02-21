import React, {Component} from "react";
import './CompetitionItem.css';
import {joinCompetition, hasUserJoined} from '../util/APIUtils';
import {Link} from 'react-router-dom';

class CompetitionItem extends Component {

    handleJoinClick(e, id) {
        e.preventDefault();
        console.log('The link was clicked.' + id);
        joinCompetition(id)
            .then(response => {
                console.log("Joined competition");
                console.log(response);

                this.setState({state: this.state});

            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        const item = this.props.item;
        const currentUser = this.props.currentUser;

        return (
            <div className="wrapper">

                <div className="card radius shadowDepth1">
                    <div className="card__content card__padding">
                        {hasUserJoined(item, currentUser) ? (<br/>) :
                            (
                                <div className="card__share">
                                    <a href="#" id="share" className="share-icon"
                                       onClick={(e) => this.handleJoinClick(e, item.competition_id)}>Join</a>
                                </div>
                            )}

                        <div className="card__meta">
                            <Link to={{pathname: "/competition/" + item.competition_id}}>{item.name}</Link>
                            <time className="time">Starting: {item.startDate}</time>
                            <time className="time">Ending: {item.endDate}</time>
                        </div>

                        <article className="card__article">
                            <h2><a href="#"/></h2>
                        </article>
                    </div>

                    <div className="card__action">
                        <div className="card__author">
                            <img id="participant_image" src={item.creator == null ? ("http://lorempixel.com/40/40/sports/") : (item.creator.imageUrl)} alt="user"/>
                            <div className="card__author-content">
                                Created By <a href="#">{item.creator == null ? "No creator" : item.creator.name}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (CompetitionItem);




