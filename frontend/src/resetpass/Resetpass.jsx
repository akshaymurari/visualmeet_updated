import React, { useState } from 'react';
import './Resetpass.scss';
import wave from "../assets/wave.png";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import signInpic1 from "../assets/signInpic1.svg";
import {BaseUrl} from '../App.jsx';
import {useSelector,useDispatch} from 'react-redux';
const Resetpass = (props) => {
    let state=useSelector(state=>state.resetpass);
    let dispatch = useDispatch();
    const H = useHistory();
    const [value, setValue] = useState('');
    const [isActivePass, setIsActivePass] = useState(false);
    const [valuePass, setValuePass] = useState('');
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
    const handleTextChangePass = (text) => {
        setValuePass(text);

        if (text !== '') {
            setIsActivePass(true);
        } else {
            setIsActivePass(false);
        }
    }
    const onsubmitlogin = async (e) => {
        e.preventDefault();
        const info = { "password": valuePass }
        console.log(info);
        console.log(value);
        console.log(props.type);
        dispatch({type:"request_resetpass"});
        try {
            const data = await axios({
                method: "patch",
                url: BaseUrl+props.type+"Store/"+value+"/",
                headers: { "Authorization": "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
                responseType: "json",
                data: info
            })
            dispatch({type:"success_resetpass",payload:data.data})
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
            console.log("error")
            dispatch({type:"error_resetpass",payload:"error"});
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
                <h3 className="title text-center">Reset your password</h3>
                <div className="container">
                    <img src={signInpic1} alt="sigup" className="img" mb-5 style={{ top: "4rem" }}></img>
                    <div className="login-content">
                        <form className="form">
                            <div class="input-div one">
                                <div class="i">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="div">
                                    <h5 className={isActive ? "Active" : ""}>Username</h5>
                                    <input type="text" class="input" value={value}
                                        onChange={(e) => handleTextChange(e.target.value)} required></input>
                                </div>
                            </div>
                            <div class="input-div pass">
                                <div class="i">
                                    <i class="fas fa-lock"></i>
                                </div>
                                <div class="div">
                                    <h5 className={isActivePass ? "Active" : ""}>New Password</h5>
                                    <input type="password" class="input" value={valuePass}
                                        onChange={(e) => handleTextChangePass(e.target.value)} required></input>
                                </div>
                            </div>
                            <br />
                            <input type="submit" className="btn" onClick={onsubmitlogin} value="Submit"></input>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Resetpass;