import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import RegisterStudent from "./views/RegisterStudent"
import LoginStudent from "./views/LoginStudent";
import RegisterTeacher from "./views/RegisterTeacher";
import LoginTeacher from "./views/LoginTeacher";
import Courses from "./views/Courses";
import Registration from "./views/Registration";
import Coursest from './views/Coursest';
import AddCourses from './views/AddCourses';
import RegisteredCourse from './views/RegisteredCourse';
function App() {
    return (<Router>
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light float-right ">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul class="nav flex-column">
                            <li className="nav-item ">
                                <Link className="nav-link text-light" to={"/sign-in-student"}>Student Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to={"/sign-up-student"}>Student Sign up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to={"/sign-in-teacher"}>Teacher Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to={"/sign-up-teacher"}>Teacher Sign up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to={"/courses"}>Course List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to={"/registration"}>Registrations</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to={"/coursest"}>My Courses(Teacher)</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to={"/addcourses"}>Add Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to={"/coursess"}>My Courses(Student)</Link>
                            </li>
                        </ul>

                    </div>    
                </div>
            </nav>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Switch>
                        <Route exact path='/' component={LoginStudent} />
                        <Route path="/sign-in-student" component={LoginStudent} />
                        <Route path="/sign-up-student" component={RegisterStudent} />
                        <Route path="/sign-in-teacher" component={LoginTeacher} />
                        <Route path="/sign-up-teacher" component={RegisterTeacher} />
                        <Route path="/courses" component={Courses} />
                        <Route path="/registration" component={Registration} />
                        <Route path="/coursest" component={Coursest} />
                        <Route path="/addcourses" component={AddCourses} />
                        <Route path="/coursess" component={RegisteredCourse} />
                    </Switch>
                </div>
            </div>
        </div>
    </Router>
    );
}

export default App;


