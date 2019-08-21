import React, { Component } from "react";
import ScrollLock, { TouchScrollable } from 'react-scrolllock';
//https://www.npmjs.com/package/react-scrolllock
import { FadeIn } from "animate-css-styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
//@urbica/react-map-gl
import MapGL, { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, Marker } from "@urbica/react-map-gl";
import imgUrl from "./icon/ramen.png";
//Modal CSS
import "./css/Modal.css";

library.add(faTimes);

const MapToken = "pk.eyJ1Ijoic2t5bnVyYWsiLCJhIjoiY2pqdTZydW1rOGtxdTNwczJmdm5henRndiJ9.VKA1MVztPqrirg-ZKBQGsw";


class Modal extends Component {
    state = {
        viewport: {
            latitude: this.props.geoY,
            longitude: this.props.geoX,
            zoom: 17
        }
    };

    render() {
        const textTitle = this.props.name
        const textContent = this.props.text

        return (
            <React.Fragment>
                {this.props.show && (
                    <FadeIn duration="0.4s">
                        <div className="outerModal">
                            <div className="innerModal">
                                <div className="title" dangerouslySetInnerHTML={{ __html: textTitle }} />
                                <div className="innerContent">
                                    <ScrollLock />
                                    <div className="scrollContent">
                                        <TouchScrollable>
                                            <div className="hiddenScroll" dangerouslySetInnerHTML={{ __html: textContent }} />
                                        </TouchScrollable>
                                    </div>

                                    <div className="mapContent">
                                        <MapGL
                                            style={{ width: "100%", height: "100%" }}
                                            mapStyle="mapbox://styles/mapbox/streets-v10"
                                            accessToken={MapToken}
                                            latitude={this.props.geoY}
                                            longitude={this.props.geoX}
                                            zoom={this.state.viewport.zoom}
                                            onViewportChange={viewport => this.setState({ viewport })}
                                        >
                                            <Marker
                                                latitude={this.props.geoY}
                                                longitude={this.props.geoX}
                                                offsetLeft={-25}
                                                offsetTop={-18}
                                            >
                                                <img
                                                    src={imgUrl}
                                                    style={{
                                                        width: "50px",
                                                        height: "36px"
                                                    }}
                                                    alt=""
                                                />
                                            </Marker>

                                            <FullscreenControl position="top-right" />
                                            <NavigationControl showCompass showZoom position="top-left" />
                                            <GeolocateControl
                                                position="top-left"
                                                positionOptions={{ enableHighAccuracy: true, timeout: 6000 }}
                                                trackUserLocation="true"
                                            />
                                            <ScaleControl unit="metric" position="bottom-right" maxWidth="100" />

                                        </MapGL>
                                    </div>
                                </div>
                                <span className="crossButton" onClick={this.props.onHide}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </div>
                        </div>
                    </FadeIn>
                )
                }
            </React.Fragment>
        );
    }
}

export default Modal;