import React, {Component} from 'react';
import {getCurrentUserCompetitions} from '../util/APIUtils';
import CompetitionItem from './CompetitionItem';

class CompetitionsList extends Component {
    constructor(props) {
        super(props);
        console.log("CompetitionsList page loaded")
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

                this.setState({ state: this.state });

            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    componentDidMount() {
        this.loadCompetitions();
    }

    render() {

        console.log("render")

        const competitionsList = this.competitionsList;

        const fillTable = competitionsList => {

            console.log("list")
            console.log(competitionsList)

            if (competitionsList === undefined) {
                return (
                    <div className="alert alert-info text-center" role="alert">
                        Your competitions will appear here
                    </div>
                );
            } else {
                const competitionsMapped = competitionsList.map(item => (
                    <CompetitionItem key={item.competition_id} item={item}/>
                ));

                return (
                    <React.Fragment>
                        <table className="table table-striped thread-light">
                            <thead>
                            <tr className="row thead-light">
                                <th className="col">ID</th>
                                <th className="col">Name</th>
                            </tr>
                            {competitionsMapped}
                            </thead>
                        </table>
                    </React.Fragment>
                );
            }
        };

        let tableContent = fillTable(this.competitionsList);

        return (
            <div>
                <h2>List of your competitions</h2>
                {tableContent}
            </div>
        );
    }
}

export default CompetitionsList