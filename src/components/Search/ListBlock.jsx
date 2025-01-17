import React, { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import posed from "react-pose";
import styled from "styled-components";
import Modal from './Modal';
import "./css/ListBlock.css";

/*styled-components component*/
const PressBotton = styled.button`
  width: 60px;
  height: 30px;
  font-size: 0.8em;
  font-family: "Noto Sans TC", sans-serif;
  border: none;
  border-radius: 5px;
  background: rgb(216,216,216);
  margin:5px 5px 5px 5px;
  transition: 0.1s all ease-out;
  :hover {
    position: relative;
    top: -2px;
    background: rgb(108,108,108);
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

/*react-pose component*/
/*start*/
const OperateDiv = posed.div({
    init: {
        scale: 0.5,
        opacity: 0,
        x: 0,
        y: 50
    },
    end: {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 500 }
    }
});

function Action({ boxState, children }) {
    return <OperateDiv pose={boxState ? "end" : "init"}>{children}</OperateDiv>;
}

function BoxAnimate({ children }) {
    const [active, setAnimate] = useState(false);
    const onChange = isVisible => {
        if (isVisible) {
            setAnimate(true);
        }
    };
    return (
        <VisibilitySensor onChange={onChange} partialVisibility>
            {({ isVisible }) => {
                const content = isVisible || active;
                return (
                    <div>
                        <Action boxState={content}>{children}</Action>
                    </div>
                );
            }}
        </VisibilitySensor>
    );
}
/*end*/


class ListBlock extends React.Component {
    state = {
        showModal: 0,
    };
    getModal = value => {
        this.setState({ showModal: value });
    };
    hideModal = value => {
        this.setState({ showModal: 0 });
    };

    render() {
        return (
            <div className="mainStyle">
                {this.props.inputData.map((d, i) => {
                    return <BoxAnimate>
                        <div key={i} className="boxStyle">
                            {d.properties.Name}<br />
                            區域：{d.properties.area}<br />
                            <PressBotton onClick={() => this.getModal(d.properties.Name)}>
                                Open
                            </PressBotton>
                        </div>
                        <Modal
                            show={this.state.showModal === d.properties.Name}
                            onHide={() => this.hideModal(d.properties.Name)}
                            name={d.properties.Name}
                            text={d.properties.description}
                            geoX={d.geometry.coordinates[0]}
                            geoY={d.geometry.coordinates[1]}
                        />
                    </BoxAnimate>
                })}
            </div>
        )
    }
}

export default ListBlock;