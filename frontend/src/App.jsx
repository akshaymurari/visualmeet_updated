import React from 'react';
import {Switch,Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp/SignUp.jsx';
import SignIn from './SignIn/SignIn.jsx';
import Welcome from './Welcome/Welcome';
import TeacherSignIn from './TeacherSignIn/TeacherSignIn.jsx';
import TeacherSignUp from './TeacherSignUp/TeacherSignUp.jsx';
import Mainblog from './Mainblog/Mainblog.jsx';
import ForgotPassword from './forgotpass/forgotpass.jsx';
import DashboardAttendence from './Dashboard/DashboardAttendence/DashboardAttendence.jsx';
import Teacherblog from './teacherblog/teacherblog.jsx';
import {Provider} from 'react-redux';
import Store from './redux/store.jsx';
import Resetpass from './resetpass/Resetpass.jsx';
import Takeattendance from './takeattendance/takeattendance.jsx';
import ClassLinks from './ClassLinks/ClassLinks.jsx';
import ClassBlog from './ClassBlog/ClassBlog.jsx';
import StudentClassBlog from './StudentClassBlog/StudentClassBlog.jsx';
import QueryBlog from './QueryBlog/QueryBlog.jsx';
import NotificationBlog from './NotificationBlog/NotificationBlog.jsx';
import DashboardEvent from './Dashboard/DashboardEvent/DashboardEvent.jsx';
import QueryBlogChat from './QueryBlogChat/QueryBlogChat.jsx';
// import NotesBlog from './NotesBlog/NotesBlog.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';

export const BaseUrl="http://127.0.0.1:8000/";
const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={()=><Welcome/>}></Route>
        <Route exact path="/forgotpass" component={()=><Provider store={Store}><ForgotPassword type="student"/></Provider>}></Route>
        <Route exact path="/forgotpassteacher" component={()=><Provider store={Store}><ForgotPassword type="teacher"/></Provider>}></Route>
        <Route exact path="/resetpass" component={()=><Provider store={Store}><Resetpass type="student"/></Provider>}></Route>
        <Route exact path="/resetpassteacher" component={()=><Provider store={Store}><Resetpass type="teacher"/></Provider>}></Route>
        <Route exact path='/SignIn' component={()=><Provider store={Store}><SignIn/></Provider>}></Route>
        <Route exact path='/TeacherSignIn' component={()=><Provider store={Store}><TeacherSignIn/></Provider>}></Route>
        <Route exact path='/mainblog' component={()=><Provider store={Store}><Mainblog/></Provider>}></Route>
        <Route exact path='/Dashboard' component={()=><Provider store={Store}><Dashboard type="student"/></Provider>}></Route>
        <Route exact path='/teacherDashboard' component={()=><Provider store={Store}><Dashboard type="teacher"/></Provider>}></Route>
        <Route exact path='/DashboardAttendence' component={()=><Provider store={Store}><DashboardAttendence/></Provider>}></Route>
        <Route exact path='/teacherblog' component={()=><Provider store={Store}><Dashboard type="teacher"/></Provider>}></Route>
        <Route exact path='/ClassLinks' component={()=><Provider store={Store}><ClassLinks/></Provider>}></Route>
        <Route exact path='/ClassBlog' component={()=><Provider store={Store}><ClassBlog/></Provider>}></Route>
        <Route exact path="/StudentClassBlog" component={()=><Provider store={Store}><StudentClassBlog/></Provider>}></Route>
        <Route exact path='/takeattendance/:id/:username/:subject/:section/:time' component={()=><Provider store={Store}><Takeattendance/></Provider>}></Route>
        <Route exact path="/DashboardEvent" component={()=><Provider store={Store}><DashboardEvent type="student" /></Provider>}></Route>
        <Route exact path="/DashboardEventTeacher" component={()=><Provider store={Store}><DashboardEvent type="teacher"/></Provider>}></Route>
        <Route exact path="/teacherQueryBlog" component={()=><Provider store={Store}><QueryBlog type="teacher"/></Provider>}></Route>
        <Route exact path="/QueryBlog" component={()=><Provider store={Store}><QueryBlog type="student"/></Provider>}></Route>
        <Route exact path='/NotificationBlog' component={()=><Provider store={Store}><NotificationBlog type="student"></NotificationBlog></Provider>}></Route>
        <Route exact path='/teacherNotificationBlog' component={()=><Provider store={Store}><NotificationBlog type="teacher"></NotificationBlog></Provider>}></Route>
        <Route exact path="/QueryAnswerBlog/:title/:type" component={()=><Provider store={Store}><QueryBlogChat /></Provider>}></Route>
        {/* <Route exact path="/teacherQueryAnswerBlog/:title/:type" component={()=><Provider store={Store}><QueryBlogChat /></Provider>}></Route> */}
        {/* <Route exact path='/NotesBlog' component={()=><Provider store={Store}><NotesBlog></NotesBlog></Provider>}></Route> */}
        <Route exact path='/error' component={()=><h1>Error</h1>}/>
      </Switch>
    </>
  )
}
export default App;
