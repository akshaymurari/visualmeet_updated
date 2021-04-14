// import React from 'react'
// import './NotesBlog.scss';
// import IconButton from '@material-ui/core/IconButton';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import axios from 'axios';
// import {BaseUrl} from '../App.jsx';
// import {useHistory} from 'react-router-dom';
// import {useSelector,useDispatch} from 'react-redux';
// const Notes = (props) => {
//     const H= useHistory();
//     const state = useSelector(state=>state.deletenotes);
//     const dispatch=useDispatch();
//     console.log(props);
//     let options;
//     if(props.attendance_taken==0){
//         options = [
//             'delete',
//             'upload'
//         ];
//     }
//     else{
//         options = []
//     }
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const open = Boolean(anchorEl);
  
//     const handleClick = (event) => {
//         // console.log(event.currentTarget);
//         setAnchorEl(event.currentTarget);
//     };
  
//     const handleClose = async (op) => {
//         if(op==="delete"){
//             const info={"id":props.id};
//             console.log(props);
//             console.log(op);
//             dispatch({'type':"request_deletenotes"})
//             try{
//                 const data = await axios({
//                     url: BaseUrl+'deleteClassLinks/',
//                     method:'delete',
//                     headers:{"Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"},
//                     data:info,
//                     requestType:"json"
//                 });
//                 console.log(data.data);
//                 dispatch({'type':"success_deletenotes",'payload':data.data});
//                 props.fun(info);
//             }
//             catch{
//                 dispatch({'type':"error_deletenotes",'payload':""});
//             }
//         }
//         else if(op==="upload"){
//             H.push(`takeattendance/${props.subject}/${props.section}/${props.date}`);
//         }
//         setAnchorEl(null);
//     };
//     const ITEM_HEIGHT = 48;
//     return (
//         <>
//             <div className="p-3 pr-5 mx-3 my-4 Notee border shadow" style={{ background: (props.attendance_taken==0)?"#d3e0f5":"3f50b5", borderRadius: "2rem" }}>
//                 {/* <div style={{visibility:(props.attendance_taken==0)?"visible":"hidden"}}> */}
//                     <IconButton 
//                         aria-label="more"
//                         aria-controls="long-menu"
//                         aria-haspopup="true"
//                         onClick={handleClick}
//                     >
//                         <MoreVertIcon />
//                     </IconButton>
//                     <Menu
                        
//                         id="long-menu"
//                         anchorEl={anchorEl}
//                         keepMounted
//                         open={open}
//                         onClose={handleClose}
//                         PaperProps={{
//                             style: {
//                                 maxHeight: ITEM_HEIGHT * 4.5,
//                                 width: '20ch',
//                             },
//                         }}>
//                         {options.map((option) => (
//                             <MenuItem key={option} selected={option === 'delete'} onClick={()=>handleClose(option)}>
//                                 {option}
//                             </MenuItem>
//                         ))}
//                     </Menu>
//                 {/* </div> */}
//                 <h3>{props.subject}</h3>
//                 <p><a href={props.link} target="_blank">{props.link}</a></p>
//                 <p>{props.section}</p>
//                 <p>{props.date}</p>
//             </div>
//         </>
//     )
// }

// export default Notes
