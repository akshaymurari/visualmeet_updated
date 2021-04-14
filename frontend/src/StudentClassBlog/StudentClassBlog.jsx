import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { DataGrid, getColDef } from '@material-ui/data-grid';
import { BaseUrl } from '../App.jsx';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import RefreshIcon from '@material-ui/icons/Refresh';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Token from '../secret_key';
const StudentClassBlog = () => {
    const H = useHistory();
    let [onsearch, settable] = useState(false);
    let [searchval, onsearchval] = useState("");
    const state1 = useSelector(state => state.StudentClassBlog);
    const state2 = useSelector(state => state.onSearchLinks);
    let state = useSelector(state => state.signin);
    const dispatch = useDispatch();
    const [rows, setrows] = useState([]);
    useEffect(async () => {
        dispatch({ 'type': "request_StudentClassBlog" });
        const info = { "token": (localStorage.getItem("token")),"type":"student"}
        console.log(info);
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl + "getlinks/",
                headers: { 'Authorization': `Token ${Token}` },
                responseType: "json",
                data: info
            });
            dispatch({ 'type': "success_StudentClassBlog", "payload": data.data });
            setrows(data.data);
        }
        catch {
            dispatch({ 'type': "error_StudentClassBlog", "payload": "error" });
            H.push('/error');
        }
    }, [onsearch])
    const onSearch = async (e) => {
        onsearchval(e.target.value);
        dispatch({ 'type': 'request_onSearchLinks' })
        try {
            const info = { "token": (localStorage.getItem("token")),"type":"student",subject: e.target.value}
            console.log(info);
            const data = await axios({
                method: "post",
                url: BaseUrl + "onSearchLinkBlog/",
                headers: { 'Authorization': `Token ${Token}` },
                responseType: "json",
                data: info
            })
            dispatch({ 'type': "success_onSearchLinks", "payload": data.data });
            setrows(data.data);
        }
        catch {
            dispatch({ 'type': "error_onSearchLinks", "payload": "error" });
        }
    }
    const columns = [
        {
            field: 'username',
            headerName: 'TEACHER',
            width: 130,
            description: 'link was posted by',
        },
        { field: 'subject', headerName: 'SUBJECT', width: 130 },
        {
            field: 'start_at',
            headerName: 'CLASS TIME',
            description: 'The time when class starts',
            width: 160,
        },
        {
            field: 'attendance_status',
            headerName: 'ATTENDANCE STATUS',
            description: 'Attandence status of this class',
            width: 220,
        },
        {
            field: 'link',
            headerName: 'LINK',
            renderCell: (params) => {
                // console.log(params);
                return (<Link to={params.value} target="_blank">
                    {params.value}
                </Link>
            )
        },
            width: 200,
            description: 'link was posted by',
        },
    ];
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
    const useStyles1 = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }));
    const classes = useStyles();
    const classes1 = useStyles1();
    return (
        <>
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
                    <AppBar position="static" style={{ background: "#3f50b5" }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer">
                                <RefreshIcon onClick={() => { settable((pre) => !pre); onsearchval("") }} />
                            </IconButton>
                            <Typography className={classes.title} variant="h6" noWrap>
                                LINKSBLOG
                        </Typography>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    value={searchval}
                                    onChange={onSearch}
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Toolbar>
                    </AppBar>
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
                                    please refresh the page for new updates and
                                    search the attendance with subject name
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="loader-spinner" style={{ visibility: (state1.loading || state2.loading) ? "visible" : "hidden" }}>
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
                    <div style={{ height: 400, width: '100%',visibility: (state1.loading || state2.loading) ? "hidden" : "visible" }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentClassBlog;
