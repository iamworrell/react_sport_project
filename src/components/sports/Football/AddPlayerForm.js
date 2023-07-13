import React, {Component} from "react";
import axios from "axios";
import Cookie from "js-cookie";

class AddPlayerForm extends Component {
    constructor(props) {
        super(props);

        //Binding Event Handlers
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeNationality = this.onChangeNationality.bind(this);
        this.onChangeClub = this.onChangeClub.bind(this);
        this.onChangePlayerNumber = this.onChangePlayerNumber.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            age: '',
            nationality: '',
            club: '',
            playerNumber: '',
            bio: '',
        }
    }

    //Event Handlers
    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value,
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value,
        });
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
    }

    onChangeNationality(e) {
        this.setState({nationality: e.target.value});
    }

    onChangeClub(e) {
        this.setState({
            club: e.target.value
        });
    }

    onChangePlayerNumber(e) {
        this.setState({
            playerNumber: e.target.value
        })
    }

    onChangeBio(e) {
        this.setState({bio: e.target.value});
    }

    onSubmit(e) {
        //Prevents default reloading of Page on Submit
        e.preventDefault();

        //creating object with form data
        const footballPlayer = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: Number(this.state.age),
            nationality: this.state.nationality,
            club: this.state.club,
            playerNumber: this.state.playerNumber,
            bio: this.state.bio,
        }

        //Post Request
        //footballPlayer sent via the url ie req.body
        axios.post('http://localhost:5000/football/addfootballplayer', footballPlayer)
            //We get access to this response Object when we make a post request
            //logged in the browser
            .then(res => console.log(res))
            .catch((err) => {console.log(err)});
        
        window.location = '/football';
    }
    
    async componentDidMount(){
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
    }

    render() {

        
        return(
            <div>
                <center>
                    <h3>ADD FOOTBALL PLAYER</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="addPlayerFormDiv" style={{backgroundColor: "lightblue", 
                        width: "25%",
                        padding: "2%"}}>
                            <table border="0" width="100%" height="" cellSpacing="0">
                                <tbody>
                                    <tr align="left" id="firstNameRow">
                                        <td><label>First Name: </label></td>
                                        <td align="left"><input
                                        type="text"
                                        onChange={this.onChangeFirstName}/>
                                        </td>
                                    </tr><br></br>
                                    <tr align="left" id="lastNameRow">
                                        <td><label>Last Name: </label></td>
                                        <td align="left"><input
                                        type="text"
                                        onChange={this.onChangeLastName}/>
                                        </td>
                                    </tr><br></br>
                                    <tr align="left" id="ageRow">
                                        <td><label>Player Age: </label></td>
                                        <td align="left"><input
                                        type="number"
                                        onChange={this.onChangeAge}/>
                                        </td>
                                    </tr><br></br>
                                    <tr align="left" id="nationalityRow">
                                        <td><label>Nationality: </label></td>
                                        <td align="left"><select style={{width: "54.5%"}}
                                        id="selectNationality"
                                        name="nationality"
                                        onChange={this.onChangeNationality}>
                                            <option value="">Please Select</option>
                                            <option value="Jamaican">Jamaican</option>
                                            <option value="American">American</option>
                                        </select>
                                        </td>
                                    </tr><br></br>
                                    <tr align="left" id="clubRow">
                                        <td><label>Club: </label></td>
                                        <td align="left"><input
                                        type="text"
                                        onChange={this.onChangeClub}/><span> (Not Required)</span>
                                        </td>
                                    </tr><br></br>
                                    <tr align="left" id="playerNumberRow">
                                        <td><label>Player Number: </label></td>
                                        <td align="left"><input
                                        type="number"
                                        onChange={this.onChangePlayerNumber}/><span> (Not Required)</span>
                                        </td>
                                    </tr><br></br>
                                    <tr align="left" id="bioRow">
                                        <td><label>Bio: </label></td>
                                        <td align="left"><textarea
                                        style={{resize: "none"}}
                                        type="text"
                                        id="bioTextArea"
                                        rows="10"
                                        cols="20"
                                        onChange={this.onChangeBio}/>
                                        </td>
                                    </tr><br></br>
                                </tbody>
                            </table>   
                        </div><br></br>
                        <button className="addPlayerSubmit" style={{width: "25%", padding: "2%"}} 
                        type="submit">Submit</button>
                    </form>
                </center>
            </div>
            
        )
    }
}

export default AddPlayerForm;