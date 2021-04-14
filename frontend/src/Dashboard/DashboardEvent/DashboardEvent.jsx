import React, { useState, useEffect } from 'react';
import moment from "moment";
import './DashboardEvent.scss';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import { Button, makeStyles } from '@material-ui/core';
import DashboardAddEventArea from './DastboardAddEventArea/DastboardAddEventArea';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';
import { BaseUrl } from '../../App.jsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Token from '../../secret_key';
const useStyles = makeStyles({

})

function DashboardEvent(props) {
    const useStyles2 = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }));
    const classes2 = useStyles2();
    const [visAlert, setVisAlert] = useState(false);
    const H = useHistory();
    const [onCLickDay, setOnClickDay] = useState("");
    const [showAddEvent, setshowAddEvent] = useState(false);
    const [onAddEvent, setOnAddEvent] = useState(false);
    const [calander, setcalander] = useState([]);
    const [value, setValue] = useState(moment());
    const startDay = value.clone().startOf("month").startOf('week');
    const endDay = value.clone().endOf("month").endOf('week');
    let [eventDays, setEventDays] = useState({})
    let [msg, setmsg] = useState({ "EventName": "", "EventDescription": "" })
    /* const state = useSelector(state => state.DashboardEvent); */
    const state1 = useSelector(state => {
        if (props.type === "student") {
            return state.signin;
        }
        if (props.type === "teacher") {
            return state.teachersignin;
        }
    });
    // const state1 = useSelector(state => state.teachersignin);
    const dispatch = useDispatch();
    useEffect(async () => {
        dispatch({ 'type': "request_DashboardEvent" });
        try {
            const data = await axios({
                method: 'post',
                url: BaseUrl + 'EventsBlog/',
                headers: { "Authorization": `token ${Token}` },
                data:{token:localStorage.getItem("token"),"type":props.type},
                responseType: 'json',
            });
            dispatch({ 'type': "success_DashboardEvent", payload: data.data });
            let values = {}
            for (let i of data.data) {
                values[i.Event_on] = { ...i };
            }
            // console.log(values["kk"]);
            console.log(values["2021-01-28"]);
            setEventDays(values);
        }
        catch {
            dispatch({ 'type': "error_DashboardEvent", payload: "" });
            H.push('/error');
        }
    }, [onAddEvent]);

    useEffect(() => {
        const a = [];
        const day = startDay.clone().subtract(1, "day");
        while (day.isBefore(endDay, "day")) {
            a.push(
                Array(7).fill(0).map(() =>
                    day.add(1, "day").clone()
                )
            )
        }
        setcalander(a);
    }, [value]);

    const closeAddEvent = () => setshowAddEvent(false);

    const isToday = (day) => {
        return day.isSame(new Date(), "day");
    }

    const afterDay = (day) => {
        return day.isSameOrAfter(new Date(), "day");
    }

    const beforeToday = (day) => {
        return day.isBefore(new Date(), "day");
    }

    const isSelected = (day) => {
        return value.isSame(day, "day");
    }

    const afterMonth = (day) => {
        return value.isBefore(day, "month");
    }
    const beforeMonth = (day) => {
        return value.isAfter(day, "month");
    }

    const dayStyles = (day) => {
        if (isSelected(day)) {
            return "selected"
        }
        if (afterMonth(day) || beforeMonth(day)) {
            return "beforeMonth"
        }
        if (isToday(day)) {
            return "today"
        }
    }
    const useStyles1 = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));
    const onAddEventFunc = async (day, title, event) => {
        try {
            const info = { "Event_on": day, "EventName": title, "EventDescription": event ,token:localStorage.getItem("token")};
            const data = await axios({
                method: "post",
                url: BaseUrl + "AddEvents/",
                headers: { "Authorization": `Token ${Token}` },
                data: info,
                responseType: "json"
            });
            console.log(data.data);
            setOnAddEvent((pre) => !pre);
        }
        catch {
            H.push('/error');
        }
        console.log(day);
    }
    const currentMonthName = () => value.format("MMMM");
    const currentYearName = () => value.format("YYYY");
    const prevYear = () => value.clone().subtract(1, "year");
    const prevMonth = () => value.clone().subtract(1, "month");
    const nextMonth = () => value.clone().add(1, "month");
    const nextYear = () => value.clone().add(1, "year");
    const headerContent = `${currentMonthName()} ${currentYearName()}`;

    const isEvent = (day) => {
        let date = String(day._d.getDate());
        let dayy = Number(day._d.getMonth()) + 1;
        if (date.length < 2) {
            date = "0" + date;
        }
        if (String(dayy).length < 2) {
            dayy = "0" + dayy;
        }
        const str = day._d.getFullYear() + "-" + dayy + "-" + date;
        return str;
    }
    const classes1 = useStyles1();
    return (
        <React.Fragment style={{ width: "100%" }}>
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
            <div style={{ visibility: (state1.loading) ? "hidden" : "visible" }}>
                <div className={classes2.root}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography  className={classes2.heading}>Note ⬇️</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                please click on the highlighted button for event name 
                                if you are a teacher then click on upcoming days button for 
                                adding events
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div style={{ position: "sticky", top: 0 }}>
                    <Alert severity="info" style={{ visibility: (visAlert) ? "visible" : "hidden" }}>
                        <AlertTitle style={{ textTransform: "uppercase" }}>{msg.EventName}</AlertTitle>
                        {msg.EventDescription} — <strong>check it out!</strong>
                    </Alert>
                </div>
                {showAddEvent ? <div className="dashboardEventBackDrop" onClick={closeAddEvent}></div> : null}
                <h1 className="dashboardEventHeading">Events!</h1>
                <div className="dashboardEvent m-auto">
                    <div className="dashboardEventHeader">
                        <div className="mt-auto mb-auto">
                            <Button onClick={() => { setValue(prevYear()) }}
                            ><FastRewindIcon /></Button>
                        </div>
                        <div className="mt-auto mb-auto">
                            <Button onClick={() => { setValue(prevMonth()) }}
                            ><ArrowBackIosIcon /></Button>
                        </div>
                        <div className="ml-auto mt-3 mb-auto p-0" style={{ display: "inline-block", textAlign: "center" }}>
                            <p>
                                {headerContent}
                            </p>
                        </div>
                        <div className="ml-auto mt-auto mb-auto">
                            <Button onClick={() => { setValue(nextMonth()) }}
                            ><ArrowForwardIosIcon /></Button>
                        </div>
                        <div className="mt-auto mb-auto">
                            <Button onClick={() => { setValue(nextYear()) }}
                            ><FastForwardIcon /></Button>
                        </div>
                    </div>
                    <div>
                        <div className="dayNames">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
                                <div className="eachDayNmae">{dayName}</div>
                            ))}
                        </div>
                        {
                            calander.map((week) => (
                                <div>
                                    {
                                        week.map((day) => (
                                            <div className="day" style={{ background: (eventDays[isEvent(day)] != undefined) ? "#00b01d" : "#94eb6c" }}
                                                onClick={() => {
                                                    setmsg({ ...eventDays[isEvent(day)] });
                                                    console.log(day);
                                                    if (eventDays[isEvent(day)] != undefined) {
                                                        setValue(day);
                                                        setVisAlert(true);
                                                    }
                                                    else if (afterDay(day) && props.type === "teacher") {
                                                        setVisAlert(false);
                                                        setOnClickDay(isEvent(day));
                                                        // setValue({"EventName":"","EventDescription":""});
                                                        setshowAddEvent(true);
                                                    }
                                                    else {
                                                        setVisAlert(false);
                                                        // setValue({"EventName":"","EventDescription":""});   
                                                    }
                                                }}
                                            >
                                                <div className={dayStyles(day)}>
                                                    {
                                                        day.format("D").toString()
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>)
                            )
                        }
                    </div>
                    <div className="dashboardAddEventAreaForm">
                        <DashboardAddEventArea
                            type={props.type}
                            day={onCLickDay}
                            showAddEvent={showAddEvent}
                            closeAddEvent={closeAddEvent}
                            addEvent={onAddEventFunc} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DashboardEvent;
