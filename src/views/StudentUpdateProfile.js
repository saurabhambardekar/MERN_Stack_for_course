import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
export default class RegisterStudent extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        phonenumber: "",
        city: "",
        country: "",
        gender: "",
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/courses/')
            .then(response => {
                this.setState({
                    courset: response.data
                })
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }
    addTeacher = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }
    newTeacher = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/teacher',
            headers: { 'content-type': 'application/json' },
            data: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phonenumber: this.state.phonenumber,
                city: this.state.city,
                country: this.state.country,
                gender: this.state.gender,
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
                <form className="col-6 m-5 align-center text-light bg-dark p-3" method="POST" onSubmit={this.newTeacher}>
                    <h3>Teacher Sign Up</h3>

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.addTeacher} name="name" />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.addTeacher} name="email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.addTeacher} name="password" />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" className="form-control" placeholder="Phone Number" value={this.state.phonenumber} onChange={this.addTeacher} name="phonenumber" />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" placeholder="City" value={this.state.city} onChange={this.addTeacher} name="city" />
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input type="text" className="form-control" placeholder="Country" value={this.state.country} onChange={this.addTeacher} name="country" />
                    </div>
                    <div className="form-group">
                        <label className="form-check-inline">Gender</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="Radio1" onChange={this.addTeacher} name="gender" value="Male" />
                            <label className="form-check-label" >
                                Male
                        </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="Radio2" onChange={this.addTeacher} name="gender" value="Female" />
                            <label className="form-check-label" >
                                Female
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </form>

            </div>
        );
    }
}