import React, {Component} from "react";
import withRouter from './withRouter';
import axios from "axios";

class PlayerDetails extends Component{
    constructor(props){
        super(props)

        this.state = {
            playerData: '',
        }
    }

    async componentDidMount() {
        //GET
        await axios.get(`http://localhost:5000/football/singlefootballplayer/${this.props.params.id}`)
        //Accessing the data property of the response Object
        //Storing data in the state property playerData 
        .then(result => {this.setState({playerData: result.data})}).catch((err) => console.log(err));
    }

    

    render() {
        return (
            <div>
            <h3>PLAYER</h3>
            <p>First Name: {this.state.playerData.firstName}</p>
            <p>Last Name: {this.state.playerData.lastName}</p>
            <p>Age: {this.state.playerData.age}</p>
            <p>Nationality: {this.state.playerData.nationality}</p>
            <p>Club: {this.state.playerData.club}</p>
            <p>Bio: {this.state.playerData.bio}</p>
            </div>
        )
        }
  }
   
export default withRouter(PlayerDetails);