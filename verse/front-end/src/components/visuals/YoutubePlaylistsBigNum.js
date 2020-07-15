import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    card: {
        border: "1px solid #e9ecee",
        maxWidth: 300,
        maxHeight: 300,
        margin: "24px auto"
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

class YoutubePlaylistsBigNum extends React.Component {
    render() {

        const { classes } = this.props;

        var count = 0;
        if (this.props.data !== undefined) {
            count = this.props.data
        }

        return (
            <React.Fragment>
                <Card className={classes.card} elevation={0}>
                    <CardHeader
                        classes={{
                            title: classes.title,
                            subheader: classes.subheader
                        }}
                        title="Number of Playlists"
                        subheader="on Youtube"
                    />
                    <CardContent>
                        <h1>{count}</h1>
                    </CardContent>
                </Card>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(YoutubePlaylistsBigNum);