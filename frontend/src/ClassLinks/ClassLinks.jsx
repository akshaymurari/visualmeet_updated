import React, {useState} from 'react';
import "./ClassLinks.scss";
import { Link } from 'react-router-dom';
import icon from '../assets/icon.png';
import {useParams} from 'react-router';
import {useHistory} from 'react-router-dom';
import NewLink from './NewLink/NewLink';
import PostedLinks from './PostedLinks/PostedLinks';
import ClassLinksHeader from './ClassLinksHeader';
import { Button, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Modal from 'react-modal';

const useStyles = makeStyles({
    addLink: {
        borderRadius: "50%",
        width: "3rem",
        height: "4rem",
        color: "#cad315",
        backgroundColor: "#f2f4c0",
        position: "absolute",
        bottom: "2rem",
        right: "2rem" 
    },
    addIconLink: {
        fontSize: "3rem"
    }
});

function ClassLinks(props) {
    const classes = useStyles(props);
    const [modelOpen, setmodelOpen] = useState(false);
    const [link, setlink] = useState();
    const [classLink, setclassLink] = useState([]);

    const closeModel = () => setmodelOpen(false);

    const openModel = () => setmodelOpen(true);

    const addClassLink = (newLink) => {
        const tempLink = {
            title: "<h1>ahsdjsadhk</h1>",
            content: "<p>Heloasdasd</p>",
            section:"<p>Heloasdasd</p>",
            date:"<p>Heloasdasd</p>"
        }
        console.log(newLink);
        console.log(classLink);
        
        setclassLink((prevData)=>{
            return [...prevData, newLink]
        })
        console.log(classLink);
    }

    const onDelete = (id) => {
        console.log(id);
        setclassLink((prevData) => 
            prevData.filter((curData, idx) => {
                if(idx===id["id"]){
                    console.log("yo!")
                }
                return idx!==id["id"];
            })
        )
    }

    return (
        <div className="linkBackground d-block" style={{position:"relative", alignItems:"center"}}>
            <ClassLinksHeader open={openModel}></ClassLinksHeader>
            <h1 style={{textAlign: "center"}} className="linkHeading">Class Links:</h1>
            <div className="linksArea">
                {classLink.map((val, idx) => {
                    return (
                        <PostedLinks
                            key={idx}
                            id={idx}
                            title={val.title}
                            content={val.content}
                            section={val.section}
                            date={val.date}
                            deleteItem = {onDelete}
                        ></PostedLinks>
                    )
                })}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Button className={classes.addLink} style={{border:"none", outline:"none"}}
                onClick={openModel}>
                <AddIcon className={classes.addIconLink}></AddIcon>
            </Button>
            {modelOpen? <div style={{width: "100vw", height: "100vh", position: "fixed", top: "0px", backgroundColor: "rgba(0,0,0,0.5)"}} onClick={closeModel}></div>:null}
            <NewLink show={modelOpen} close={closeModel} addLink = {addClassLink}></NewLink>
        </div>
    )
}

export default ClassLinks;
