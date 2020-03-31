import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

const styles = theme => ({
    list: {
        width: '100%',
        maxWidth: 540,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 320,
    },
    card: {
        border: "1px solid #e9ecee",
        maxWidth: 540,
        maxHeight: 540,
        margin: "24px auto"
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

class ListenTimeBigNum extends React.Component {
    render() {

        const { classes } = this.props;

        <React.Fragment>
            <Card className={classes.card} elevation={0}>
                <CardHeader
                    classes={{
                        title: classes.title,
                        subheader: classes.subheader
                    }}
                    title="Total Listen Time"
                    subheader="Since..."
                />
                <CardContent>
                    <h1></h1>
                </CardContent>
            </Card>
        </React.Fragment>

    }
}