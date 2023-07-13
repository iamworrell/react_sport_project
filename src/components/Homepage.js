import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React,  {useEffect, useState}  from 'react';
import HomeNavBar from './HomeNavBar';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useCookies} from 'react-cookie';
import Cookie from "js-cookie";

function Homepage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    //Output User Specific Data Via Cookie/JWT
    //Verification Logic
    //on load this code checks if the jwt cookie is present if not the user is redirected
    const [cookies, setCookies, removeCookie] = useCookies([]);
    useEffect(() => {
        Cookie.set("Saiyan", "Goku");
         console.log(Cookie.get("Saiyan"))
        const verifyUser = async () => {
            if(!cookies.jwt) {
                console.log("Hello1");
                navigate("/login");
            }else{
                const data = await axios.post("http://localhost:5000", {}, {withCredentials:true});
                if(!data) {
                    removeCookie("jwt");
                    navigate("/login");
            }else{
                console.log(data.data.user);
                setEmail(data.data.user);
            }
            };
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);
        return (
            <div className="homePageDiv">
                <center>
                <h1>
                    <p className='headingOneParagraph'>SPORTS DATASHEET
                    </p>
                </h1>
                </center>
                
                <HomeNavBar></HomeNavBar>
                <Link to="/football" style={{textDecoration: "none"}}>
                    <p className='homePageTile'>Football</p>
                </Link>
                <h2 className='greeting'>Hello {email},</h2>
                
            </div>
        )
}

export default Homepage;