import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { withStyles } from '@material-ui/core';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

const styles = theme => ({
    card: {
        border: "1px solid #e9ecee",
        maxWidth: 750,
        maxHeight: 700,
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

const imgStyle = {
    width: '30px',
    height: '30px'
};

class AppsMap extends React.Component {

    state = {
        viewport: {
            width: "50vw",
            height: "50vh",
            latitude: 40.4237,
            longitude: -86.9212,
            zoom: 6
        },
        selectedHotspot: null
    };

    setSelectedHotspot = object => {
        this.setState({
            selectedHotspot: object
        });
    };

    closePopup = () => {
        this.setState({
            selectedHotspot: null
        });
    };

    loadMarkers = () => {
        return this.props.data.map(spot => {

            if (spot !== undefined && 
                spot.Location[0].split(',')[0] !== undefined && 
                spot.Location[0].split(',')[1] !== undefined) {
                
                const lat = spot.Location[0].split(',')[0];
                const lon = spot.Location[0].split(',')[1];
                
                return (
                    <div>
                        <Marker
                            latitude={parseFloat(lat)}
                            longitude={parseFloat(lon)}
                        >
                            <img
                                onClick={() => {
                                    this.setSelectedHotspot(spot);
                                }}
                                alt="spot.length=3"
                                style={imgStyle}
                                className="mapmarker"
                                src="mapmarker.svg"
                            />
                        </Marker>
                        {
                            this.state.selectedHotspot !== null ? (
                                <Popup
                                    latitude={parseFloat(this.state.selectedHotspot.Location[0].split(',')[0])}
                                    longitude={parseFloat(this.state.selectedHotspot.Location[0].split(',')[1])}
                                    onClose={this.closePopup}
                                >
                                    <p>
                                        <b>App: </b> {this.state.selectedHotspot["Item Description"]}
                                        <b>Location: </b> {this.state.selectedHotspot.Location[1] + ", " + this.state.selectedHotspot.Location[2]}
                                        <b>IP Address: </b> {this.state.selectedHotspot["Device IP Address"]}
                                    </p>
                                </Popup>
                            ) : null
                        }
                    </div>
                );
            }
        });
    };

    render() {
        const { classes } = this.props;

        const mapboxToken = "pk.eyJ1IjoibGlzYXNpbCIsImEiOiJjazlkbWR3djkwNTkwM2dtbGJwanA1Z25nIn0.lwSZn_ljKgldaVUe3t6-AA";

        return (
            <React.Fragment>
                <Card className={classes.card} elevation={0}>
                    <CardHeader
                        classes={{
                            title: classes.title,
                            subheader: classes.subheader
                        }}
                        title="App Downloads"
                        subheader="where you were when you downloaded each app"
                    />
                    <CardContent>
                        <ReactMapGL {...this.state.viewport} onViewportChange={(viewport => this.setState({ viewport }))} mapboxApiAccessToken={mapboxToken} >
                            {this.loadMarkers()}
                        </ReactMapGL>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AppsMap);