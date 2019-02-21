import React, { Component } from "react";

class CompetitionItem extends Component {

    render() {
        const { item } = this.props;

        console.log(item)

        return (
            <tr className="row">
                <td className="col">{item.competition_id}</td>
                <td className="col">{item.name}</td>
            </tr>
        );
    }
}

export default (CompetitionItem);