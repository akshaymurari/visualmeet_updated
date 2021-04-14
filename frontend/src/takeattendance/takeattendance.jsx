import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import './takeattendance.scss';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BaseUrl } from '../App.jsx';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import Token from '../secret_key';
const Takeattendance = () => {
    const cols1 = [
        { field: 'id', headerName: 'USERNAME', width: 260 },
        { field: 'seen', headerName: 'SEEN BY USER', width: 350 },
    ];
    const [rows1, setrows1] = useState([]);
    let [rows, setrows] = useState([]);
    const H = useHistory();
    const { id,subject, section, time, username } = useParams();
    let state = useSelector(state => state.takeattendance);
    const dispatch = useDispatch();
    let state1 = useSelector(state => state.uploadattendance);
    const state2 = useSelector(state => state.getAttendanceNotification);
    const [uploadDetails, setuploadDetails] = useState([]);
    const onCheckBoxClick = (p) => {
        // console.log(p.rowIds);
        console.log(p.rowIds);
        setuploadDetails(p.rowIds);
    }
    const uploadAttendanceForm = async () => {
        // dispatch({ "type": "request_uploadattendance" });
        let dict = {};
        rows1.map((v)=>{
            if(v.seen){
                dict[v.username]=true;
            }     
        });
        console.log(uploadDetails);
        uploadDetails.map((val) => {
            dict[val] = true;
        });
        console.log(rows);
        rows.map((v) => {
            console.log(v)
            if (dict[v['id']]) {
                v["present"] = true;
            }
            else {
                v["present"] = false;
            }
            v["section"] = section;
            v["subject"] = subject;
            v["class_time"] = time;
        });
        const token = localStorage.getItem("token");
        console.log(rows);
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl + "uploadattendance/",
                headers: { "Authorization": `Token ${Token}`},
                responseType: "application/json",
                data: { rows ,token,id,type:"teacher"}
            })
            dispatch({ "type": "success_uploadattendance", "payload": data.data });
            H.push('/ClassBlog');
        }
        catch {
            dispatch({ "type": "error_uploadattendance", "payload": "error" });
            H.push('/error');
        }
    }
    const [checked, setchecked] = useState(false);
    const columns = [
        // { field: 'id', headerName: 'ID', width: 130 },
        { field: 'id', headerName: 'USERNAME', width: 160 },
        { field: 'section', headerName: 'SECTION', width: 130, sortable: false, },
        {
            field: 'total_classes',
            headerName: 'TOTAL CLASSES',
            description: 'total classes taken in this subject',
            width: 130,
            sortable: false,
            type: 'number',
        },
        {
            field: 'total_classes_attended',
            headerName: 'TOTAL_CLASSES_ATTENDED',
            description: 'total classes attended in this subject',
            sortable: false,
            type: 'number',
            width: 180,
        },
    ];
    useEffect(async () => {
        // console.log("hii");
        dispatch({ 'type': "request_takeattendance" });
        try {
            // console.log("hii");
            const data = await axios({
                method: "post",
                url: BaseUrl + 'attendanceBlog/',
                responseType: "json",
                headers: { "Authorization": `Token ${Token}` },
                data: { "section": section, "subject": subject, "username": username,"type":"teacher",token:localStorage.getItem("token")}
            });
            // console.log(data.data);
            dispatch({ 'type': "success_takeattendance", payload: data.data });
            setrows(data.data);
        }
        catch {
            dispatch({ 'type': "error_takeattendance", payload: "error" });
            console.log("error")
        }
    }, []);
    console.log(rows);
    const useStyles3 = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));
    const useStyles2 = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const useStyles1 = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }));
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));
    const classes = useStyles();
    const classes1 = useStyles1();
    const classes2 = useStyles2();
    const classes3 = useStyles3();
    const [page, setpage] = React.useState(7);
    const handleChange = (event) => {
        setpage(event.target.value);
    };
    const getAttendanceNotification = async (sendData) => {
        console.log(sendData);
        dispatch({ 'type': 'request_getAttendanceNotification' });
        // clearTimeout(id);
        // const id=setTimeout(60000);
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl + 'getNotificationResponse/',
                headers: { "Authorization": `token ${Token}` },
                data: sendData,
                responseType: "json"
            });
            dispatch({ 'type': 'success_getAttendanceNotification', payload: data.data });
            console.log(data.data);
            setrows1(data.data);
        }
        catch {
            dispatch({ 'type': 'error_getAttendanceNotification', payload: "" });
        }
    }
    const sendAttendanceNotification = async (e) => {
        // console.log("add notification");
        const d = new Date();
        const d1 = new Date();
        console.log(rows);
        let sendData = [];
        rows.map(async (v) => {
            e.preventDefault();
            d.setMinutes(d1.getMinutes()+2);
            const d_s = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()  + ":" + d.getSeconds();
            dispatch({ 'type': 'request_sendAttendanceNotification' });
            const info = { ...v,username:v.id, "seen": 0, "visibility_time": d_s, "title": subject, "description": "your attendance was added 😃 which was taken on " + time };
            console.log(info);
            sendData.push({...info,id:info.username});
            try {
                const data = await axios({
                    url: BaseUrl + 'NotificationBlogG/',
                    headers: { "Authorization": `token ${Token}` },
                    data: info,
                    method: "post",
                    responseType: "json"
                });
                dispatch({ 'type': 'success_sendAttendanceNotification', payload: data.data });
                console.log(data.data);
            }
            catch {
                dispatch({ 'type': 'error_sendAttendanceNotification', payload: "" });
            }
        })
        dispatch({ 'type': 'request_getAttendanceNotification' });
        setTimeout(() => getAttendanceNotification(sendData), 30000);
    }
    return (
        <>
            <div className="container-fluid p-0" style={{ visibility: (state1.loading) ? "hidden" : "visible" }}>
                <div className="row ">
                    <div className={classes.root}>
                        <AppBar position="static">
                            {/* <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="open drawer">
                                    <MenuIcon />
                                </IconButton>  */}
                            <Toolbar>
                                <Button variant="contained" onClick={sendAttendanceNotification} className="mr-3 bg-warning">start</Button>
                                <Typography className={classes.title} variant="h6" noWrap>
                                    Takeattendance
                            </Typography>
                                <div>
                                    <FormControl className={classes2.formControl} style={{ color: "#fff !important", marginTop: "-0rem" }}>
                                        <InputLabel id="demo-simple-select-label" className="text-white">pages</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={page}
                                            className="text-white"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={15}>15</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <Button onClick={uploadAttendanceForm} style={{ background: "#d7dff7" }}
                                        variant="contained"
                                        color="default"
                                        className={classes3.button}
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload
                                    </Button>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </div>
                </div>
                <div className="row">
                    <div className={classes1.root}>
                        <Accordion>
                            <AccordionSummary style={{ background: "#d7dff7", border: "none !important" }}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography className={classes.heading} color="primary" style={{ fontWeight: "600" }}>Note <DoubleArrowIcon color="primary" style={{ fontSize: "1rem" }} /></Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ background: "#d7dff7", border: "none !important" }}>
                                <Typography>
                                    please click on checkbox if student is present or keep blank in case student is absent
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
                <div className="row">
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
                </div>
                <div className="row mt-5" style={{ visibility: (state.loading || state1.loading) ? "hidden" : "visible" }}>
                    <div style={{ height: '43vh', width: '100%' }}>
                        <DataGrid rows={rows1} columns={cols1} pageSize={3} />
                    </div>
                    <div style={{ height: '43vh', width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={page} checkboxSelection={true} onSelectionChange={onCheckBoxClick} />
                    </div>
                    {/* <table class="table table-striped table-hover">
                         
                    </table> */}
                </div>
            </div>
            {/* <div> */}
            <div className="loader-spinner1" style={{ visibility: (state1.loading || state2.loading) ? "visible" : "hidden" }}>
                <div className="spinner-grow text-success mr-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-danger mr-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-warning mr-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                {/* </div> */}
            </div>
        </>
    )
}

export default Takeattendance
