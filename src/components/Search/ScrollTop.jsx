import React from 'react';
import './css/ScrollTop.css'
import { FaArrowAltCircleUp } from "react-icons/fa";
import { Link, animateScroll as scroll } from "react-scroll";

class ScrollTop extends React.Component {
    //https://codepen.io/dennylouis/pen/MEZmpz
    constructor(props) {
        super(props);
        this.state = {
            scrollY: 0,
            uparrowClass: "",
        }
    }
    componentDidMount() {
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const scrollY = window.scrollY;
        //console.log('get window.scrollY: '+scrollY);//window.scrollY: 648 以此分界
        if (window.scrollY <= 648) {
            //console.log('scrollY <=648');
            this.setState({ scrollY: scrollY, uparrowClass: "uparrow arrowmove" });
        } else {
            //console.log('scrollY >648');
            this.setState({ scrollY: scrollY, uparrowClass: "uparrow" });
        }
    }

    scrollToTop = () => {
        scroll.scrollToTop();
    };

    render() {
        return (
            <div>
                <Link
                    activeClass="active"
                    to="HomePage"
                    spy={true}
                    smooth={true}
                >
                    <FaArrowAltCircleUp id="goTop" className={this.state.uparrowClass} onClick={this.scrollToTop} />
                </Link>
            </div>
        )
    }
}

export default ScrollTop