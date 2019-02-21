import React, {Component} from 'react';
import {getCompetition} from '../util/APIUtils';
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

            console.log("list")
            console.log(participantsList)

            if (participantsList === undefined) {
                return (
                    <div className="alert alert-info text-center" role="alert">
                        No participants
                    </div>
                );
            } else {
                const participantsMapped = participantsList.map(item => (
                    <ParticipantItem key={item.user_id} item={item}/>
                ));

                return (
                    <React.Fragment>
                        <table className="table table-striped thread-light">
                            <thead>
                            <tr className="row thead-light">
                                <th className="col">ID</th>
                                <th className="col">Name</th>
                            </tr>
                            {participantsMapped}
                            </thead>
                        </table>
                    </React.Fragment>
                );
            }
        };

        const participantsList = this.competition ? this.competition.participants : undefined;
        let tableContent = fillTable(participantsList);

        return (
            <div>
                <h2>List of participants</h2>
                {tableContent}
            </div>
        );
    }
}

export default ParticipantsList