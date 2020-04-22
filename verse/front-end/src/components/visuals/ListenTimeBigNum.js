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

class ListenTimeBigNum extends React.Component {
    render() {

        const { classes } = this.props;
        
        let h = this.props.data.hours.toFixed(0);
        let m = this.props.data.minutes.toFixed(0);
        let s = this.props.data.seconds.toFixed(0);

        return (
            <React.Fragment>
                <Card className={classes.card} elevation={0}>
                    <CardHeader
                        classes={{
                            title: classes.title,
                            subheader: classes.subheader
                        }}
                        title="Total Listen Time"
                        subheader={"Since " + this.props.date_range[0][0]}
                    />
                    <CardContent>
                    <h1>{h} hours, </h1>
                    <h1>{m} minutes, </h1>
                    <h1>{s} seconds</h1> 
                    </CardContent>
                </Card>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ListenTimeBigNum);