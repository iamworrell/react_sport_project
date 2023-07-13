import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, {Component} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props)
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    email(e){
        this.setState({
            email: e.target.value,
        }) 
    }

    password(e){
        this.setState({
            password: e.target.value,
        })
    }


    async onSubmit(e){
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
            
        }

        //Post Request
        //user sent via the url ie req.body
        await axios.post('http://localhost:5000/user/loginUser', user, {
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
                            <span className="title">Login</span>

                            <form onSubmit={this.onSubmit}>
                                <div className="input-field">
                                    <input type="text" placeholder="Enter Your Email" required onChange={this.email}/>
                                </div>
                                <div className="input-field">
                                    <input type="password" placeholder="Enter Your Password" required onChange={this.password}/>
                                </div>
                                
                                <div className="input-field button">
                                    <input type="submit" value="Login Now" required />
                                </div>

                            </form>

                            <div className="login-signup">
                                <span className="text">Not a Member?
                                    <Link to="/registration" className="text signup-text">Signup Now</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;