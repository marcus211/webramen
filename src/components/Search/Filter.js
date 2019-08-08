import React, { Component } from 'react';
import axios from 'axios'
import ListBlock from './ListBlock';

//Filter system
class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      List: [],
      updateList: [],
      inputValue: '',
    };
    this.searchRef = React.createRef();
    this.changeSearch = this.changeState.bind(this);
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

  componentDidMount() {
    this.setState({
      updateList: this.state.List,
      inputValue: '',
    })
  }

  changeState = () => {
    let updatedDataList = this.state.List;
    // console.log(JSON.stringify(updatedDataList))
    this.setState({
      inputValue: this.searchRef.current.value
    })
    let inputSearch = this.searchRef.current.value;
    // console.log(JSON.stringify(inputSearch))
    let newDataList = updatedDataList.filter((d) => {
      return d.properties.Name.search(inputSearch) !== -1;
    })
    this.setState({
      updateList: newDataList
    });
    return newDataList;
  }



  render() {

    const dataList = this.state.updateList;
    // console.log(JSON.stringify(dataList))
    return (
      <div>
        <input
          id='search'
          type="search"
          className="dataSearch"
          ref={this.searchRef}
          onChange={this.changeSearch}
          placeholder="請輸入文字"
        />
        <br />
        <ListBlock inputData={dataList} />
      </div>
    );
  }
}
export default Filter;