import React, { useState } from 'react';
import "./SignIn.scss";
import signInpic1 from "../assets/signInpic1.svg";
import Avatar from "./Avatar/Avatar";
import wave from "../assets/wave.png";
import axios from 'axios';
import {BaseUrl} from '../App.jsx';
import { useHistory } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
const SignIn = () => {
    let state = useSelector(state=>state.signin);
    let dispatch = useDispatch();
    const H = useHistory();
    const [gender, setgender] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');
    const [isActivePass, setIsActivePass] = useState(false);
    const [valuePass, setValuePass] = useState('');
    const [vis,setvis] = useState("none");
    const handleTextChange = (text) => {
        setValue(text);
        if (text !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }

    const handleTextChangePass = (text) => {
        setValuePass(text);

        if (text !== '') {
            setIsActivePass(true);
        } else {
            setIsActivePass(false);
        }
    }

    const changeGender = () => {
        if (gender === 1) {
            setgender(0);
            console.log(gender);
        }
        else {
            setgender(1);
            console.log(gender);
        }
    }
    const onsubmitlogin = async (e) => {
        let d = new Date();
        const d_s=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        e.preventDefault();
        let info = { "username": value, "password": valuePass ,type:"student"}
        dispatch({type:'request_signin'});
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl+"login/",
                data: info,
                responseType: 'json'
            });
            dispatch({type:"success_signin",payload:data.data});
            localStorage.setItem('token',data.data.token);
            H.push(`/Dashboard`);
        }
        catch {
            dispatch({type:"error_signin",payload:"error"})
            setvis("block")
            console.log("error");
        }
    }
    return (
        <div className="signInCompletePage">
         <div className="signInCompletePage" style={{minWidth:"100vw"}}>
            <div className="alert text-center alert-danger alert-dismissible fade show m-0 px-2" style={{ display: vis }} role="alert">
                invalid details provided
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
                <div className="container">
                    <img src={signInpic1} alt="sigup" className="img" mb-5 style={{ top: "4rem" }}></img>
                    <div className="login-content">
                        <form className="form">
                            <h2 className="title">SignIn</h2>
                            <Avatar gender={gender} ></Avatar>
                            <div class="input-div one mt-5">
                                <div class="i">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="div">
                                    <h5 className={isActive ? "Active" : ""}>RollNumber/Email</h5>
                                    <input type="text" class="input" value={value}
                                        onChange={(e) => handleTextChange(e.target.value)} required></input>
                                </div>
                            </div>

                            <div class="input-div pass">
                                <div class="i">
                                    <i class="fas fa-lock"></i>
                                </div>
                                <div class="div">
                                    <h5 className={isActivePass ? "Active" : ""}>Password</h5>
                                    <input type="password" class="input" value={valuePass}
                                        onChange={(e) => handleTextChangePass(e.target.value)} required></input>
                                </div>
                            </div>
                            <br />
                            <input type="submit" className="btn" onClick={onsubmitlogin} value="Login"></input>
                        </form>
                    </div>
                </div>
            </div>
        // </div>
    </div>
    );
}

export default SignIn;