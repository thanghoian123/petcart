
import React, { useEffect, useState } from 'react';
import Header from '../../header';
import Footer from '../../footer';
import Sidebar from '../../sidebar';
import OptionForm from '../../form/productOptionForm';
import callAPI from '../../../../../CallApi';



function UpdPro(props) {
    const { match } = props;
    const [currentProd, setCurrentProd] = useState({
        id: '',
        title: '',
        price: 0,
        description: '',
        imgUrl: '',
        categoryCode: ''
    });
    useEffect(() => {
        if(!match) return;
        const id = match.params.id;
        callAPI(`product/search?id=${id}`, 'GET', null).then(res => {
            setCurrentProd(res.data)
        })
    }, [match]);

    // useEffect(() => {
    //     console.log(currentProd);
    // });
    return (
        <div>
            <Header />
            <Sidebar />
            <OptionForm currentProd={currentProd}/>
            <Footer />
        </div>
    );
}

export default UpdPro;

