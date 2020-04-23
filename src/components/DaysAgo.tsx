import {RegularText, SecondaryText} from "./Text";
import moment from "moment";
import React, {Component} from "react";
import i18n from "../locale/i18n";

type ProgressProps = {
    timeAgo: Date | undefined;
}

export default class DaysAgo extends Component<ProgressProps> {

    render() {
        let text = i18n.t("never-reported");
        if (this.props.timeAgo) {
            const today = moment().utc().startOf("day")
            let diffDays = today.diff(moment(this.props.timeAgo).startOf("day"), "days");
            if (diffDays == 0) {
                text = i18n.t("today");
            } else if (diffDays == 1) {
                text = i18n.t("yesterday");
            } else {
                text = i18n.t("days-ago", {diffDays: diffDays});
            }
        }

        return (
            <SecondaryText style={{textAlign: "center"}}>{text}</SecondaryText>
        );
    }
}