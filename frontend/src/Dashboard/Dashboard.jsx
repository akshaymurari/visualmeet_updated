import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {BaseUrl} from '../App.jsx';
import DashboardContent from './DashboardContent/DashboardContent';
import DashboardMenu from './DashboardMenu/DashboardMenu';
import DashboardHeader from './DashboardHeader';
import './Dashboard.scss'
import DashboardProfile from './DashboardProfile/DashboardProfile';
import DashboardEvent from './DashboardEvent/DashboardEvent';
import * as FaIcons from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function Dashboard(props) {
    console.log(props);
    const state = useSelector(state => {
        if (props.type === "student") {
            return state.signin;
        }
        if (props.type === "teacher") {
            return state.teachersignin;
        }
    });
    const [showSideBar, setshowSideBar] = useState(true);
    const H = useHistory();
    let dispatch = useDispatch();
    const [values,setvalues] = useState({});
    useEffect(async () => {
        console.log("hellooo");
        const token = (localStorage.getItem('token'));
        let info = {token,type:props.type};
        // let info = { ...value, 'date': d_s };
        // setvalues(info);
        if(props.type==="student"){
            dispatch({ type: 'request_signin' });
        }
        else if(props.type==="teacher"){
            dispatch({ type: 'request_teachersignin' });
        }
        try {
            const data = await axios({
                method: "post",
                url: `${BaseUrl}verifytoken/`,
                headers: { 'Authorization': `Token ${process.env.token}` },
                data: info,
                responseType: 'json'
            })
            if(props.type==="student"){
                dispatch({ type: "success_signin", payload: data.data });
            }
            else if(props.type==="teacher"){
                dispatch({ type: "success_teachersignin", payload: data.data });
            }
            setvalues(data.data);
        }
        catch {
            if(props.type==="student"){
                dispatch({ type: "error_signin", payload: "" });
            }
            else if(props.type==="teacher"){
                dispatch({ type: "error_teachersignin", payload: "" });
            }
            H.push('/error');
        }
    }, []);
    const diplayDashboardContent = (content) => {
        console.log(content);
        if(true){
            return <DashboardProfile {...values}/>
        }
    }

    return (
        <React.Fragment>
            <DashboardHeader click={()=>setshowSideBar(!showSideBar)}></DashboardHeader>
            <DashboardMenu open={showSideBar} username={values.username} type={props.type} whatToDisplay={diplayDashboardContent}></DashboardMenu>
            <div className="dashboard container">
                <div className="" style={{
                    width: "100vw",
                    zIndex: "1"
                    }}>
                    { diplayDashboardContent() }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;
