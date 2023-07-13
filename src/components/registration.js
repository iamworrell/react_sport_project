import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, {Component} from 'react';
import axios from 'axios';


class Register extends Component {
    constructor(props) {
        super(props)
        this.firstName = this.firstName.bind(this);
        this.lastName = this.lastName.bind(this);
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    firstName(e){
        this.setState({
            firstName: e.target.value
        })
    }

    lastName(e){
        this.setState({
            lastName: e.target.value
        })
    }

    email(e){
        this.setState({
            email: e.target.value
        })
    }

    password(e){
        this.setState({
            password: e.target.value
        })
    }
    test(){
        
    }

    async onSubmit(e){
        e.preventDefault();

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        console.log(this.state.firstName, this.state.lastName, this.state.email, this.state.password)
        console.log("Testing" + this.state.firstName);

        //Post Request
        //user sent via the url ie req.body
        await axios.post('http://localhost:5000/user/addUser', user, {
            withCredentials: true,
        })
            //We get access to this response Object when we make a post request
            //logged in the browser
            .then(res => console.log(res))
            .catch((err) => {console.log(err)});
        
       
    }
    


    render(){
        return (
            <div className='body'> 
                <div className="container">
                    <div className="forms">
                        <div className="form login">
                            <span className="title">Register</span>

                            <form onSubmit={this.onSubmit}>
                                <div className="input-field">
                                    <input type="text" placeholder="Enter Your First Name" required onChange={this.firstName}/>
                                </div>
                                <div className="input-field">
                                    <input type="text" placeholder="Enter Your Last Name" required onChange={this.lastName}/>
                                </div>
                                <div className="input-field">
                                    <input type="text" placeholder="Enter Your Email" required onChange={this.email}/>
                                </div>
                                <div className="input-field">
                                    <input type="password" placeholder="Enter Your Password" required onChange={this.password}/>
                                </div>

                                <div className="input-field button">
                                    <input type="submit" value="Sign Up" required />
                                </div>
                            </form>

                            <div className="login-signup">
                                <span className="text">Already a Member?
                                    <Link to={"/login"} className="text signup-text">Login</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;