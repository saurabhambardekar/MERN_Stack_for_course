import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
export default class RegisteredCourse extends Component {
    state = {
        course: null
    }
    componentDidMount() {
        const name = "Abhay"
        axios.get(`http://localhost:5000/api/register/course/${name}`)
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
            <div>
                <table class="table table-dark col-8 m-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Teacher Name</th>
                            <th scope="col">Date of Registration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.course && this.state.course.map((s, i) => {
                            return (
                                <tr>
                                    <th scope="row">{i}</th>
                                    <td>{s.coursename}</td>
                                    <td>{s.teachername}</td>
                                    <td>{s.register_date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        )
    }

}