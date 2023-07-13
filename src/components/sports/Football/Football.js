import React, {Component} from "react";
import FootballNavBar from "./NavBar";
import {Link} from "react-router-dom";
import axios from "axios";
import gear from './images/gear_2.png';
import trash_can from './images/trash_can.png';
import Cookie from "js-cookie";


class Football extends Component {
    constructor(props) {
        super(props)

        //Binding Event Handlers
        this.delete = this.delete.bind(this);
        
        this.state = {
            footballPlayers: [],
            email: '',
        }
    }
    
    //DELETE
    delete(id) {
        //DELETE Request
        axios.delete('http://localhost:5000/football/deletefootballplayer/' + id)
            .then(res => console.log(res.data))
            .catch((err) => console.log(err));
        
        //reload page to show new array
        window.location.reload();
    }
    
    //Block of Code Runs when the Page Loads
    async componentWillMount() {
        //GET REQUEST
        await axios.get('http://localhost:5000/football/football')
            //then(([response Object]))
            //dataFromDatabase - response Object we get when we make a get request
            .then((dataFromDatabase) => {
                //stores array of data in the state object footballPlayers
                {this.setState({footballPlayers: dataFromDatabase.data})}
            }).catch((error) => {console.log(error)});

        //Authentication Functionality
        if(Cookie.get("jwt")==null) {
            // navigate("/login");
            window.location = '/login';
        }else{
        const data = await axios.post("http://localhost:5000", {}, {withCredentials:true});
        if(!data) {
                // removeCookie("jwt");
                // navigate("/login");
                window.location = '/login';
        }else{
            console.log(data.data.user);
            this.setState({email: data.data.user});
        }}
    };



    render(){
        
        return(
            <div>
                <center>
                    <h1><p className='headingOneParagraph'>FOOTBALL</p></h1>
                </center>
                <FootballNavBar></FootballNavBar>
                    {/*Maps through the state object footballPlayers and Outputs each Document*/}
                    {this.state.footballPlayers.map((footballPlayer) => (
                        <div key={footballPlayer._id}><br></br>
                            <table className="footballerListTable" >
                                <tbody>
                                    <tr className="footballerTableRow">
                                        <td className="footballNameCol" >
                                            <p className="footballerName">
                                                {footballPlayer.firstName}
                                            </p>
                                        </td>
                                        <td className="footballPlayerBioCol">
                                        <Link style={{textDecoration: "none"}} 
                                                    to={"/singlefootballplayer/" + footballPlayer._id}>
                                            <p className="footballPlayerBio">
                                                {footballPlayer.bio}...Click to Read More
                                            </p>
                                        </Link>
                                        </td>

                                        <td>
                                            <Link to={"/updatefootballplayer/" + footballPlayer._id}>
                                                <button className="footballEdit">
                                                    <img src={gear} style={{width: "100px", display: "block"}}/>
                                                </button>
                                            </Link>
                                        </td>

                                        <td>
                                            {/* Button to Delete Player, pass the ._id as a parameter to the function*/}
                                            {/* We only use the anonymous function when we are using function arguments */}
                                            
                                            <button className="footballDelete" onClick={()=>this.delete(footballPlayer._id)}>
                                                <img src={trash_can} style={{width: "100px", display: "block"}}/>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table><br></br>
                        </div>
                    ))}
            </div>
        )
    }
}

export default Football;