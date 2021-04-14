import React from 'react';
import "./PostedLinks.scss";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import {Markup} from 'interweave';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({
    linkDeleteButton: {
        borderRadius: "50%",
        position: "absolute !important",
        bottom: "1rem",
        right: "1rem",
        width: "2rem !important",
        height: "4rem",
        transition: "0.3s",
        '&:hover': {
            background: "#77f496",
            color: "#fff"
        }
    },
    linkMenuButton: {
        borderRadius: "50%",
        position: "absolute !important",
        bottom: "1rem",
        right: "6rem",
        height: "4rem",
        transition: "0.3s",
        '&:hover': {
            background: "#77f496",
            color: "#fff"
        }
    },
    linkMenuItems: {
        '&:hover': {
            background: "#77f496",
            color: "#fff"
        }
    },
    linkDeleteIcon: {
        fontSize: "1.5rem"
    },
    linkMenuIcon: {
        fontSize: "2rem"
    }
});

function PostedLinks(props) {
    const classes = useStyles(props);
    const title = props.title;
    const content = props.content;
    const section = props.section;
    const date = props.date;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteNote = () => {
        props.deleteItem({id:props.id,subject:props.title,link:props.content,date:props.date});
    };

    return(
        <div className="linkCard m-2 p-3">
            <Markup content={"subject :"+title+""}/>
            {/* <br/> */}
            <Markup content={"links : "+content}/>
            {/* <br/> */}
            <Markup content={"section :"+section}/>
            {/* <br/> */}
            <Markup content={"date : "+date}/>
            {/* <br/> */}
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} 
                style={{border: "none",
                    outline:"none"}} className={classes.linkMenuButton}>
                <MoreVertIcon className={classes.linkMenuIcon}/>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={handleClose} className={classes.linkMenuItems}>Upload Attendence</MenuItem>
                <MenuItem onClick={handleClose} className={classes.linkMenuItems}>view Attendence</MenuItem>
            </Menu>
            <Button variant="contained" style={{border: "none",
                outline:"none"}} className={classes.linkDeleteButton}>
                <DeleteIcon className={classes.linkDeleteIcon}
                onClick={deleteNote}></DeleteIcon>
            </Button>
        </div>
    )
}

export default PostedLinks;
