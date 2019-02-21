import React, {Component} from "react";
import './CompetitionItem.css';
import {joinCompetition} from '../util/APIUtils';
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
        const {item} = this.props;

        console.log("ITEM: " + item);

        return (
            <div className="wrapper">

                <div className="card radius shadowDepth1">
                    <div className="card__content card__padding">
                        <div className="card__share">
                            <a href="#" id="share" className="share-icon"
                               onClick={(e) => this.handleJoinClick(e, item.competition_id)}>Join</a>
                            <Link id="share1" className="share-icon"
                                  to={{pathname: "/competition/" + item.competition_id}}>View</Link>
                        </div>

                        <div className="card__meta">
                            <a href="#">{item.name}</a>
                            <time className="time">Starting: {item.startDate}</time>
                            <time className="time">Ending: {item.endDate}</time>
                        </div>

                        <article className="card__article">
                            <h2><a href="#"/></h2>
                        </article>
                    </div>

                    <div className="card__action">
                        <div className="card__author">
                            <img src="http://lorempixel.com/40/40/sports/" alt="user"/>
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




