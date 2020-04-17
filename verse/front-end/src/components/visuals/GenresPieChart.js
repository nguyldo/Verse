import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { withStyles } from "@material-ui/core/styles";

import PieChart from "./atomicGraphs/PieChart";
import genresData from "./data/genresData"

const styles = theme => ({
    card: {
        border: "1px solid #e9ecee",
        maxWidth: 748,
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

class GenresPieChart extends React.Component {

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
                        title="Apple Music Play Activity - Genres"
                        subheader="Number of times you've listened to songs in each genre."
                    />
                    <CardContent>
                        <div style={{ height: 200 }}>
                            <PieChart data={genresData}/>
                        </div>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(GenresPieChart);