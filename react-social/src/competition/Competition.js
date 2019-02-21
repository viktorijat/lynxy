import React, {Component} from 'react';
import ParticipantsList from "../participant/ParticipantsList";
import {getCompetition, submitCompetitionUserData} from "../util/APIUtils";

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
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-name">
                        {this.competition ? (<h2>{this.competition.name}</h2>) : (<br/>)}
                        <div>
                            <a href="#" id="submit"
                               onClick={(e) => this.handleSubmitClick(e, this.competition.competition_id)}>Submit</a>

                        </div>
                        <ParticipantsList competitionId={this.props.match.params.competitionId}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default (Competition);