import React from "react";
import axios from 'axios'
import ReactMapboxGl, {
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
    axios.all([
      axios.get('../json/codePK.geojson'),
      axios.get('../json/codeNewT.geojson'),
      axios.get('../json/codeTCM.geojson'),
      axios.get('../json/codeCCN.geojson'),
      axios.get('../json/codeYCN.geojson'),
      axios.get('../json/codeKP.geojson'),
      axios.get('../json/codeYHT.geojson'),
      axios.get('../json/Island.geojson'),
      axios.get('../json/NewRamen.geojson'),
    ]) // JSON File Path
      .then(axios.spread((PK, NewT, TCM, CCN, YCN, KP, YHT, Island, NewRamen, ) => {
        // console.log('PK' + JSON.stringify(PK.data.features));
        // console.log('NewT:' + JSON.stringify(NewT.data.features));
        let mapPK = PK;
        let mapNewT = NewT;
        let mapTCM = TCM;
        let mapCCN = CCN;
        let mapYCN = YCN;
        let mapKP = KP;
        let mapYHT = YHT;
        let mapIsland = Island;
        let mapNewRamen = NewRamen;

        let combineMapJSON = Object.assign([], mapPK, mapNewT, mapTCM, mapCCN, mapYCN, mapKP, mapYHT, mapIsland, mapNewRamen)
        // console.log(JSON.stringify(combineJSON));
        this.setState({
          MapList: combineMapJSON.data,
        });
      }))
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
            "icon-size": 0.5,
            "text-anchor": "center"
          }}
        />


        {/* https://github.com/mapbox/mapbox-gl-styles/tree/master/sprites */}

        <ZoomControl position={`top-left`} />
        <ScaleControl position={`bottom-right`} style={{ bottom: 30 }} />
        <RotationControl position={`top-left`} style={{ top: 65 }} />
      </Map >
    );
  }
}

export default MapBase;
