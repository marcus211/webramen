import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import ListBlock from './ListBlock';
import ScrollTop from './ScrollTop';
import styled from "styled-components";
import { animateScroll as scroll, scroller } from "react-scroll";
import "./css/Filter.css"

const TitleTag = styled.div`
  user-select: none;
  justify-content: center;
  font-size: 1.2em;
  color: rgb(108, 108, 108);
  :hover {
    color: rgb(216, 216, 216);
  }
  :active {
    color: rgb(255, 255, 255);
  }
`;

const PressButton = styled.button`
  width: 100px;
  height: 40px;
  font-size: 1em;
  font-family: "Noto Sans TC", sans-serif;
  border: none;
  border-radius: 20px;
  background: rgb(216,216,216);
  margin:5px 5px 5px 5px;
  transition: 0.1s all ease-out;
  :hover {
    position: relative;
    top: -2px;
    background: white;
    box-shadow: 2.5px 2.5px 5px 0px #000000;
  }
  :active {
    position: relative;
    top: 0px;
    background: rgb(54,54,54);
    box-shadow: 0px 0px 0px 0px #000000;
  }
  :focus {
    outline:0;
  }
`;

const PressRectButton = styled.button`
  width: 200px;
  height: 40px;
  font-size: 1em;
  font-family: "Noto Sans TC", sans-serif;
  border: none;
  border-radius: 20px;
  background: rgb(216,216,216);
  margin:5px 5px 5px 5px;
  transition: 0.1s all ease-out;
  :hover {
    position: relative;
    top: -2px;
    background: white;
    box-shadow: 2.5px 2.5px 5px 0px #000000;
  }
  :active {
    position: relative;
    top: 0px;
    background: rgb(54,54,54);
    box-shadow: 0px 0px 0px 0px #000000;
  }
  :focus {
    outline:0;
  }
`;


//Filter system
class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      List: [],
      updateList: [],
      inputValue: '',
      devicelat: null,
      devicelon: null,
      unit: 'K',
      distance: null
    };

    this.changeValue = this.changeState.bind(this, 'inputValue');
    this.sendSubmit = this.sendSubmit.bind(this);
    this.sendRadius = this.sendRadius.bind(this);
  }

  componentDidMount() {
    this.getLocation();
    this.setState({
      updateList: this.state.List,
      inputValue: '',
    })
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        success => {
          const positionLat = success.coords.latitude;
          const positionLon = success.coords.longitude;
          // console.log(positionLat + ", " + positionLon);
          this.setState({
            devicelat: positionLat.toFixed(6),
            devicelon: positionLon.toFixed(6)
          });
        },
        error => {
          alert(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        }
      );
    }
  };

  changeState(itemName, d) {
    this.setState({ [itemName]: d.target.value });
  }

  sendSubmit(e) {
    e.preventDefault();
    let updatedDataList = this.state.List;
    // console.log(JSON.stringify(updatedDataList))
    let inputSearch = this.state.inputValue;
    let buttonLocation = e.target.value;

    //店名搜尋
    if (inputSearch) {
      scroller.scrollTo('ListMenu', {
        duration: 1000,
        delay: 0,
        smooth: 'easeInOutQuart'
      })
      // console.log(JSON.stringify(inputSearch))
      let newDataList = updatedDataList.filter((d) => {
        return d.properties.Name.search(inputSearch) !== -1;
      })
      this.setState({
        inputValue: '',
        updateList: newDataList
      });
      return newDataList;
    }
    //地區搜尋
    if (buttonLocation) {
      scroller.scrollTo('ListMenu', {
        duration: 1000,
        delay: 0,
        smooth: 'easeInOutQuart'
      })
      // console.log(JSON.stringify(buttonLocation))
      let newDataList = updatedDataList.filter((d) => {
        return d.properties.area.search(buttonLocation) !== -1;
      })
      this.setState({
        updateList: newDataList
      });
      return newDataList;
    }

  }

  sendRadius(e) {
    e.preventDefault();
    let updatedDataList = this.state.List;
    // console.log(JSON.stringify(updatedDataList))
    // console.log(this.state.devicelat + ',' + this.state.devicelon)
    let radiusLocation = e.target.value;

    //半徑搜尋
    if (radiusLocation) {
      scroller.scrollTo('ListMenu', {
        duration: 1000,
        delay: 0,
        smooth: 'easeInOutQuart'
      })

      let newDataList = updatedDataList.filter((d) => {
        let lat1 = this.state.devicelat;
        let lon1 = this.state.devicelon;
        let lat2 = d.geometry.coordinates[1];
        let lon2 = d.geometry.coordinates[0];
        let unit = this.state.unit;
        // console.log(lat1 + ',' + lon1 + ',' + lat2 + ',' + lon2 + ',' + unit)
        // https://www.geodatasource.com/developers/javascript
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") { dist = dist * 1.609344 }
        if (unit === "N") { dist = dist * 0.8684 }
        this.setState({
          distance: dist.toFixed(3)
        });
        // console.log(dist)
        return dist <= e.target.value;
      })
      this.setState({
        updateList: newDataList
      });
      return newDataList;
    }
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

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  render() {

    const dataList = this.state.updateList;
    // console.log(JSON.stringify(dataList))
    return (
      <div>
        <div className='BoxExtend'>
          <div className='searchSetup'>
            <Tabs>
              <TabList>
                <Tab><TitleTag>搜尋找!!</TitleTag></Tab>
                <Tab><TitleTag>地區找!!</TitleTag></Tab>
                <Tab><TitleTag>半徑找!!</TitleTag></Tab>
              </TabList>
              <TabPanel>
                <br />
                <form onSubmit={this.sendSubmit}>
                  <div className='inputSetup'>
                    <input
                      id='search'
                      type="search"
                      className="dataSearch"
                      onChange={this.changeValue}
                      value={this.state.inputValue}
                      placeholder="請輸入文字"
                      required
                    />
                  </div>
                  <br />
                  <PressButton>搜尋</PressButton>
                </form>
              </TabPanel>
              <TabPanel>
                <PressButton value='北基地區' onClick={this.sendSubmit}>北基地區</PressButton>
                <PressButton value='新北地區' onClick={this.sendSubmit}>新北地區</PressButton>
                <PressButton value='桃竹苗地區' onClick={this.sendSubmit}>桃竹苗地區</PressButton>
                <PressButton value='中彰投地區' onClick={this.sendSubmit}>中彰投地區</PressButton>
                <PressButton value='雲嘉南地區' onClick={this.sendSubmit}>雲嘉南地區</PressButton>
                <PressButton value='宜花東地區' onClick={this.sendSubmit}>宜花東地區</PressButton>
                <PressButton value='離島地區' onClick={this.sendSubmit}>離島地區</PressButton>
                <PressButton value='新拉麵' onClick={this.sendSubmit}>新拉麵</PressButton>
              </TabPanel>
              <TabPanel>
                <PressRectButton value='1' onClick={this.sendRadius}>半徑1公里</PressRectButton>
                <PressRectButton value='2' onClick={this.sendRadius}>半徑2公里</PressRectButton>
                <PressRectButton value='3' onClick={this.sendRadius}>半徑3公里</PressRectButton>
                <PressRectButton value='5' onClick={this.sendRadius}>半徑5公里</PressRectButton>
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <div id='ListMenu' name='ListMenu'>
          <ListBlock inputData={dataList} />
        </div>
        <ScrollTop />
      </div>
    );
  }
}
export default Filter;