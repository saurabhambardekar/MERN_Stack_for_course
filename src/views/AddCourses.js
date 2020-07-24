import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
export default class AddCourses extends Component {
     state = {
        coursename: "",
        teachername: "John",
        coursedetails: "",
        coursedepartment: "",
        courseroom: "",
        waitlistCapacity: null
    }
    addCourse = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }
    newCourse = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/courses',
            headers: { 'content-type': 'application/json' },
            
            data: {
                coursename: this.state.coursename,
                teachername: this.state.teachername,
                coursedetails: this.state.coursedetails,
                coursedepartment: this.state.coursedepartment,
                courseroom: this.state.courseroom,
                waitlistCapacity: this.state.waitlistCapacity
            },
            withCredentials: true,

        })
            .then(res => {
                console.log(res)
                this.setState({ res: res.status })
            })
            .catch(err => {
                if (err) throw err
            })
        console.log(this.state)
    }
    render() {

        return (
            <div>
                <form className="col-6 m-5 align-center text-light bg-dark p-3" method="POST" onSubmit={this.newCourse}>
                    <h3>Add Courses</h3>

                    <div className="form-group">
                        <label>Course Name</label>
                        <input type="text" className="form-control" placeholder="Course Name" value={this.state.coursename} onChange={this.addCourse} name="coursename" />
                    </div>
                    <div className="form-group">
                        <label>Course Detail</label>
                        <input type="text" className="form-control" placeholder="Course Details" value={this.state.coursedetails} onChange={this.addCourse} name="coursedetails" />
                    </div>
                    <div className="form-group">
                        <label>Course Department</label>
                        <input type="text" className="form-control" placeholder="Course Department" value={this.state.coursedepartment} onChange={this.addCourse} name="coursedepartment" />
                    </div>
                    <div className="form-group">
                        <label>Course Room</label>
                        <input type="text" className="form-control" placeholder="Course Room" value={this.state.courseroom} onChange={this.addCourse} name="courseroom" />
                    </div>
                    <div className="form-group">
                        <label>Waitlist Capacity</label>
                        <input type="number" className="form-control" placeholder="Waitlist Capacity" value={this.state.waitlistCapacity} onChange={this.addCourse} name="waitlistCapacity" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </form>

            </div>
        );
    }
}
