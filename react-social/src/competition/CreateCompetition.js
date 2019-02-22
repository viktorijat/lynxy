import React, {Component} from 'react';
import {createCompetition, hasUserJoined} from "../util/APIUtils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateCompetition extends Component {

    constructor(props) {
        super(props);
        console.log("Competition page loaded")
        console.log(props);
        let today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.state = {
             competitionName: null,
             startDate: today,
             endDate: tomorrow
        };
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleStartChange(date) {
        this.setState({
          startDate: date
        });
    }

    handleEndChange(date) {
            this.setState({
              endDate: date
            });
        }

    handleNameChange(event) {
            this.setState({
              competitionName: event.target.value
            });
        }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.competitionName === null || this.state.competitionName.trim().length == 0) {
            alert("Enter competition name");
            return false;
        }

        let competition = {
           name: this.state.competitionName,
           startDate: this.state.startDate.toISOString(),
           endDate: this.state.endDate.toISOString()
        };

        console.log(competition);
        createCompetition(competition)
            .then(response => {
                console.log("Submitted competition");
                console.log(response);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-name">
                            <form onSubmit={this.handleSubmit}>
                              <label>
                                Competition Name:
                                <input type="text" value={this.state.competitionName} onChange={this.handleNameChange} />
                              </label>
                              <br/>
                              <label>
                              Start date:
                              <DatePicker
                                      selected={this.state.startDate}
                                      onChange={this.handleStartChange}
                                    />
                            </label>
                            <br/>
                            <label>
                            End date:
                            <DatePicker
                                    selected={this.state.endDate}
                                    onChange={this.handleEndChange}
                                  />
                                  </label>
                                  <br/>
                              <input type="submit" value="Submit" />
                            </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default (CreateCompetition);