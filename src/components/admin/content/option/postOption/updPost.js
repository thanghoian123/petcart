import React, { useEffect, useState } from 'react';
import Header from '../../header';
import Footer from '../../footer';
import Sidebar from '../../sidebar';
import OptionForm from '../../form/postOptionForm';
import callAPI from '../../../../../CallApi';


function UpdPost(props) {
    const { match } = props;
    const [currentPost, setCurrentPost] = useState({
        id:'',
        title: '',
        content: '',
        imgUrl: ''
    });

    useEffect(() => {
        if (!match) return;
        const id = match.params.id;
        callAPI(`news/search?id=${id}`, 'GET', null).then(res => {
            setCurrentPost(res.data)
        })
    }, [match]);

    return (
        <div>
            <Header />
            <Sidebar />
            <OptionForm currentPost={currentPost}/>
            <Footer />
        </div>
    );
}

export default UpdPost;