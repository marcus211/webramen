import React from "react";
import axios from 'axios';
import MapGL, {
    FullscreenControl,
    GeolocateControl,
    NavigationControl,
    ScaleControl,
    Marker
} from "@urbica/react-map-gl";
import Cluster from "@urbica/react-map-gl-cluster";
import imgUrl from "./img/icon/ramen.png"

//https://github.com/alex3165/react-mapbox-gl#readme
//https://www.google.com/maps/d/viewer?mid=1I8nWhKMX1j8I2bUkN4qN3-FSyFCCsCh7&ll=25.195591903593964%2C121.71210290570241&z=10
const MapToken = "pk.eyJ1Ijoiam9yZGFubWFwIiwiYSI6IjRUOVBuV28ifQ.ubu4SCJhADfVRbncXCXiPg";
const URL = "../json/mapRamen.geojson";

class MapBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 25.0429609,
                longitude: 121.5421425,
                zoom: 16
            },
            MapList: []
        };
    }
    componentWillMount() {
        axios.get(URL)// JSON File Path
            .then((d) => {
                console.log(JSON.stringify(d));
                this.setState({
                    MapList: d.data.features,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        // const dataMapList = this.state.MapList;
        // console.log(JSON.stringify('dataMapList:   ' + JSON.stringify(dataMapList)))
        //@urbica/react-map-gl-cluster
        const points = this.state.MapList;
        points.forEach((point, index) => (point.id = index));
        const markerStyle = {
            width: "36px",
            height: "20px",
            color: "rgb(255,255,255)",
            background: "green",
            borderRadius: "5px",
            textAlign: "center"
        };
        const ClusterMarker = ({ longitude, latitude, pointCount }) => (
            <Marker longitude={longitude} latitude={latitude}>
                <div style={markerStyle}>{pointCount}</div>
            </Marker>
        );

        //add Marker to MapGL
        const addMarkers = points.map((d, i) => (
            <Marker
                key={i}
                latitude={d.geometry.coordinates[1]}
                longitude={d.geometry.coordinates[0]}
            >
                <img src={imgUrl} style={{ width: "50px", height: "36px" }} alt="" />
            </Marker>
        ));

        return (
            <MapGL
                style={{ width: "100%", height: "80vh" }}
                mapStyle="mapbox://styles/mapbox/streets-v10"
                accessToken={MapToken}
                latitude={this.state.viewport.latitude}
                longitude={this.state.viewport.longitude}
                zoom={this.state.viewport.zoom}
                onViewportChange={viewport => this.setState({ viewport })}
            >
                <Cluster
                    radius={100}
                    extent={512}
                    nodeSize={64}
                    component={ClusterMarker}
                >
                    {addMarkers}
                </Cluster>

                <FullscreenControl position="top-right" />
                <NavigationControl showCompass showZoom position="top-left" />
                <GeolocateControl
                    position="top-left"
                    positionOptions={{ enableHighAccuracy: true, timeout: 6000 }}
                    trackUserLocation="true"
                />
                <ScaleControl unit="metric" position="bottom-right" maxWidth="100" />
            </MapGL>
        );
    }
}

export default MapBase;