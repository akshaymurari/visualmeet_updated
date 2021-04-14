// import React, { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import { BaseUrl } from '../App.jsx';
// import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
// import TextField from '@material-ui/core/TextField';
// import axios from 'axios';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import Notes from './Notes.jsx';
// import Alert from '@material-ui/lab/Alert';
// import Collapse from '@material-ui/core/Collapse';
// import CloseIcon from '@material-ui/icons/Close';

// import { useHistory } from 'react-router-dom';

// const NotesBlog = () => {
//     const H = useHistory();
//     let state = useSelector(state => state.NotesBlog);
//     let state1 = useSelector(state => state.AddNotesInBlog)
//     const dispatch = useDispatch();
//     // useEffect(async () => {
//     //     let d = new Date();
//     //     const d_s = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
//     //     // e.preventDefault();
//     //     const value = JSON.parse(localStorage.getItem('value'));
//     //     let info = { ...value, 'date': d_s };
//     //     dispatch({ type: 'request_teachersignin' });
//     //     try {
//     //         const data = await axios({
//     //             method: "post",
//     //             url: BaseUrl + "teacherexists/",
//     //             headers: { 'Authorization': "Token de5fca1fb449f586b63136af9a12ab5afc96602e" },
//     //             data: info,
//     //             responseType: 'json'
//     //         })
//     //         dispatch({ type: "success_teachersignin", payload: data.data });
//     //         // H.push(`/takeattendance`);      
//     //     }
//     //     catch {
//     //         dispatch({ type: "error_teachersignin", payload: "error" })
//     //         H.push('/error');
//     //     }
//     // }, []);
//     const useStyles = makeStyles((theme) => ({
//         root: {
//             flexGrow: 1,
//         },
//         menuButton: {
//             marginRight: theme.spacing(2),
//         },
//         title: {
//             flexGrow: 1,
//         },
//     }));
//     const useStyles1 = makeStyles((theme) => ({
//         root: {
//             '& .MuiTextField-root': {
//                 margin: theme.spacing(1),
//                 width: '25ch',
//             },
//         },
//     }));
//     const addnotes = () => {
//         console.log("add notes");
//     }
//     const classes = useStyles();
//     const classes1 = useStyles1();
//     return (
//         <>
//             <div>
//                 <div className="loader-spinner" style={{ visibility: (state.loading) ? "visible" : "hidden" }}>
//                     <div className="spinner-grow text-success mr-1" role="status">
//                         <span className="sr-only">Loading...</span>
//                     </div>
//                     <div className="spinner-grow text-danger mr-1" role="status">
//                         <span className="sr-only">Loading...</span>
//                     </div>
//                     <div className="spinner-grow text-warning mr-1" role="status">
//                         <span className="sr-only">Loading...</span>
//                     </div>
//                 </div>
//                 <div style={{ visibility: (state.loading) ? "hidden" : "visible" }}>
//                     <div className={classes.root}>
//                         <AppBar position="static">
//                             <Toolbar>
//                                 <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//                                     <AddIcon onClick={addnotes} />
//                                 </IconButton>
//                                 <Typography variant="h6" className={classes.title}>
//                                     ADDCLASSES
//                         </Typography>
//                                 <Button variant="contained" onClick={onlogout} color="secondary">Logout</Button>
//                             </Toolbar>
//                         </AppBar>
//                     </div>
//                     <Collapse in={open} style={{ visibility: vis }}>
//                         <Alert
//                             action={
//                                 <IconButton
//                                     aria-label="close"
//                                     color="inherit"
//                                     size="small"
//                                     onClick={() => {
//                                         setOpen(false);
//                                     }}
//                                 >
//                                     <CloseIcon fontSize="inherit" />
//                                 </IconButton>
//                             }
//                         >
//                             Added SuccessFully
//                     </Alert>
//                     </Collapse>
//                     <div className="container pt-5">
//                         <div className="row">
//                             <div className="col-sm-6 border mx-auto boxx text-center px-md-3 shadow" style={{ background: "#d3e0f5", borderRadius: "2rem" }}>
//                                 {/* <TextField value={values.link}
//                             onChange={(e)=>setvalues((pre)=>({...pre,link:e.target.value}))}
//                             id="standard-multiline-static"
//                             label="LINK"
//                             multiline
//                             rows={3}
//                             // defaultValue=""
//                         /><br/> */}
//                                 <TextField id="standard-basic" value={values.link} onChange={(e) => setvalues((pre) => ({ ...pre, link: e.target.value }))} label="LINK" /><br />
//                                 <TextField value={values.subject}
//                                     onChange={(e) => setvalues((pre) => ({ ...pre, subject: e.target.value }))}
//                                     id="standard-basic" style={{ textAlign: "center", margin: "0.3rem 0" }} label="SUBJECT" /> <br />
//                                 <TextField value={values.section}
//                                     onChange={(e) => setvalues((pre) => ({ ...pre, section: e.target.value }))}
//                                     id="standard-basic" style={{ textAlign: "center", margin: "0.3rem 0" }} label="SECTION" /> <br /><br />
//                                 <TextField
//                                     // value={values.date}
//                                     onChange={(e) => { setvalues((pre) => ({ ...pre, date: e.target.value })) }}
//                                     id="datetime-local"
//                                     label="Next appointment"
//                                     type="datetime-local"
//                                     // defaultValue="2021-01-01T10:30"
//                                     className={classes.textField}
//                                     InputLabelProps={{
//                                         shrink: true,
//                                     }}
//                                     style={{ textAlign: "center" }}
//                                 />
//                                 <br />
//                                 <Button id="circleicon" onClick={addnotes}><AddIcon id="addcircle" /></Button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="loader-spinner" style={{ visibility: (state1.loading) ? "visible" : "hidden" }}>
//                         <div className="spinner-grow text-success mr-1" role="status">
//                             <span className="sr-only">Loading...</span>
//                         </div>
//                         <div className="spinner-grow text-danger mr-1" role="status">
//                             <span className="sr-only">Loading...</span>
//                         </div>
//                         <div className="spinner-grow text-warning mr-1" role="status">
//                             <span className="sr-only">Loading...</span>
//                         </div>
//                     </div>
//                     <div className="container mt-5" style={{ visibility: (state1.loading) ? "hidden" : "visible" }}>
//                         <div className="notesblog" >
//                             {notesdata.map((val, i) => <Notes id={val.id} attendance_taken={val.attendance_taken} subject={val.subject} fun={ondel} link={val.link} date={val.class_time} section={val.section} />)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default NotesBlog
