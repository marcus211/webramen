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


//Filter system
class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      List: [],
      updateList: [],
      inputValue: '',
    };

    this.changeValue = this.changeState.bind(this, 'inputValue');
    this.sendSubmit = this.sendSubmit.bind(this);

  }

  changeState(itemName, d) {
    this.setState({ [itemName]: d.target.value });
  }

  sendSubmit(e) {
    e.preventDefault();
    let updatedDataList = this.state.List;
    // console.log(JSON.stringify(updatedDataList))

    let inputSearch = this.state.inputValue;
    let buttonLocation = e.target.value;

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

    if (buttonLocation) {
      scroller.scrollTo('ListMenu', {
        duration: 1000,
        delay: 0,
        smooth: 'easeInOutQuart'
      })
      // console.log(JSON.stringify(inputSearch))
      let newDataList = updatedDataList.filter((d) => {
        return d.properties.area.search(buttonLocation) !== -1;
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

  componentDidMount() {
    this.setState({
      updateList: this.state.List,
      inputValue: '',
    })
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
                <strong>building!</strong>
              </TabPanel>
            </Tabs>


            {/* <TitleTag>搜尋找!!</TitleTag>
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
              <button className='filterButton'>search</button>
            </form>
            <TitleTag>地區找!!</TitleTag>
            <button className='filterButton' value='北基地區' onClick={this.sendSubmit}>北基地區</button>
            <button className='filterButton' value='新北地區' onClick={this.sendSubmit}>新北地區</button>
            <button className='filterButton' value='桃竹苗地區' onClick={this.sendSubmit}>桃竹苗地區</button>
            <button className='filterButton' value='中彰投地區' onClick={this.sendSubmit}>中彰投地區</button>
            <button className='filterButton' value='雲嘉南地區' onClick={this.sendSubmit}>雲嘉南地區</button>
            <button className='filterButton' value='宜花東地區' onClick={this.sendSubmit}>宜花東地區</button>
            <button className='filterButton' value='離島地區' onClick={this.sendSubmit}>離島地區</button>
            <button className='filterButton' value='新拉麵' onClick={this.sendSubmit}>新拉麵</button>
            <TitleTag>半徑找!!</TitleTag> */}
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