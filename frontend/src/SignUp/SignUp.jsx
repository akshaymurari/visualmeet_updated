import React, { useState } from 'react';
import "./SignUp.scss";
import signUp from "../assets/signUp.svg";
import Avatar from "./Avatar/Avatar";
import wave from "../assets/wave.png";
import axios from 'axios';
import {BaseUrl} from '../App.jsx';
import { useHistory } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
const SignUp = () => {
    let state=useSelector(state=>state.signup);
    let dispatch = useDispatch();
    const [gender, setgender] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const [isActiveSection, setIsActiveSection] = useState(false);
    const [value, setValue] = useState('');
    const [isActivePass, setIsActivePass] = useState(false);
    const [valuePass, setValuePass] = useState('');
    const [isActiveEmail, setIsActiveEmail] = useState(false);
    const [valueEmail, setValueEmail] = useState('');
    const [section,setSection] = useState('');
    const H = useHistory();
    const [vis, setvis] = useState("hidden");
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
    const handleTextChangeEmail = (text) => {
        setValueEmail(text);

        if (text !== '') {
            setIsActiveEmail(true);
        } else {
            setIsActiveEmail(false);
        }
    }
    const handleTextChangeSection = (text) => {
        setSection(text);
        if (text !== '') {
            setIsActiveSection(true);
        } else {
            setIsActiveSection(false);
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
    const submitMember = async (event) => {
        event.preventDefault();
        let d = new Date();
        const d_s=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        console.log(d_s);
        console.log(`${gender} ${value} ${valueEmail} ${valuePass}`);
        const info = { "gender": gender,"section":section, "username": value, "rollno": value, "email": valueEmail, "password": valuePass,"lastloginat":d_s }
        dispatch({type:"request_signup"});
        try {
            console.log("hiii");
            let data = await axios({
                method: 'post',
                url: BaseUrl+'studentStore/',
                headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                data: info,
                responseType: 'json'
            });
            dispatch({type:"success_signup",payload:data.data});
            console.log(value);
            localStorage.setItem('value',JSON.stringify({'rollno':value,'password':valuePass,'gender':gender}))
            H.push(`/Dashboard`);
        }
        catch {
            dispatch({type:"error_signup",payload:'error'});
            setvis("visible")
            console.log("error");
        }
    }
    return (
        <>
        <div className="alert text-center alert-danger alert-dismissible fade show m-0 px-2" style={{ "visibility": vis }} role="alert">
                rollnumber or email already exists
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
        <div className="signUpPage wholesignup" style={{visibility:(state.loading )? "hidden" : "visible"}}>
            <img className="wave" src={wave} alt="wallpaper"></img>
            <div className="container"  >
                <img src={signUp} alt="sigup" className="img"></img>
                <div className="login-content">
                    <form className="form">
                        <h2 className="title">SignUP</h2>
                        <Avatar gender={gender}></Avatar>
                        <div className="input-div one mt-3">
                            <div className="i">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="div">
                                <h5 className={isActive ? "Active" : ""}>RollNumber</h5>
                                <input type="text" className="input" value={value}
                                    onChange={(e) => handleTextChange(e.target.value)} required></input>
                            </div>
                        </div>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="div">
                                <h5 className={isActiveEmail ? "Active" : ""}>Email</h5>
                                <input type="email" class="input" value={valueEmail}
                                    onChange={(e) => handleTextChangeEmail(e.target.value)} required></input>
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                <h5 className={isActivePass ? "Active" : ""}>Password</h5>
                                <input type="password" class="input" value={valuePass}
                                    onChange={(e) => handleTextChangePass(e.target.value)} required></input>
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                <h5 className={isActiveSection ? "Active":""}>section</h5>
                                <input type="text" class="input" value={section}
                                    onChange={(e) => handleTextChangeSection(e.target.value)} required></input>
                            </div>
                        </div>
                        <div className="btn-group">
                            <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                {gender === 1 ? "Male" : "Female"}
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={changeGender}>Male</a></li>
                                <li><a className="dropdown-item" onClick={changeGender}>Female</a></li>
                            </ul>
                        </div>
                        <br />
                        <a href="/SignIn" className="have" m-auto>Already a Member?</a>
                        <input type="submit" className="btn" onClick={submitMember} value="SignUp"></input>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default SignUp;