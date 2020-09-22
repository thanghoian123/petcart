import React from 'react';
import Header from '../header';
import Footer from '../footer';
import Sidebar from '../sidebar';
import Table from '../table';

function Content(props) {
    return (
        <div>
            <Header/>
            <Sidebar/>
            <Table/>
            <Footer/>
        </div>
    );
}

export default Content;