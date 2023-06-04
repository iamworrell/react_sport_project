import { Link } from "react-router-dom";
import React, {Component} from "react";

class FootballNavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div className="NavDiv">
                <Link to="/" style={{textDecoration: "none"}} ><h3 className="homeNav">HOME</h3></Link>
                <Link to="/footballAddPlayer" style={{textDecoration: "none"}}><h3 className="footballAddPlayerNav">ADD PLAYER</h3></Link>
            </div>
        )
    }
}

export default FootballNavBar;