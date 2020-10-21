import React from 'react';
import Content from '../content/option/ShowTable';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AddPro from '../content/option/productOption/addProduct';
import UpdPro from '../content/option/productOption/updProduct';


Admin.propTypes = {

};

function Admin(props) {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact><Content /></Route>                  
                </Switch>
            </Router>

        </div>
    );
}

export default Admin;