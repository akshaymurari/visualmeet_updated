import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./LoginCard.scss"
import { Collapse } from '@material-ui/core';

export default function MediaCard(props) {
  return (
    <Collapse in={props.checked} {...(props.checked ? { timeout: 1000 } : {})}>
      <div className="card logincard text-white bg-secondary shadow" style={{width: "18rem"}}>
        <div className="mag_img">
          <img className=" card-img-top" src={props.image} alt="Card image cap"></img>
        </div>
        <div className="card-body">
          <h1 role>{props.role}</h1>
          <p className="card-text desc">{props.desc}</p>
        </div>
      </div>
    </Collapse>
  );
} 