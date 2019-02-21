import React, {Component} from 'react';
import './Profile.css';
import {ACCESS_TOKEN} from '../../constants';
import CompetitionsList from '../../competition/CompetitionsList'
import {getCurrentUserCompetitions} from "../../util/APIUtils";

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log("Profile page loaded")
        console.log(props);
    }

    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            { 
                                this.props.currentUser.imageUrl ? (
                                    <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.props.currentUser.name && this.props.currentUser.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{this.props.currentUser.name}</h2>
                           <p className="profile-email">{this.props.currentUser.email}</p>
                        </div>
                        <div>
                            <CompetitionsList/>
                        </div>
                        <div>
                            <h2>JWT token</h2>
                            <p className="word-wrap">{localStorage.getItem(ACCESS_TOKEN)}</p>
                        </div>
                        <div>
                            <h2>Google API token</h2>
                            <p className="word-wrap">{this.props.currentUser.accessToken}</p>
                        </div>
                    </div>
                </div>    
            </div>
        );
    }
}

export default Profile