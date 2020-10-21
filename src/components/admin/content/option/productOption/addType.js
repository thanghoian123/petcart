import React from 'react';
import Footer from '../../footer';
import TypeOptionForm from '../../form/typeOptionForm';
import Header from '../../header';
import Sidebar from '../../sidebar';

function AddType(props) {
    return (
        <div>
           <Header/>
            <Sidebar/>
            <TypeOptionForm/>
            <Footer/> 
        </div>
    );
}

export default AddType;