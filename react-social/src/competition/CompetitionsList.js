import React, {Component} from 'react';
import {getCurrentUserCompetitions} from '../util/APIUtils';
import CompetitionItem from './CompetitionItem';

class CompetitionsList extends Component {
    constructor(props) {
        super(props);
        console.log("CompetitionsList page loaded");
        console.log(props);
        this.loadCompetitions = this.loadCompetitions.bind(this);
    }

    loadCompetitions() {
        this.setState({
            loading: true
        });

        getCurrentUserCompetitions()
            .then(response => {
                console.log("Competitions fetched: ");
                console.log(response);

                this.competitionsList = response;

                this.setState({state: this.state});

            }).catch(error => {
            // this.setState({
            //     loading: false
            // });
        });
    }

    componentDidMount() {
        this.loadCompetitions();
    }

    render() {

        const fillTable = competitionsList => {

            console.log("list");
            console.log(competitionsList);

            if (competitionsList === undefined) {
                return (
                    <div className="alert alert-info text-center" role="alert">
                        Your competitions will appear here
                    </div>
                );
            } else {
                const competitionsMapped = competitionsList.map(item => (
                    <CompetitionItem key={item.competition_id} item={item} currentUser={this.props.currentUser}/>
                ));

                return (
                    <React.Fragment>
                        <div className="table table-striped thread-light wrapper">
                            {competitionsMapped}
                        </div>
                    </React.Fragment>
                );
            }
        };

        let tableContent = fillTable(this.competitionsList);

        return (
            <div>
                <h2>List of competitions</h2>
                {tableContent}
            </div>
        );
    }
}

export default CompetitionsList