import React, { useState, useEffect, useRef } from 'react';
import './QueryBlogChat.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button, makeStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import profile_pic from '../assets/male_avatar.png';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import useInterval from 'react-useinterval';
import { useParams } from 'react-router-dom';
import { BaseUrl } from '../App.jsx';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    queryBlogChatAddEmoji: {
        zIndex: "30",
        borderRadius: "50%",
        cursor: "pointer",
        '&:hover': {
            color: "#10cce7"
        }
    }
});

function QueryBlogChat(props) {
    const { title, type } = useParams();
    let state = useSelector(state => {
        if (type === "student") {
            return state.signin;
        }
        if (type === "teacher") {
            return state.teachersignin;
        }
    });
    const H = useHistory();
    const [delay, setDelay] = useState(100);
    const classes = useStyles(props);
    const state2 = useSelector(state2 => state2.showQueryBlogMessages);
    const dispatch = useDispatch();
    const [messages, setmessages] = useState([

    ]);

    const [showEmoji, setshowEmoji] = useState(false);
    const [backDrop, setbackDrop] = useState(false);
    const state1 = useSelector(state => state.sendQueryBlogMessages);
    const [newMessage, setnewMessage] = useState([
            {
            posted_by: "me",
            message: "hello"
        }
    ]);
    const [updateMessage, setupdateMessage] = useState(true);
    console.log(messages);

    const showQueryBlogMessages = async (e) => {
        setDelay(null);
        setupdateMessage((pre) => !pre);
    }
    useEffect(()=>{
        const ws = new WebSocket("ws://localhost:5000",localStorage.getItem("token"));
        console.log("hellooo")
        ws.onopen = () => {
            console.log("connecttion open");
            ws.send(JSON.stringify({title}));
        }
        ws.onmessage = (data) => {
            console.log(data.data);
            setmessages(JSON.parse(data.data));
        }
        ws.onerror = () => {
            // console.log("error");
            // H.push("/error");
        }
        ws.onclose = () => {
            // console.log("closed");
        }
    },[]);
    const onSubmitMessage = async () => {
        // dispatch({ "type": "request_sendQueryBlogMessages" })
        const info = { "type": type, "title": title, "posted_by": localStorage.getItem('username'), "message": newMessage.message };
        console.log(info);
        const ws = new WebSocket("ws://localhost:5000",localStorage.getItem("token"));
        ws.onopen = () => {
            ws.send(JSON.stringify(info))
            console.log("open");
        }
        ws.onmessage = () => {
            setmessages(JSON.parse(info));
        }
        ws.onerror = (err) => {
            console.log(err);
        }
        setnewMessage({
            posted_by: "",
            message: ""
        });
    }
    const handleChange =  (e) => {
        // console.log(newMessage);
        setnewMessage({
            posted_by: "me",
            message: e.target.value
        });
       
    }
    const addEmoji = e => {
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach(el => codesArray.push('0x' + el))
        let emoji = String.fromCodePoint(...codesArray)
        setnewMessage({
            posted_by: "me",
            message: newMessage.message + emoji,
        });
    }


    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);
    console.log(messages);

    return (
        <div className="queryBlogChatScreen p-0">
            {backDrop ? <div style={{ width: "100%", height: "100%", position: "absolute", zIndex: "20", border: "0" }} onClick={(e) => {
                setbackDrop(false);
                setshowEmoji(false);
            }}></div> : null}
            <div className="queryBlogChatArea container ">
                <div className="row align-items-stretch" style={{ height: "100%", borderRadius: "10px" }}>
                    <div className="col-md-3 p-0 queryBlogChatAreaLeftPane">
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
                        <div className="queryBlogChatBack" >
                            <Button><ArrowBackIcon></ArrowBackIcon></Button>
                        </div>
                        <div className="queryBlogChatTitle">
                            <img src={profile_pic} style={{ width: "9rem", height: "8rem" }}></img>
                            <h1>Hello!</h1>
                            <p>{(localStorage.getItem('username'))}</p>
                        </div>
                        <h3 style={{
                            marginLeft: "20px"
                        }}>TOPIC:</h3>
                        <h3 style={{
                            border: "black 0.8px solid",
                            borderLeft: "#79d70f 5px solid",
                            marginTop: "20px",
                            padding: "8px",
                        }}>{title}</h3>
                        <div style={{
                            position: "absolute",
                            bottom: "0.3rem",
                            lineHeight: "0.5px",
                            textAlign: "center",
                            display: "block",
                            margin: "0 2rem",
                            fontSize: "0.8rem"
                        }}>
                            <p>Please Follow the Community GuideLines</p>
                            <p>Visual Meet</p>
                        </div>
                    </div>
                    <div className="col-md-9 p-0 queryBlogChatAreaRightPane" style={{ border: "black 1px solid" }}>
                        <div className="queryBlogChatMessagesArea">
                            <div className="queryBlogChatHeader p-2">
                                <h1 className="queryBlogChatHeaderHeading">Discussion Forum 🔍</h1>
                            </div>
                            <div className="queryBlogChats">
                                <div ref={messagesEndRef} />
                                {messages.map((value, idx) => (
                                    <div className={(((localStorage.getItem('username'))) === value.posted_by) ? "me" : "student"}
                                        style={{ background: ((localStorage.getItem('username'))=== value.posted_by) ? "80ffdb" : (value.type === "student") ? "#cffffe" : "#fcf876" }} id={idx}>
                                        <p className="queryBlogChatMessageName">{value.posted_by === ((localStorage.getItem('username'))) ? "Me" : value.posted_by}</p>
                                        <p>{value.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="queryBlogChatNewMessageArea">
                            {showEmoji ? (
                                <span style={{
                                    position: "absolute",
                                    bottom: "80px",
                                    left: "10px",
                                    zIndex: "40",
                                }}>
                                    <Picker onSelect={(e) => addEmoji(e)} title="Visual Meet" />:
                                </span>
                            ) : null
                            }
                            <InsertEmoticonIcon
                                className={classes.queryBlogChatAddEmoji}
                                style={{
                                    fontSize: "1.8rem"
                                }}
                                onClick={() => {
                                    setshowEmoji(!showEmoji);
                                    setbackDrop(!backDrop);
                                }}></InsertEmoticonIcon>
                            <textarea placeholder="Enter you Message" className="queryBlogChatNewMessageTeaxtArea mt-2" value={newMessage.message} onChange={(event) => handleChange(event)} id="cin" style={{ width: "75%" }}
                                onKeyPress={
                                    (e) => {
                                        var code = e.keyCode || e.which;
                                        if (code === 13 && !e.shiftKey) {
                                            e.preventDefault();
                                            if (newMessage.message !== "") {
                                                onSubmitMessage();
                                            }
                                        }
                                    }
                                }></textarea>
                            <Button onClick={() => {
                                onSubmitMessage();
                            }}><SendIcon></SendIcon></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QueryBlogChat;
