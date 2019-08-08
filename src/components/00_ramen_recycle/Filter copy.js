import React, { Component } from 'react';
import axios from 'axios'
import ListBlock from '../Search/ListBlock';

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
    axios.get('../json/mapRamen.geojson') // JSON File Path
      .then(response => {
        // console.log(JSON.stringify(response));
        this.setState({
          List: response.data.features,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    const dataList = this.state.List;
    // console.log(JSON.stringify(dataList))
    return (
      <div>
        <input
          id='search'
          type="search"
          ref={this.searchRef}
          onChange={this.changeSearch}
          placeholder="請輸入文字"
        />
        <ListBlock inputData={dataList} />
      </div>
    );
  }
}
export default Filter;