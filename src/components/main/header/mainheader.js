import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './../../../redux/actions/actions';
import bg from './bg.jpg';

MainHeader.propTypes = {

};

function MainHeader(props) {
    const { users, onGetCurrentUser, onLogoutUser } = props;
    const [user, setuser] = useState({});
    const [role, setrole] = useState("ROLE_USER");
    // const role = JSON.parse(localStorage.getItem('token')) || null;
    // console.log(role.roles[0]);
    const viewUsers = () => (
        <ul className="nav navbar-nav">
            <li className="active1"><Link to="/">Home</Link></li>
            <li><Link to="/shop">Store</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/cart">Cart</Link></li>
        </ul>
    )

    const viewAdmin = () => (
        <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Home</Link></li>
            <li><Link to="/shop">Store</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/admin">Admin Page</Link></li>
        </ul>
    )
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('token'));
        setuser(user);
        onGetCurrentUser(user);
        if (user) {
            const role = user.roles[0];
            setrole(role);
        }

    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('token'));
        if (user) {
            const role = user.roles[0];
            setrole(role);
        }
    }, [role]);

    const onLogout = () => {
        localStorage.removeItem('token');
        onLogoutUser();
        setrole("ROLE_USER");
    }

    return (
        <div>
            <nav className="navbar navbar-inverse bg-header">
                <div className="container-fluid">
                    <div className="navbar-header flex-header">
                        {/* <a className="navbar-brand" href="#">WebSiteName</a> */}
                        <Link to="/"><img id="logo" src={bg} alt="" /></Link>
                        {role == "ROLE_ADMIN" ? viewAdmin() : viewUsers()}
                        <ul className="nav navbar-nav navbar-right">
                            {users && users.username ? (
                                <>
                                    <p>{users.roles[0]}</p>
                                    <li onClick={onLogout}><Link to="/"><span className="glyphicon glyphicon-log-out" /> Logout</Link></li>
                                </>
                            ) : (
                                    <>
                                        <li><Link to="/signup"><span className="glyphicon glyphicon-user" /> Sign Up</Link></li>
                                        <li><Link to="/login"><span className="glyphicon glyphicon-log-in" /> Login</Link></li>
                                    </>
                                )}

                        </ul>

                    </div>

                </div>
            </nav>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDistchPatchToProps = dispatch => {
    return {
        onGetCurrentUser: (user) => {
            dispatch(actions.getUsers(user));
        },
        onLogoutUser: () => {
            dispatch(actions.logout())
        }
    }

}

export default connect(mapStateToProps, mapDistchPatchToProps)(MainHeader);