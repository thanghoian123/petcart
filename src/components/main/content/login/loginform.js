import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import callAPI from '../../../../CallApi';
import './style.css';


LoginForm.propTypes = {

};

function LoginForm(props) {
    const{history} = props;
    const [currentUser, setcurrentUser] = useState({
        "username": "",
        "password": "",
        "isRedirect" : false
    });

    const onHandleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setcurrentUser({ ...currentUser, [name]: value })
    }

    const onHandleSubmit =(e) =>{
        e.preventDefault();
        callAPI('auth/signin', 'POST', currentUser).then(res => {
            if(res && res.data){
                localStorage.setItem('token', JSON.stringify(res.data));
                setcurrentUser({...currentUser,isRedirect:true})
            }else{
                alert('username or password is incorrect!!')
            }
           
        })    
    }

    if(currentUser.isRedirect){
        return(
            <Redirect to="/"/>
        )
    }

    return (
        <div className="container">
            <div className="omb_login">
                <h3 className="omb_authTitle">Login or <Link to="/signup">Sign up</Link></h3>
                <div className="row omb_row-sm-offset-3 omb_socialButtons">
                    <div className="col-xs-4 col-sm-2">
                        <a href="#" className="btn btn-lg btn-block omb_btn-facebook">
                            <i className="fa fa-facebook visible-xs" />
                            <span className="hidden-xs">Facebook</span>
                        </a>
                    </div>
                    <div className="col-xs-4 col-sm-2">
                        <a href="#" className="btn btn-lg btn-block omb_btn-twitter">
                            <i className="fa fa-twitter visible-xs" />
                            <span className="hidden-xs">Twitter</span>
                        </a>
                    </div>
                    <div className="col-xs-4 col-sm-2">
                        <a href="#" className="btn btn-lg btn-block omb_btn-google">
                            <i className="fa fa-google-plus visible-xs" />
                            <span className="hidden-xs">Google+</span>
                        </a>
                    </div>
                </div>
                <div className="row omb_row-sm-offset-3 omb_loginOr">
                    <div className="col-xs-12 col-sm-6">
                        <hr className="omb_hrOr" />
                        <span className="omb_spanOr">or</span>
                    </div>
                </div>
                <div className="row omb_row-sm-offset-3">
                    <div className="col-xs-12 col-sm-6">
                        <form className="omb_loginForm" onSubmit={onHandleSubmit} >
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user" /></span>
                                <input onChange={onHandleChange} type="text" className="form-control" name="username" placeholder="Username" />
                            </div>
                            <span className="help-block" />
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock" /></span>
                                <input onChange={onHandleChange} type="password" className="form-control" name="password" placeholder="Password" />
                            </div>
                            <span className="help-block">Password error</span>
                            <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                        </form>
                    </div>
                </div>
                <div className="row omb_row-sm-offset-3">
                    <div className="col-xs-12 col-sm-3">
                        <label className="checkbox">
                            <input type="checkbox" defaultValue="remember-me" />Remember Me
                    </label>
                    </div>
                    <div className="col-xs-12 col-sm-3">
                        <p className="omb_forgotPwd">
                            <a href="#">Forgot password?</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LoginForm;