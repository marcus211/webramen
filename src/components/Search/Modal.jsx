import React, { Component } from "react";
import ScrollLock, { TouchScrollable } from 'react-scrolllock';
//https://www.npmjs.com/package/react-scrolllock
import { FadeIn } from "animate-css-styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
//react-mapbox-gl
import ReactMapboxGl, { Marker, ZoomControl, ScaleControl, RotationControl, } from "react-mapbox-gl";
import markerUrl from "../img/icon/ramen.png";
//Modal CSS
import "./CSS/Modal.css";

library.add(faTimes);

class Modal extends Component {

    render() {
        const textTitle = this.props.name
        const textContent = this.props.text
        const Map = ReactMapboxGl({
            accessToken:
                "pk.eyJ1Ijoic2t5bnVyYWsiLCJhIjoiY2pqdTZydW1rOGtxdTNwczJmdm5henRndiJ9.VKA1MVztPqrirg-ZKBQGsw"
        });
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
                                        <Map
                                            style={`mapbox://styles/mapbox/streets-v9`}
                                            containerStyle={{
                                                border: 'none',
                                                margin: '0px 0px 0px 0px',
                                                width: '100%',
                                                height: '100%'
                                            }}
                                            center={[this.props.geoX, this.props.geoY]}
                                            zoom={[17]}
                                        >
                                            <Marker
                                                coordinates={[this.props.geoX, this.props.geoY]}
                                                anchor="center">
                                                <img src={markerUrl} style={{
                                                    width: '50px',
                                                    height: '36px',
                                                }} alt='' />
                                            </Marker>
                                            <ZoomControl position={`top-left`} />
                                            <ScaleControl position={`bottom-right`} style={{ bottom: 30 }} />
                                            <RotationControl position={`top-left`} style={{ top: 65 }} />
                                        </Map>
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