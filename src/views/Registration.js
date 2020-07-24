import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
export default class Registration extends Component {
    state = {
        register: null
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/register')
            .then(response => {
                this.setState({
                    register: response.data
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
                            <th scope="col">Student</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.register && this.state.register.map((s, i) => {
                            return (
                                <tr>
                                    <th scope="row">{i}</th>
                                    <td>{s.coursename}</td>
                                    <td>{s.teachername}</td>
                                    <td>{s.studentname}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        )
    }

}