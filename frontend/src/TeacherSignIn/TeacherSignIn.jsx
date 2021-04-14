import React, { useState,useEffect } from 'react';
import "./TeacherSignIn.scss";
import signInpic1 from "../assets/signInpic1.svg";
import wave from "../assets/wave.png";
import teacher from "../assets/teacher.png";
import axios from 'axios';
import {BaseUrl} from '../App.jsx';
import { useHistory } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
const TeacherSignIn = () => {
    let state = useSelector(state=>state.teachersignin);
    let dispatch = useDispatch();
    const H = useHistory();
    const [gender, setgender] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');
    const [isActivePass, setIsActivePass] = useState(false);
    const [valuePass, setValuePass] = useState('');
    const [vis, setvis] = useState("none");

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
        console.log(d_s)
        let info = {"username": value, "password": valuePass,"type":"teacher" }
        dispatch({type:"request_teachersignin"});
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl+"login/",
                data: info,
                responseType: 'json'
            })
            dispatch({type:"success_teachersignin",payload:data.data});
            localStorage.setItem('token',data.data.token);
            H.push(`/teacherblog`);
        }
        catch {
            dispatch({type:"error_teachersignin",payload:"error"});
            setvis("block");
            console.log("error");
        }
    }
    return (
        <div className="teacherSignInWholePage">
            <div className="alert alert-danger alert-dismissible fade show m-0 px-2" style={{ display: vis }} role="alert">
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
            <div className="signUpPage wholeteachersignin" style={{visibility:(state.loading )? "hidden" : "visible"}}>
                <img className="wave" src={wave} alt="wallpaper"></img>
                <div className="container">
                    <img src={signInpic1} alt="sigup" className="img" mb-5 style={{ top: "4rem" }}></img>
                    <div className="login-content">
                        <form className="form">
                            <h2 className="title">SignIn</h2>
                            <img src={teacher} alt="Teacher profile pic"></img>
                            <div class="input-div one mt-4">
                                <div class="i">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="div">
                                    <h5 className={isActive ? "Active" : ""}>Id-Number/Email</h5>
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
                            <input type="submit" onClick={onsubmitlogin} className="btn" value="Login"></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherSignIn;