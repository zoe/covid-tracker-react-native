import {RegularText} from "./Text";
import moment from "moment";
import React, {Component} from "react";

type ProgressProps = {
    timeAgo: Date | undefined;
}

export default class DaysAgo extends Component<ProgressProps> {
    render() {
        let text = "Never reported";

        if (this.props.timeAgo) {
            const today = moment().utc().startOf("day")
            let x = today.diff(moment(this.props.timeAgo).startOf("day"), "days");
            if (x == 0) {
                text = "Today";
            } else if (x == 1) {
                text = "Yesterday";
            } else {
                text = `${x} days ago`;
            }
        }

        return (
            <RegularText style={{textAlign: "center"}}>{text}</RegularText>
        );
    }
}