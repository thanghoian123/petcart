import React from 'react';
import Header from '../../header';
import Footer from '../../footer';
import Sidebar from '../../sidebar';
import OptionForm from '../../form/postOptionForm';

function AddPost(props) {
    return (
        <div>
            <Header/>
            <Sidebar/>
            <OptionForm/>
            <Footer/>
        </div>
    );
}

export default AddPost;