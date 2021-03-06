import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { withStyles } from '@material-ui/core';

import GanttChart from "./atomicGraphs/GanttChart"

const styles = theme => ({
    card: {
        border: "1px solid #e9ecee",
        maxWidth: 1024,
        maxHeight: 2048,
        margin: "24px auto",
        overflow: 'auto',
    },
    title: {
        color: "#232427",
        fontSize: 15,
        fontWeight: 500,
        fontFamily: "'Poppins', sans-serif",
        lineHeight: "1.35417em",
        textAlign: "left"
    },
    subheader: {
        color: "#919eab",
        fontFamily: "'Nunito', sans-serif",
        fontSize: 14,
        fontWeight: 500,
        textAlign: "left"
    },
});

class ShowsGanttChart extends React.Component {

    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Card className={classes.card} elevation={0}>
                    <CardHeader
                        classes={{
                            title: classes.title,
                            subheader: classes.subheader
                        }}
                        title="Netflix Show Activity"
                        subheader="Gantt chart displaying your first to last time watching each show."
                    />
                    <CardContent>
                        <div>
                            <GanttChart musicData={this.props.data} />
                        </div>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ShowsGanttChart);