import React, {useState} from 'react';
import Profile_pic from '../../assets/male_avatar.png';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ClassLinks from '../../ClassLinks/ClassLinks';
import './DashboardMenu.scss';
import { makeStyles } from '@material-ui/core';
import * as FaIcons from 'react-icons/fa';
import {CgProfile} from 'react-icons/cg';
import {BiNotepad,BiLink,BiCalendarEvent} from 'react-icons/bi';
import {VscCommentDiscussion} from 'react-icons/vsc';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles({
    dashboardMenuButtonGroup:{
        width: "100%"
    },
    dashboardMenuButton: {
        height: "3.2rem",
        border: "none",
        outline: "none",
        width: "inherit",
        textAlignLast: "right",
        "&:hover": {
            backgroundColor: "#7bf159",
            color: "white",
        }
    },
    dashboardMenuButtonSelected: {
        borderLeft: "5px rgb(26, 238, 26) solid",
        backgroundColor: "white"
    }
});

function DashboardMenu(props) {
    // console.log(props);
    const classes = useStyles(props);
    const [view, setView] = React.useState('list');
    const H = useHistory();
    const handleChange = (event, nextView) => {
        setView(nextView);
    };

    const [content, setcontent] = useState("profile");

    const togglingDisplay = () => {
        console.log(content);
        props.whatToDisplay(content);
    }

    const dashboardMenuStyles = {
        "dashboardMenu": true,
        "dashboardMenuOpen": props.open===true,
        "dashboardMenuClose": props.open===false
    }

    // const H = useHistory();
    return (
        <div className={`dashboardMenu ${props.open? `dashboardMenuStyles`: ``}`} style={{height:"100%", paddingTop: "4rem", position: ""}}>
            <img src={Profile_pic} alt="Profile" style={{width:"9rem", height:"8rem"}} className="mt-5 mb-3"></img>
            <p>Hello! {props.username}</p>
            <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange} className={classes.dashboardMenuButtonGroup}>
                <ToggleButton value="profile" aria-label="profile" selected ={content==="profile"?true:false} onClick={() => {
                    setcontent("profile");
                    togglingDisplay();
                }} className={`${content==="profile"?classes.dashboardMenuButtonSelected:""} ${classes.dashboardMenuButton}`}>
                    <h6 className="mr-auto my-auto" style={{color: "black"}}> <CgProfile style={{
                        color: "black",
                        margin: "auto 1rem"
                    }}></CgProfile>  Profile</h6>
                </ToggleButton>
                <ToggleButton style={{"display": (props.type==="student")?"visible":"none"}} value="attendance" aria-label="attendance" selected ={content==="attendance"?true:false} onClick={() => {
                    setcontent("attendance");
                    H.push('/DashboardAttendence');
                }} className={`${content==="attendance"?classes.dashboardMenuButtonSelected:""} ${classes.dashboardMenuButton}`}>
                    <h6 className="mr-auto my-auto" style={{color: "black"}}>
                    <BiNotepad style={{
                        color: "black",
                        margin: "auto 1rem"
                    }}>
                    </BiNotepad>
                    Attendence</h6>
                </ToggleButton>
                <ToggleButton value="classLinks" aria-label="classLinks" selected ={content==="classLinks"?true:false} onClick={() => {
                    setcontent("classLinks");
                    togglingDisplay();
                    (props.type==="student")?H.push('/StudentClassBlog'):H.push('/ClassBlog');
                }} className={`${content==="classLinks"?classes.dashboardMenuButtonSelected:""} ${classes.dashboardMenuButton}`}>
                    <h6 className="mr-auto my-auto" style={{color: "black"}}><BiLink style={{
                        color: "black",
                        margin: "auto 1rem",
                        fontSize: "1rem"
                    }}>
                    </BiLink>Class Links</h6>
                </ToggleButton>
                <ToggleButton value="queryBlog" aria-label="queryBlog" selected ={content==="queryBlog"?true:false} onClick={() => {
                    setcontent("queryBlog");
                    togglingDisplay();
                    (props.type==="student")?H.push('/QueryBlog'):H.push('/teacherQueryBlog');
                }} className={`${content==="queryBlog"?classes.dashboardMenuButtonSelected:""} ${classes.dashboardMenuButton}`}>
                    <h6 className="mr-auto my-auto" style={{color: "black"}}><VscCommentDiscussion style={{
                        color: "black",
                        margin: "auto 1rem",
                    }}>
                    </VscCommentDiscussion>Query Blog</h6>
                </ToggleButton>
                <ToggleButton value="events" aria-label="events" selected ={content==="events"?true:false} onClick={() => {
                    setcontent("events");
                    togglingDisplay();
                    (props.type==="student")?H.push('/DashboardEvent'):H.push('/DashboardEventTeacher');
                }} className={`${content==="events"?classes.dashboardMenuButtonSelected:""} ${classes.dashboardMenuButton}`}>
                    <h6 className="mr-auto my-auto" style={{color: "black"}}><BiCalendarEvent 
                    style={{
                        color: "black",
                        margin: "auto 1rem",
                    }}>
                    </BiCalendarEvent>Events</h6>
                </ToggleButton>
            </ToggleButtonGroup>
            <a className="ml-auto mr-3" href="/" style={{ color: "#fff", position:"relative",top: "5rem"}}>
                <button type="button" className="btn btn-outline-danger ml-2" onClick={() => { localStorage.removeItem('token'); }}><span>LOGOUT</span></button>
            </a>
        </div>
    )
}

export default DashboardMenu;
