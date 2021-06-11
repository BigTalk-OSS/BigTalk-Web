import React from "react";
import { Alert, Button } from "shards-react";

export default class AlertNotification extends React.Component {
    constructor(props) {
        super(props);
        this.theme = props.theme
        this.message = props.message
        this.interval = null;
        this.state = {
            visible: true,
            countdown: 0,
            timeUntilDismissed: 5
        };

        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.clearInterval = this.clearInterval.bind(this);

        this.clearInterval();
        this.interval = setInterval(this.handleTimeChange, 1000);
    }

    handleTimeChange() {
        if (this.state.countdown < this.state.timeUntilDismissed - 1) {
            this.setState({
                ...this.state,
                ...{ countdown: this.state.countdown + 1 }
            });
            return;
        }

        this.setState({ ...this.state, ...{ visible: false } });
        this.clearInterval();
    }

    clearInterval() {
        clearInterval(this.interval);
        this.interval = null;
    }

    render() {
        return (
            <div>
                <Alert className="mb-3" open={this.state.visible} theme={this.theme}>
                    <span>{this.message}</span>
                </Alert>
            </div>
        );
    }
}
