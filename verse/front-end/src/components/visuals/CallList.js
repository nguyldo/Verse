import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';

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

function decode(encoded) {
    return(decodeURIComponent(encoded.replace(/\+/g, " ")));
}

class CallList extends React.Component {

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
                        title="Calls You've Placed"
                        subheader="through Google Maps"
                    />
                    <CardContent>
                        <Divider />
                        <List component="nav" className={classes.list}>
                            {this.props.data.map((call, i) => (
                                <ListItem dense key={i}>
                                    <br />
                                    <ListItemText
                                        primary={decode(call[1])}
                                        secondary={call[2]}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(CallList);