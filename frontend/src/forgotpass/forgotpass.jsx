import React, { useState } from 'react';
import Avatar from "./Avatar/Avatar";
import wave from "../assets/wave.png";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import signInpic1 from "../assets/signInpic1.svg";
import { BaseUrl } from '../App.jsx';
import './forgotpass.scss';
const ForgotPassword = (props) => {
    const state = useSelector(state => state.forgetpass);
    // console.log(state);
    const dispatch = useDispatch();
    const H = useHistory();
    const [value, setValue] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [vis, setvis] = useState({ "visibility": "hidden", "background": "#5ae663", "msg": "" });
    const handleTextChange = (text) => {
        setValue(text);
        if (text !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }
    const onsubmitlogin = async (e) => {
        e.preventDefault();
        dispatch({ 'type': "request_forgetpass" })
        console.log(state);
        const info = { "type": props.type, "email": value }
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl + "forgetpassword/",
                headers: { "Authorization": "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                responseType: "json",
                data: info
            })
            dispatch({type:"success_forgetpass",payload:data.data})
            if (props.type === "student") {
                H.push('/SignIn');
            }
            else {
                H.push('/TeacherSignIn');
            }
            // setvis(()=>({"background":"#5ae663","visibility":"visible","msg":"password as been sent to your mail"}));
        }
        catch {
            setvis(() => ({ "background": "#e05871", "visibility": "visible", "msg": "invalid email" }));
            dispatch({ 'type': "error_forgetpass",'payload':"error"})
            console.log("error")
        }
    }

    return (
        <>
            <div className="alert text-center alert-dismissible fade show m-0 px-2" style={{ "visibility": vis.visibility, "background": vis.background }} role="alert">
                {vis.msg}
            </div>
            <div className="loader-spinner" style={{visibility:(state.loading )? "visible" : "hidden"}}>
                <div className="spinner-grow text-success mr-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-danger mr-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-warning mr-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div className="signUpPage whole" style={{visibility:(state.loading )? "hidden" : "visible"}}>
                <img className="wave" src={wave} alt="wallpaper"></img>
                <h3 className="title text-center">Password will be send to your mail</h3>
                <div className="container">
                    <img src={signInpic1} alt="sigup" className="img" mb-5 style={{ top: "4rem" }}></img>
                    <div className="login-content">
                        <form className="form">
                            <div class="input-div one">
                                <div class="i">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="div">
                                    <h5 className={isActive ? "Active" : ""}>Email</h5>
                                    <input type="text" class="input" value={value}
                                        onChange={(e) => handleTextChange(e.target.value)} required></input>
                                </div>
                            </div>
                            <div>
                                <Link to={(props.type == "student") ? '/resetpass' : '/resetpassteacher'}>anymore ways?</Link>
                            </div>
                            {/*
                                <div class="input-div pass">
                                    <div class="i">
                                        <i class="fas fa-lock"></i>
                                    </div>
                                </div> */}
                            <br />
                            <input type="submit" className="btn" onClick={onsubmitlogin} value="Submit"></input>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;