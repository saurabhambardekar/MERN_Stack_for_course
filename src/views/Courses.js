import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
export default class Courses extends Component {
    state = {
        course:null
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/courses')
            .then(response => {
                this.setState({
                    course: response.data
                })
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }
    registerClass = (coursename,teachername) => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/register',
            headers: { 'content-type': 'application/json' },
            data: {
                coursename: coursename,
                teachername: teachername,
                studentname: "Abhay"
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
    }
    render() {
        return (
            <div>
                <table class="table table-dark col-8 m-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Teacher Name</th>
                            <th scope="col">Course Department</th>
                            <th scope="col">Course Details</th>
                            <th scope="col">Course Room</th>
                            <th scope="col">Waitlist Capacity</th>
                            <th scope="col">Register</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.course && this.state.course.map((s,i) => {
                            return (
                                <tr>
                                    <th scope="row">{i}</th>
                                    <td>{s.coursename}</td>
                                    <td>{s.teachername}</td>
                                    <td>{s.coursedepartment}</td>
                                    <td>{s.coursedetails}</td>
                                    <td>{s.courseroom}</td>
                                    <td>{s.waitlistCapacity}</td>
                                    <td><button id={s.coursename} className="btn-primary" onClick={() => { this.registerClass(s.coursename, s.teachername) }}>Register</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                
            </div>
        )
    }

}