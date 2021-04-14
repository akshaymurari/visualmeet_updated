import React, { useState, useEffect } from 'react';
import axios from 'axios';
//npm install react-chartjs-2 chart.js --save
import { Bar, Line, Pie } from 'react-chartjs-2';
import './DashboardAttendence.scss'
import { BaseUrl } from '../../App.jsx';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Token from '../../secret_key';

function DashboardAttendence() {
    let state = useSelector(state => state.signin);
    let dispatch = useDispatch();
    const [values, setvalues] = useState([]);
    const [onsignin, setonsignin] = useState(false);
    const [onsubjects, setonsubjects] = useState(true);
    const [section, setsection] = useState("");
    const H = useHistory();
    let [studentAttendenceDetailes, setstudentAttendenceDetailes] = useState({
        subjectName: ["math"],
        classsesAttended: [1],
        classesTaken: [1],
    });
    const [attendanceCount, setattendanceCount] = useState({
        totalNumberOfClassesAttended: "",
        totalNumberOfClassesConducted: ""
    });

    let [totalAttendancePercentage, settotalAttendancePercentage] = useState(
        ((attendanceCount.totalNumberOfClassesAttended / attendanceCount.totalNumberOfClassesConducted) * 100).toPrecision(4)
    );
    console.log(attendanceCount);
    totalAttendancePercentage = ((attendanceCount.totalNumberOfClassesAttended / attendanceCount.totalNumberOfClassesConducted) * 100).toPrecision(4)
    console.log(studentAttendenceDetailes);
    useEffect(async () => {
        // event.preventDefault();
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl + `attendpercentage/`,
                headers: { 'Authorization': `Token ${Token}` },
                responseType: 'json',
                data: { token: localStorage.getItem("token"), type: "student" }
            })
            console.log(data.data);
            setattendanceCount({ totalNumberOfClassesAttended: data.data["total_classes_attended"], totalNumberOfClassesConducted: data.data["total_classes"] })
            console.log(totalAttendancePercentage);
            // settotalAttendancePercentage(((attendanceCount.totalNumberOfClassesAttended  / attendanceCount.totalNumberOfClassesConducted)));
        }
        catch {
            console.log("error");
        }
    }, []);

    useEffect(async () => {
        if(onsignin){
            try{
                const data = await axios({
                    method:"get",
                    url:BaseUrl+`getSubjects`,
                    headers: { 'Authorization': `Token ${Token}` },
                    responseType:'json'
                })
                console.log(data.data);
                // setattendanceCount({totalNumberOfClassesAttended:data.data["total_classes_attended"],totalNumberOfClassesConducted:data.data["total_classes"]})
                // console.log(totalAttendancePercentage);
                // settotalAttendancePercentage(((attendanceCount.totalNumberOfClassesAttended / attendanceCount.totalNumberOfClassesConducted) * 100).toPrecision(4));
                console.log("erssjs");
                setstudentAttendenceDetailes((pre)=>({...pre,"subjectName":data.data}))
                setonsubjects((pre)=>!pre);
            }
            catch{
                console.log("error");
            }   
        }
    },[]);
    // console.log("hiiiiiiiiiiiii")
    // console.log(studentAttendenceDetailes);
    // const [subjectU,setsubjectU] = useState();
    useEffect(async () => {
        let a = [], b = [], c=[];
        try {
            const data = await axios({
                method: "post",
                url: BaseUrl + `getsubjects/`,
                headers: { 'Authorization': `Token ${Token}` },
                data: { token: localStorage.getItem("token"), type: "student" },
                responseType: 'json'
            })
            console.log(data.data);
            studentAttendenceDetailes.subjectName = data.data;
            await studentAttendenceDetailes.subjectName.map(async (subject) => {
                subject = subject.subject
                const info = { "section": section, "subject": subject, "token": (localStorage.getItem("token")),type: "student"}
                try {
                    const data = await axios({
                        method: "post",
                        url: BaseUrl + `subWiseAttendance/`,
                        headers: { 'Authorization': `Token ${Token}` },
                        data: info,
                        responseType: 'json'
                    })
                    console.log(data.data);
                    a.push(data.data["classsesAttended"]);
                    b.push(data.data["classesTaken"]);
                    c.push(subject);
                    setstudentAttendenceDetailes((pre)=>({ subjectName: c, classsesAttended: a, classesTaken: b }));
                    // setattendanceCount({totalNumberOfClassesAttended:data.data["total_classes_attended"],totalNumberOfClassesConducted:data.data["total_classes"]})
                    // console.log(totalAttendancePercentage);
                    // settotalAttendancePercentage(((attendanceCount.totalNumberOfClassesAttended / attendanceCount.totalNumberOfClassesConducted) * 100).toPrecision(4));
                    // console.log("erssjs");
                    //         // setstudentAttendenceDetailes((pre)=>({...pre,"subjectName":data.data}))
                }
                catch {
                    // console.log("error");
                }
            });
            console.log(a,b)
        }
        catch {
            console.log("error");
        }
    }, []);

    return (
        <>
            {/* <div> */}
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
            <div style={{ backgroundColor: "white", textAlign: "center", visibility: (state.loading) ? "hidden" : "visible" }}>
                <h1 style={{ margin: "auto" }} className="dashboardAttendanceHeader">Attendence</h1>
                <p style={{ fontSize: "2rem" }}>Total Attendence Percetange: <span style={{
                    fontWeight: "900",
                    marginBottom: "1rem",
                }}>{totalAttendancePercentage}%</span></p>
                <div style={{ marginBottom: "3rem" }}>
                    <p>Total Number of classes Attended: <span style={{
                        fontWeight: "900"
                    }}>{attendanceCount.totalNumberOfClassesAttended}</span></p>
                    <p>Total Number of classes Conducted: <span style={{
                        fontWeight: "900"
                    }}>{attendanceCount.totalNumberOfClassesConducted}</span></p>
                </div>
                <hr class="separator separator--dots" />
                <p style={{ fontSize: "2rem" }}>Subject Wise Attendence Bar Graph</p>
                <div style={{ maxHeight: "70vh", minHeight: "70vh" }}>
                    <Bar
                        height={400}
                        width={100}
                        data={{
                            labels: studentAttendenceDetailes.subjectName,
                            datasets: [
                                {
                                    label: "Number of classes Attended",
                                    data: studentAttendenceDetailes.classsesAttended,
                                    backgroundColor: new Array(studentAttendenceDetailes.classsesAttended.length).fill("rgb(219, 242, 242, 0.3)"),
                                    borderColor: new Array(studentAttendenceDetailes.classsesAttended.length).fill("#66C9C9"),
                                    borderWidth: 1,
                                },
                                {
                                    label: "Number of classes Conducted",
                                    data: studentAttendenceDetailes.classesTaken,
                                    backgroundColor: new Array(studentAttendenceDetailes.classsesAttended.length).fill("rgb(255, 245, 221, 0.3)"),
                                    borderColor: new Array(studentAttendenceDetailes.classsesAttended.length).fill("#FFD46F"),
                                    borderWidth: 1,
                                }
                            ]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            },
                            legend: {
                                display: true,
                                labels: {
                                    fontColor: 'rgb(0, 0, 0)'
                                }
                            },
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default DashboardAttendence;
