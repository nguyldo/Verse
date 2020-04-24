import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { withStyles } from '@material-ui/core';
import ReactMapGL, { Marker } from 'react-map-gl';

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

/*
const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [this.state.lng, this.state.lat],
    zoom: this.state.zoom
});

map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['pillbox-data'] // replace this with the name of the layer
    });

    if (!features.length) {
        return;
    }

    var feature = features[0];

    var popup = new mapboxgl.Popup({
        offset: [0, -15]
    })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
});

map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}));
*/

class Map extends React.Component {

    state = {
        viewport: {
            width: "50vw",
            height: "50vh",
            latitude: 40.4237,
            longitude: -86.9212,
            zoom: 6
        }
    };     

    loadMarkers = () => {
        return this.props.data.map(spot => {
            if (spot.length === 2) {
                console.log(spot)
                return (
                    <Marker
                        latitude={parseFloat(spot[1]["Latitude"])}
                        longitude={parseFloat(spot[1]["Longitude"])}
                    >
                        <img alt="" style={imgStyle} className="mapmarker" src="mapmarker.svg" />
                    </Marker>
                );
            } else if (spot.length === 3) {
                return (
                    <Marker
                        latitude={parseFloat(spot[2]["Latitude"])}
                        longitude={parseFloat(spot[2]["Longitude"])}
                    >
                        <img alt="" style={imgStyle} className="mapmarker" src="mapmarker.svg" />
                    </Marker>
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
                        title="Saved Places"
                        subheader="on Google Maps"
                    />
                    <CardContent>
                        <ReactMapGL {...this.state.viewport} onViewportChange={(viewport => this.setState({viewport}))} mapboxApiAccessToken={mapboxToken} >
                            <Marker 
                                latitude={40.4237} 
                                longitude={-86.9212}
                            >
                                <img alt="Purdue" style={imgStyle} className="mapmarker" src="mapmarker.svg"/>
                            </Marker>
                            {this.loadMarkers()}
                            
                        </ReactMapGL>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Map);