import withRouterUpdate from "./withRouterUpdate";
import React, {Component} from "react";
import axios from "axios";


class UpdatePlayer extends Component {
    constructor(props){
        super(props)

        //Binding Event Handlers
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeNationality = this.onChangeNationality.bind(this);
        this.onChangeClub = this.onChangeClub.bind(this);
        this.onChangePlayerNumber = this.onChangePlayerNumber.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            age: '',
            nationality: '',
            club: '',
            bio: '',
            currentPlayer: {},
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

    componentDidMount() {
        axios.get(`http://localhost:5000/football/singlefootballplayer/${this.props.params.id}`)
            .then(result => this.setState({currentPlayer: result.data}))
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        //creating object with form data
        const body = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            nationality: this.state.nationality,
            club: this.state.club,
            playerNumber: this.state.playerNumber,
            bio: this.state.bio,
        }

        //PUT Request
        //axios.put([url], [object sent as the req.body to the endpoint])
        //returns response Object
        await axios.put(`http://localhost:5000/football/updatefootballplayer/${this.props.params.id}`, body)
            //res - response Object received from put endpoint '/updatefootballplayer/:id'
            .then(res => console.log(res.data)).catch(err => console.log(err));
        
        window.location = '/football';
    }

    render() {
        return(
            <div>
                <center>
                <h3>UPDATE PLAYER</h3>
                    <form onSubmit={this.onSubmitHandler}>
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

export default withRouterUpdate(UpdatePlayer);