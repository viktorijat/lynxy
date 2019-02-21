import React, {Component} from "react";

class ParticipantItem extends Component {

    render() {
        const {item} = this.props;

        console.log(item)

        return (
            <tr className="row">
                <td className="col">{item.user_id}</td>
                <td className="col">{item.name}</td>
            </tr>
        );
    }
}

export default (ParticipantItem);