import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
export default class TeacherUpdateProfile extends Component {
    state = {
        name: "",
        email: "",
        phonenumber: "",
        aboutme: "",
        city: "",
        country: "",
        company: "",
        school: "",
        hometown: "",
        languages: "",
        gender: "",
        password: "",
        newpassword: ""
    }
    componentDidMount() {
        // hard coded to john@gmail.com
        const email = "john@gmail.com"
        axios.get(`http://localhost:5000/api/courses/teacher/${email}`)
            .then(response => {
                const { name, email, password, phonenumber, aboutme, city, country, company, school, hometown, languages, gender } = response.data.student
                this.setState({ name, email, password, phonenumber, aboutme, city, country, company, school, hometown, languages, gender })
                console.log(response.data.student)
            })
            .catch(error => {
                console.log(error);
            });
    }
    updateTeacher = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    changePassword = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    profUpdate = () => {
        axios({
            method: 'put',
            url: 'http://localhost:5000/api/courses/update',
            headers: { 'content-type': 'application/json' },
            data: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phonenumber: this.state.phonenumber,
                city: this.state.city,
                country: this.state.country,
                gender: this.state.gender,
                hometown: this.state.hometown,
                languages: this.state.languages,
                aboutme: this.state.aboutme,
                school: this.state.school
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
    passwordUpdate = () => {
        axios({
            method: 'put',
            url: 'http://localhost:5000/api/courses/update-pass',
            headers: { 'content-type': 'application/json' },
            data: {
                email: this.state.email,
                password: this.state.newpassword,
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
                <form className="col-6 m-5 align-center text-light bg-dark p-3" method="PUT" >
                    <h3>Teacher Profile</h3>

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.updateTeacher} name="name" readOnly />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.updateTeacher} name="email" readOnly />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" className="form-control" placeholder="Phone Number" value={this.state.phonenumber} onChange={this.updateTeacher} name="phonenumber" />
                    </div>
                    <div className="form-group">
                        <label>About Me</label>
                        <input type="text" className="form-control" placeholder="About Me" value={this.state.aboutme} onChange={this.updateTeacher} name="aboutme" />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" placeholder="City" value={this.state.city} onChange={this.updateTeacher} name="city" />
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input type="text" className="form-control" placeholder="Country" value={this.state.country} onChange={this.updateTeacher} name="country" />
                    </div>
                    <div className="form-group">
                        <label>Company</label>
                        <input type="text" className="form-control" placeholder="Company" value={this.state.company} onChange={this.updateTeacher} name="company" />
                    </div>
                    <div className="form-group">
                        <label>School</label>
                        <input type="text" className="form-control" placeholder="School" value={this.state.school} onChange={this.updateTeacher} name="school" />
                    </div>
                    <div className="form-group">
                        <label>Hometown</label>
                        <input type="text" className="form-control" placeholder="Hometown" value={this.state.hometown} onChange={this.updateTeacher} name="hometown" />
                    </div>
                    <div className="form-group">
                        <label>Languages</label>
                        <input type="text" className="form-control" placeholder="Languages" value={this.state.languages} onChange={this.updateTeacher} name="languages" />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <input type="text" className="form-control" placeholder="Gender" value={this.state.gender} onChange={this.updateTeacher} name="gender" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" onClick={this.profUpdate}>Update Profile</button>
                </form>
                <form className="col-6 m-5 align-center text-light bg-dark p-3" method="PUT">
                    <h3>Teacher Password Update</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.changePassword} name="email" readOnly />
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input type="text" className="form-control" placeholder="New Password" value={this.state.newpassword} onChange={this.changePassword} name="newpassword" />
                    </div>
                    <button type="submit" onClick={this.passwordUpdate} className="btn btn-primary btn-block">Update Password</button>
                </form>
            </div>
        );
    }
}
