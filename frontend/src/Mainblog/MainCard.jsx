import React from 'react'
import {Link} from 'react-router-dom'
// import './Mainblog.scss'
import attendance from '../assets/attendance.jpg'
const MainCard = (props) => {
    console.log(props);
    return (
        <>
            <div className="card MainCard h-100 mt-5 ml-auto rounded-lg shadow" style={{"width": "12rem"}}>
                <img src="" className="card-img-top img-responsive" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p clasName="card-text">{props.info}</p>
                    <Link to={props.link} className="btn btn-primary">click to view...</Link>
                </div>
            </div>
        </>
    )
}

export default MainCard
