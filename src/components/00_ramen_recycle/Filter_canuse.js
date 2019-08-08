import React, { Component } from 'react';
import axios from 'axios'
import ListBlock from './ListBlock';

//Filter system
class Filter extends Component {

  constructor() {
    super();
    this.state = {
      List: []
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
        let filePK = PK.data.features;
        let fileNewT = NewT.data.features;
        let fileTCM = TCM.data.features;
        let fileCCN = CCN.data.features;
        let fileYCN = YCN.data.features;
        let fileKP = KP.data.features;
        let fileYHT = YHT.data.features;
        let fileIsland = Island.data.features;
        let fileNewRamen = NewRamen.data.features;

        let combineJSON = Object.assign([], filePK, fileNewT, fileTCM, fileCCN, fileYCN, fileKP, fileYHT, fileIsland, fileNewRamen)
        // console.log(JSON.stringify(combineJSON));
        this.setState({
          List: combineJSON,
        });
      }))
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    const dataList = this.state.List;
    // console.log(JSON.stringify(dataList))
    return (
      <div>
        <ListBlock inputData={dataList} />
      </div>
    );
  }
}
export default Filter;