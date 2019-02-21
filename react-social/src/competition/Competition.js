import React, {Component} from 'react';
import {getCompetition} from "../util/APIUtils";
import ParticipantsList from "../participant/ParticipantsList";

class Competition extends Component {

    constructor(props) {
        super(props);
        console.log("Competition page loaded")
        console.log(props);
    }

    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-name">
                        {this.competition ? (<h2>{this.competition.name}</h2>) : (<br/>)}

                        <ParticipantsList competitionId = {this.props.match.params.competitionId}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default (Competition);