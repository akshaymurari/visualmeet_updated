import React, { useState } from 'react';
import "./TeacherSignUp.scss";
import signUp from "../assets/signUp.svg";
import Avatar from "./Avatar/Avatar";
import wave from "../assets/wave.png";
import teacher from "../assets/teacherPic.png"
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const TeacherSignUp = () => {
    const H = useHistory();
    const [gender, setgender] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');
    const [isActivePass, setIsActivePass] = useState(false);
    const [valuePass, setValuePass] = useState('');
    const [isActiveEmail, setIsActiveEmail] = useState(false);
    const [valueEmail, setValueEmail] = useState('');
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
        let d = new Date();
        const d_s=d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        event.preventDefault();
        console.log(`${gender} ${value} ${valueEmail} ${valuePass}`);
        const info = { "gender": gender, "username": value, "email": valueEmail, "password": valuePass,"lastloginat":d_s }
        try {
            console.log("hiii");
            let data = await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/teacherStore/',
                headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                data: info,
                responseType: 'json'
            });
            console.log(data);
            const fun = () => H.push(`/mainblog/${value}`);
            fun();
        }
        catch {
            setvis("visible")
            console.log("error");
        }
    }
    return (
        <>
            <div className="alert alert-danger alert-dismissible fade show m-0 px-2" style={{ "visibility": vis }} role="alert">
                rollnumber or email already exists
            </div>
            <div className="signUpPage wholeteachersignup">
                <img className="wave" src={wave} alt="wallpaper"></img>
                <div className="container">
                    <img src={signUp} alt="sigup" className="img"></img>
                    <div className="login-content">
                        <form className="form">
                            <h2 className="title">SignUP</h2>
                            <img src={teacher} alt="Teacher profile pic"></img>
                            <div class="input-div one mt-3">
                                <div class="i">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="div">
                                    <h5 className={isActive ? "Active" : ""}>ID-Number</h5>
                                    <input type="text" class="input" value={value}
                                        onChange={(e) => handleTextChange(e.target.value)} required></input>
                                </div>
                            </div>
                            <div class="input-div one">
                                <div class="i">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="div">
                                    <h5 className={isActiveEmail ? "Active" : ""}>Email</h5>
                                    <input type="email" class="input" value={valueEmail}
                                        onChange={(e) => handleTextChangeEmail(e.target.value)} required></input>
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
                            <a href="/TeacherSignIn" className="have" m-auto>Already a Member?</a>
                            <input type="submit" onClick={submitMember} class="btn" value="SignUp"></input>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherSignUp;