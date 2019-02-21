import React, {Component} from 'react';
import ParticipantsList from "../participant/ParticipantsList";
import {getCompetition, submitCompetitionUserData, getCurrentUserScore, hasUserJoined} from "../util/APIUtils";

class Competition extends Component {

    constructor(props) {
        super(props);
        console.log("Competition page loaded")
        console.log(props);
        this.loadCompetition = this.loadCompetition.bind(this);
    }

    handleSubmitClick(e, id) {
        e.preventDefault();
        console.log('Submit was clicked.' + id);
        submitCompetitionUserData(id)
            .then(response => {
                console.log("Submitted competition");
                console.log(response);

                //this.loadCompetition()

            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    loadCompetition() {
        this.setState({
            loading: true
        });

        getCompetition(this.props.match.params.competitionId)
            .then(response => {
                console.log("Competition fetched: ");
                console.log(response);

                this.competition = response;

                this.setState({state: this.state});

            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    componentDidMount() {
        this.loadCompetition();
    }

    render() {

        let currentUserScore = getCurrentUserScore(this.competition, this.props.currentUser);
        let alreadySubmitted = (currentUserScore === undefined);

        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-name">
                        {this.competition ? (
                            <div>
                                <h2>{this.competition.name}</h2>
                                <div className="card__action">
                                    <div className="card__author">
                                        <img id="participant_image" src={this.competition.creator == null ? ("http://lorempixel.com/40/40/sports/") : (this.competition.creator.imageUrl)} alt="user"/>
                                        <div className="card__author-content">
                                            Created By <a href="#">
                                            {this.competition.creator == null ? "No creator" : this.competition.creator.name}</a>
                                        </div>
                                        <div className="card__author-content">
                                            Winner <a href="#">
                                            {this.competition.winner == null ? "Nobody won yet" : this.competition.winner.name + " (" + this.competition.maxSteps + ")"}</a>
                                        </div>
                                        {hasUserJoined(this.competition, this.props.currentUser) ?
                                            (<div className="card__author-content">
                                                {
                                                    alreadySubmitted ?
                                                        (<span> | <a href="#" id="submit"
                                                                     onClick={(e) => this.handleSubmitClick(e, this.competition.competition_id)}>Submit your score</a></span>) :
                                                        (<span>Your score <a href="#">{currentUserScore}</a></span>)
                                                }
                                            </div>) : (<br/>)
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : (<br/>)}
                        <ParticipantsList competitionId={this.props.match.params.competitionId}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default (Competition);