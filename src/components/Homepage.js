import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, {Component} from 'react';
import HomeNavBar from './HomeNavBar';
import axios from 'axios';


class Homepage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render(){
        return (
            <div className="homePageDiv">
                <center>
                <h1><p className='headingOneParagraph'>SPORTS DATASHEET</p></h1>
                </center>
                <HomeNavBar></HomeNavBar>
                <Link to="/football" style={{textDecoration: "none"}}>
                    <p className='homePageTile'>Football</p>
                </Link>
                
            </div>
        )
    }
}

export default Homepage;