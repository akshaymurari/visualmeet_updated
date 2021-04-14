import React, { useState, useEffect } from 'react'
import Alert from '@material-ui/lab/Alert';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BaseUrl } from '../App.jsx';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import Token from '../secret_key';

const NotificationBlog = (props) => {
    let state = useSelector(state => {
        if (props.type === "student") {
            return state.signin;
        }
        else {
            return state.teachersignin;
        }
    });
    let dispatch = useDispatch();
    const [noOfMessages, setNoOfMessages] = useState(0);
    const H = useHistory();
    useEffect(async () => {
        dispatch({ 'type': 'request_showNotifications' });
        try {
            const data = await axios({
                method: 'post',
                url: BaseUrl + `getNotifications/`,
                headers: { 'Authorization': `Token ${Token}` },
                data: { "token": (localStorage.getItem('token')),"type":"student" },
                responseType: 'json'
            });
            dispatch({ 'type': 'success_showNotifications', payload: data.data });
            setRows(data.data);
            setNoOfMessages(data.data.length);
        }
        catch {
            dispatch({ 'type': 'error_showNotifications', payload: "" });
            H.push('/error')
        }
    }, []);
    // useEffect(async () => {

    // },[]);

    const columns = [
        { field: 'title', headerName: 'TITLE', width: 160 },
        { field: 'description', headerName: 'DESCRIPTION', width: 250 },
        {
            field: 'visibility_time',
            headerName: 'VISIBILITY_TIME',
            description: 'This link will be disable within this date and time',
            width: 200,
        },
        {
            field: 'posted_on',
            headerName: 'POSTED_ON',
            width: 230
        },
    ];
    const [rows, setRows] = useState([]);
    const addNotification = () => {
        console.log("clicked");
    }
    return (
        <div className="container-fluid fixed-top  py-4" style={{ height:"100vh" ,background: "#c5d2ed" }}>
            {/* {(props.type==="teacher")?(<IconButton onClick={addNotification} className="absolute ml-auto primary" >
                <AddIcon className="text-info" style={{fontSize:"4rem"}}/>
            </IconButton>):""} */}
            <div className="container mt-3">
                <Alert severity="success">{(noOfMessages == 0) ? "You have seen All the messages" : `unseen messages count ${noOfMessages}`}
                </Alert>
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
                <div style={{ height: '80vh', width: '100%', background: "#dfe3eb", visibility: (state.loading) ? "hidden" : "visible" }}>
                    <DataGrid style={{ border: "0.1rem solid #00d !important" }} rows={rows} columns={columns} pageSize={10} />
                </div>
            </div>
        </div>
    )
}

export default NotificationBlog
