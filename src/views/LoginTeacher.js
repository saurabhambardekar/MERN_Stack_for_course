import React, { Component } from 'react';
import "axios";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
export default class LoginStudent extends Component {
    state = {
        email: "",
        password: "",
        res: ""
    }
    teacherLogin = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    checkTeacher = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/authTeacher',
            headers: { 'content-type': 'application/json' },
            data: {
                email: this.state.email,
                password: this.state.password,
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
                <form className="col-6 m-5 align-center text-light bg-dark p-3" method="POST" onSubmit={this.checkTeacher}>
                    <h3>Teacher Login</h3>

                    <div className="form-group" >
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.teacherLogin} required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.teacherLogin} required />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        );
    }
}
  