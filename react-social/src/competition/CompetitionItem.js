import React, {Component} from "react";
import {joinCompetition} from '../util/APIUtils';
import {Link, NavLink} from 'react-router-dom';

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

        console.log(item)

        return (
            <tr className="row">
                <td className="col">{item.competition_id}</td>
                <td className="col">{item.name}</td>
                <td className="col"><a href="#"
                                       onClick={(e) => this.handleJoinClick(e, item.competition_id)}>Join</a></td>
                <td className="col"><Link
                    to={{pathname: "/competition/"+item.competition_id}}>View</Link></td>
            </tr>
        );
    }
}

export default (CompetitionItem);