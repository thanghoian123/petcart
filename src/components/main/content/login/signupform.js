import React, { useEffect, useState } from 'react';
import callAPI from '../../../../CallApi';

function SignUpForm(props) {
    const [userSign, setUserSign] = useState({
        "username": "",
        "fullname": "",
        "password": "",
        "password_confirmation": ""
    });

    const onHandleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserSign({ ...userSign, [name]: value })
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        if (userSign.password != userSign.password_confirmation) {
            alert('mat khau khong trung');
            return;
        }
        const userClone = {
            "username": userSign.username,
            "fullname": userSign.fullname,
            "password": userSign.password
        }
        callAPI('auth/signup', 'POST', userClone).then(res => {
            alert(res.data.message)
        })
        setUserSign({
            "username": "",
            "fullname": "",
            "password": "",
            "password_confirmation": ""
        })
    }
    return (
        <div>
            <h2>sign up</h2>
            <div className="container">
                <div className="row centered-form">
                    <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Please sign up for Bootsnipp <small>It's free!</small></h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={onHandleSubmit}>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <input onChange={onHandleChange} type="text" name="fullname" className="form-control input-sm" placeholder="Full name" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <input onChange={onHandleChange} type="text" name="username" className="form-control input-sm" placeholder="Username" />
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <input onChange={onHandleChange} type="password" name="password" id="password" className="form-control input-sm" placeholder="Password" />
                                            </div>
                                        </div>
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <input onChange={onHandleChange} type="password" name="password_confirmation" id="password_confirmation" className="form-control input-sm" placeholder="Confirm Password" />
                                            </div>
                                        </div>
                                    </div>
                                    <input type="submit" defaultValue="Register" className="btn btn-info btn-block" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SignUpForm;