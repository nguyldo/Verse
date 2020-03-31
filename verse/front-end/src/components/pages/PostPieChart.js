import React from "react";
// import moment from "moment";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { withStyles } from "@material-ui/core/styles";

import PieChart from "./PieChart";

const styles = theme => ({
  card: {
    border: "1px solid #e9ecee",
    maxWidth: 748,
    margin: "24px auto"
  },
  container: {
    margin: "0 auto",
    height: 240
  },
  menuIcon: {
    color: "#C8D1DA"
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
  }
});

class PostPieChart extends React.Component {

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

            title="Posts on Your Timeline: You vs. Your Friends"
          />
          <CardContent>
            <div style={{height: 200}}>
              <PieChart />
            </div>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PostPieChart);
