
import React from 'react';
import Header from '../header';
import Footer from '../footer';
import Sidebar from '../sidebar';
import OptionForm from '../form/productOptionForm';



function AddPro(props) {
    return (
        <div>
            <Header/>
            <Sidebar/>
            <OptionForm/>
            <Footer/>
        </div>
    );
}

export default AddPro;