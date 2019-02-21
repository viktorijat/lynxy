import React, {Component} from 'react';
import {getCompetition, getParticipantsListWithResults} from '../util/APIUtils';
import ParticipantItem from './ParticipantItem';

class ParticipantsList extends Component {
    constructor(props) {
        super(props);
        console.log("ParticipantsList page loaded")
        console.log(props);
        this.loadCompetition = this.loadCompetition.bind(this);
    }

    loadCompetition() {
        this.setState({
            loading: true
        });

        getCompetition(this.props.competitionId)
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

        const fillTable = participantsList => {

            console.log("participantsList");
            console.log(participantsList);

            if (participantsList === undefined) {
                return (
                    <div className="alert alert-info text-center" role="alert">
                        No participants
                    </div>
                );
            } else {
                const participantsMapped = participantsList.map(item => (
                        <ParticipantItem key={item.user_id} item={item}/>
                    )
                );

                return (
                    <React.Fragment>
                        <div className="wrapper">
                            <div className="card radius shadowDepth1">
                                <div className="card__content card__padding">
                                    <div className="table table-striped thread-light wrapper">
                                        <article className="card__article">
                                            <div className="participants card__author">
                                                <p>Participants: </p>
                                                <h2><a href="#"/></h2>
                                                {participantsMapped}
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            }
        };

        let participantsList = getParticipantsListWithResults(this.competition);
        let tableContent = fillTable(participantsList);

        return (
            <div>
                {tableContent}
            </div>
        );
    }
}

export default ParticipantsList