import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
export default class Coursest extends Component {
    state = {
        course: null
    }
    componentDidMount() {
        const name = "John"
        axios.get(`http://localhost:5000/api/courses/course/${name}`)
            .then(response => {
                this.setState({
                    course: response.data.course
                })
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    } 
    render() {
        return (
            <div className="row-top col-8 m-5">
                <table class="table table-dark ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Course Department</th>
                            <th scope="col">Course Details</th>
                            <th scope="col">Course Room</th>
                            <th scope="col">Waitlist Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.course && this.state.course.map((s, i) => {
                            return (
                                <tr>
                                    <th scope="row">{i}</th>
                                    <td>{s.coursename}</td>
                                    <td>{s.coursedepartment}</td>
                                    <td>{s.coursedetails}</td>
                                    <td>{s.courseroom}</td>
                                    <td>{s.waitlistCapacity}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        )
    }

}
