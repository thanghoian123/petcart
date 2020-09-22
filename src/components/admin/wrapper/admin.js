import React from 'react';
// import PropTypes from 'prop-types';
// import Header from './header';
// import Sidebar from './sidebar';
// import Footer from './content/footer';
// import Table from './content/table';
// import OptionForm from './form/productOptionForm';
import Content from '../content/option/ShowTable';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AddPro from '../content/option/addProduct';
import UpdPro from '../content/option/updProduct';

Admin.propTypes = {

};

function Admin(props) {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact><Content /></Route>
                    <Route path="/addproduct" exact><AddPro/></Route>
                    <Route path="/updproduct" exact component={UpdPro}/>
                    <Route path="/updproduct/:id" exact component={UpdPro}/>
                </Switch>
            </Router>

        </div>
    );
}

export default Admin;