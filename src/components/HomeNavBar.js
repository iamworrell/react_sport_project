import React, {Component} from "react";

class HomeNavBar extends Component {
    constructor(props) {
        super(props)
            this.state = {

            }
    }

    render(){
        return (
            <div className="NavDiv">
                <h3 className="homeNav">HOME</h3>
                <h3 className="aboutNav">ABOUT</h3>
            </div>
        )
    }
}

export default HomeNavBar;