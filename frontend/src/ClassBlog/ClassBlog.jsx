import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { BaseUrl } from '../App.jsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import './ClassBlog.scss';
import Token from "../secret_key"
import Notes from './Notes.jsx';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
const ClassBlog = () => {
    const H = useHistory();
    let state = useSelector(state => state.teachersignin);
    let state1 = useSelector(state => state.classblog);
    let dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    let [onadd, setonadd] = useState(true);
    let [notesdata, setnotesdata] = useState([]);
    const [vis,setvis]=useState("hidden")
    const [user,setuser] = useState([]);
    console.log(notesdata);
    useEffect(async () => {
        const token = (localStorage.getItem('token'));
        const info = {token,type:"teacher"}
        dispatch({ type: 'request_teachersignin' });
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl + "verifytoken/",
                headers: { 'Authorization': `Token ${Token}` },
                data: info,
                responseType: 'json'
            })
            dispatch({ type: "success_teachersignin", payload: data.data });
            setuser(data.data);
            setonadd((pre)=> !pre);
            // H.push(`/ClassBlog`);
        }
        catch {
            dispatch({ type: "error_teachersignin", payload: "error" })
            H.push('/error');
        }
    }, []);
    let [values, setvalues] = useState({ "subject": "", "link": "", "section": "", "start_at": "","attendance_status":0,"username":user["username"] })
    useEffect(async () => {
        dispatch({ 'type': 'request_getclassblog' });
        try {
            const data = await axios({
                method: 'post',
                url: BaseUrl + 'getlink/',
                responseType: 'json',
                data:{token:localStorage.getItem("token"),username:user["username"],type:"teacher"}
            })
            // console.log("hii");
            dispatch({ 'type': 'success_getclassblog', payload: data.data });
            console.log(data.data);
            setnotesdata(data.data);
        }
        catch {
            console.log("error");
            dispatch({ 'type': 'error_getclassblog', payload: "" });
        }
    }, [onadd]);
    // console.log(values);
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));
    const useStyles1 = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }));
    const addnotes = async () => {
        dispatch({ 'type': "request_classblog" });
        console.log({ ...values });
        values["start_at"]=values["date"].split("T").join(" ");
        values["type"] = "teacher";
        values["username"] = user["username"]
        values["attendance_status"] = 0
        console.log(values);
        const token = localStorage.getItem("token");
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl + 'addlink/',
                headers: { 'Authorization': `Token ${Token}` },
                data: { ...values,token },
                responseType: 'json'
            })
            console.log("successs");
            console.log(data.data);
            dispatch({ 'type': "success_classblog" });
            setonadd((pre) => !pre);
            setvalues({ "subject": "", "link": "", "section": "", "date": "" });
            setvis("visible");
        }
        catch {
            console.log("error");
            setvis("hidden");
            dispatch({ 'type': "error_classblog" });
        }
    }
    const ondel = (info) => {
        setonadd((pre) => !pre);
    }
    const onlogout = () => {
        localStorage.removeItem('token');
        H.push('/')
    }
    const classes = useStyles();
    const classes1 = useStyles1();
    return (
        <div>
            <div className="loader-spinner" style={{ visibility: (state.loading) ? "visible" : "hidden" }}>
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
            <div style={{ visibility: (state.loading) ? "hidden" : "visible" }}>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <AddIcon onClick={addnotes} />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                ADDCLASSES
                        </Typography>
                            <Button variant="contained" onClick={onlogout} color="secondary">Logout</Button>
                        </Toolbar>
                    </AppBar>
                </div>
                <Collapse in={open} style={{visibility:vis}}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Added SuccessFully
                    </Alert>
                </Collapse>
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-sm-6 border mx-auto boxx text-center px-md-3 shadow" style={{ background: "#d3e0f5", borderRadius: "2rem" }}>
                            {/* <TextField value={values.link}
                            onChange={(e)=>setvalues((pre)=>({...pre,link:e.target.value}))}
                            id="standard-multiline-static"
                            label="LINK"
                            multiline
                            rows={3}
                            // defaultValue=""
                        /><br/> */}
                            <TextField id="standard-basic" value={values.link} onChange={(e) => setvalues((pre) => ({ ...pre, link: e.target.value }))} label="LINK" /><br />
                            <TextField value={values.subject}
                                onChange={(e) => setvalues((pre) => ({ ...pre, subject: e.target.value }))}
                                id="standard-basic" style={{ textAlign: "center", margin: "0.3rem 0" }} label="SUBJECT" /> <br />
                            <TextField value={values.section}
                                onChange={(e) => setvalues((pre) => ({ ...pre, section: e.target.value }))}
                                id="standard-basic" style={{ textAlign: "center", margin: "0.3rem 0" }} label="SECTION" /> <br /><br />
                            <TextField
                                // value={values.date}
                                onChange={(e) => { setvalues((pre) => ({ ...pre, date: e.target.value })) }}
                                id="datetime-local"
                                label="Next appointment"
                                type="datetime-local"
                                // defaultValue="2021-01-01T10:30"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ textAlign: "center" }}
                            />
                            <br />
                            <Button id="circleicon" onClick={addnotes}><AddIcon id="addcircle" /></Button>
                        </div>
                    </div>
                </div>
                <div className="loader-spinner" style={{ visibility: (state1.loading) ? "visible" : "hidden" }}>
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
                <div className="container mt-5" style={{ visibility: (state1.loading) ? "hidden" : "visible" }}>
                    <div className="notesblog" >
                        {notesdata.map((val, i) => <Notes id={val.id} user={user.username} attendance_taken={val.attendance_status} subject={val.subject} fun={ondel} link={val.link} date={val.start_at} section={val.section} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassBlog
