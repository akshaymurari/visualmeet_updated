import React from 'react';
import icon from '../assets/icon.png';

function ClassLinksHeader(props) {
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={icon} width="40" height="40" alt="" style={{ borderRadius: '10px' }}></img>
                    </a>
                    <a className="navbar-brand" href="#">VISUAL MEET</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mr-3">
                            <li class="nav-item">
                                 <button style={{ color: "#fff", fontSize: "1.3rem", background: "transparent", outline:"none", border: "none"}} className="mr-3" onClick={props.open}>NewLink</button>
                            </li>
                            <li className="nav-item">
                                <a className="ml-auto mr-3" href="/SignUp" style={{ color: "#fff" }}>
                                    <button type="button" className="btn btn-outline-danger ml-2"><span>LOGOUT</span></button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default ClassLinksHeader;
