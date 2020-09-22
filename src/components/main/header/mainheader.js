import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

MainHeader.propTypes = {

};

function MainHeader(props) {
    return (
        <div>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">WebSiteName</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Home</a></li>
                        <li><a href="#">Page 1</a></li>
                        <li><a href="#">Page 2</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/signup"><span className="glyphicon glyphicon-user" /> Sign Up</Link></li>
                        <li><Link to="/login"><span className="glyphicon glyphicon-log-in" /> Login</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default MainHeader;