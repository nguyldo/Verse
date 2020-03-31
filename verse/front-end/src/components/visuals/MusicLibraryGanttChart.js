import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { withStyles } from '@material-ui/core';

import GanttChart from "./GanttChart"
import musicLibraryData from "./data/musicLibraryData"

const styles = theme => ({
    card: {
        border: "1px solid #e9ecee",
        maxWidth: 1024,
        maxHeight: 1024,
        margin: "24px auto",
        overflow: 'auto',
    },
    container: {
        margin: "0 auto",
        height: 240
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
    info: {
        margin: "24 24"
    },
    text: {
        color: "#383a40",
        fontFamily: "'Nunito', sans-serif",
        fontSize: 14,
        fontWeight: 400
    },
});

class MusicLibraryGanttChart extends React.Component {

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
                        title="Apple Music Library Song Activity"
                        subheader="Length of time between when you added a song to your library and when you last played it."
                    />
                    <CardContent>
                        <div>
                            <GanttChart musicData={musicLibraryData} />
                        </div>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(MusicLibraryGanttChart);