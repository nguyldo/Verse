import React, { memo } from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const markers = [
    { name: "Buenos Aires", coordinates: [-58.3816, -34.6037] },
    { name: "La Paz", coordinates: [-68.1193, -16.4897] },
    { name: "Brasilia", coordinates: [-47.8825, -15.7942] },
    { name: "Santiago", coordinates: [-70.6693, -33.4489] },
    { name: "Bogota", coordinates: [-74.0721, 4.711] },
    { name: "Quito", coordinates: [-78.4678, -0.1807] },
    { name: "Georgetown", coordinates: [-58.1551, 6.8013] },
    { name: "Asuncion", coordinates: [-57.5759, -25.2637] },
    { name: "Paramaribo", coordinates: [-55.2038, 5.852] },
    { name: "Montevideo", coordinates: [-56.1645, -34.9011] },
    { name: "Caracas", coordinates: [-66.9036, 10.4806] },
    { name: "Lima", coordinates: [-77.0428, -12.0464] }
];

const Map = ({ setTooltipContent, data }) => {
    return (

        <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
                rotate: [58, 20, 0],
                scale: 400
            }}
        >
            <ZoomableGroup zoom={1}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies
                            .filter(d => d.properties.REGION_UN === "Americas")
                            .map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        const { NAME, IP_ADDR } = geo.properties;
                                        setTooltipContent(`${NAME} — ${IP_ADDR}`);
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent("");
                                    }}
                                    fill="#EAEAEC"
                                    stroke="#D6D6DA"
                                />
                            ))
                    }
                </Geographies>
            </ZoomableGroup>

            {markers.map(({ name, coordinates }) => (
                <Marker key={name} coordinates={coordinates}>
                    <g
                        fill="none"
                        stroke="#FF5533"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="translate(-12, -24)"
                    >
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                    </g>
                    <text
                        textAnchor="middle"
                        y={15}
                        style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                    >
                        {name}
                    </text>
                </Marker>
            ))}
        </ComposableMap>
    );
}

export default memo(Map);