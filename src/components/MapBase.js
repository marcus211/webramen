import React from "react";
import axios from 'axios'
import ReactMapboxGl, {
  Popup,
  ZoomControl,
  ScaleControl,
  RotationControl,
  GeoJSONLayer,
} from "react-mapbox-gl";

//https://github.com/alex3165/react-mapbox-gl#readme
//https://www.google.com/maps/d/viewer?mid=1I8nWhKMX1j8I2bUkN4qN3-FSyFCCsCh7&ll=25.195591903593964%2C121.71210290570241&z=10
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoic2t5bnVyYWsiLCJhIjoiY2pqdTZydW1rOGtxdTNwczJmdm5henRndiJ9.VKA1MVztPqrirg-ZKBQGsw"
});

class MapBase extends React.Component {
  constructor() {
    super();
    this.state = {
      MapList: []
    };
  }
  componentWillMount() {
    //https://www.quora.com/How-do-I-read-JSON-file-using-reactjs
    axios.get('../json/mapRamen.geojson')// JSON File Path
      .then((mapData) => {
        console.log(JSON.stringify(mapData));
        this.setState({
          MapList: mapData.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const dataMapList = this.state.MapList;
    console.log(JSON.stringify('dataMapList:   ' + JSON.stringify(dataMapList)))
    return (
      <Map
        style={`mapbox://styles/mapbox/streets-v9`}
        containerStyle={{
          width: "100%",
          height: "80vh"
        }}
        center={[121.5, 25]}
        zoom={[10]}
      >
        <GeoJSONLayer
          data={dataMapList}
          type="symbol"
          symbolLayout={{
            "icon-image": "marker-15",
            "icon-size": 2,
            "text-anchor": "center"
          }}
        >
          <Popup>
            <h1>TEXT</h1>
          </Popup>
        </GeoJSONLayer>


        {/* https://github.com/mapbox/mapbox-gl-styles/tree/master/sprites */}

        <ZoomControl position={`top-left`} />
        <ScaleControl position={`bottom-right`} style={{ bottom: 30 }} />
        <RotationControl position={`top-left`} style={{ top: 65 }} />
      </Map >
    );
  }
}

export default MapBase;
