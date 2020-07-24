import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
export default class RegisterStudent extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        phonenumber:"",
        city: "",
        country: "",
        gender: "",
    }
    addStudent = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    newStudent = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/student',
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
                <form className="col-6 m-5 align-center text-light bg-dark p-3" method="POST" onSubmit={this.newStudent}>
                    <h3>Student Sign Up</h3>

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.addStudent} name="name" />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.addStudent} name="email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.addStudent} name="password"/>
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" className="form-control" placeholder="Phone Number" value={this.state.phonenumber} onChange={this.addStudent} name="phonenumber" />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" placeholder="City" value={this.state.city} onChange={this.addStudent} name="city"/>
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input type="text" className="form-control" placeholder="Country" value={this.state.country} onChange={this.addStudent} name="country"/>
                    </div>
                    <div className="form-group">
                        <label className="form-check-inline">Gender</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="exampleRadios1" onChange={this.addStudent} name ="gender" value="Male" />
                            <label className="form-check-label" >
                                Male
                        </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="exampleRadios2" onChange={this.addStudent} name="gender" value="Female" />
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

