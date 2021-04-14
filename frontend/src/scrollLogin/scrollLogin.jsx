import React from 'react';
import "../scrollLogin/scrollLogin.scss";
import LoginCard from "../LoginCard/LoginCard";
import teacher from "../assets/teacher.png";
import student from "../assets/students.png"
import { makeStyles } from '@material-ui/core/styles';
import { flexbox } from '@material-ui/system';
import useWindowPosition from '../hook/useWindowPosition';
import {Link} from "react-router-dom";

const ScrollLogin = () =>{
    const checked = useWindowPosition("welcome");
    return(
        <>
        <div className="pageTwo"  id="login-center">
            <Link className="link1" to="/TeacherSignIn">
                <LoginCard image={teacher} role="Teacher" desc="Please Click on this card to SignIn as a Teacher" checked={checked}></LoginCard>
            </Link>
            <Link to ="/SignIn" className="link1">
                <LoginCard image={student} role="Student" desc="Please Click on this card to SignIn as a Student" checked={checked}></LoginCard>
            </Link>
        </div>
        
        </>
    );
}

export default ScrollLogin;