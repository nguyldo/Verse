import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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

class WebsitesList extends React.Component {

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
                        title="Websites/Apps You've Logged Into Using Facebook"
                        subheader={"Total: " + this.props.count}
                    />
                    <CardContent>
                        <Divider />
                        <List component="nav" className={classes.list}>
                            {this.props.data.map((site, i) => (
                                <ListItem dense key={i}>
                                    <h3>{site.name}</h3>                                    
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(WebsitesList);