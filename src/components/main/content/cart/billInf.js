import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import callAPI from '../../../../CallApi';
import MainHeader from '../../header/mainheader';
import axios from 'axios';

function BillInf(props) {
    const styleTable = {
        width: '800px',
        margin: '0 auto'
    }
    const token = JSON.parse(localStorage.getItem('token')) || [];
    const [bills, setBills] = useState([]);
    useEffect(() => {
        var config = {
            method: 'get',
            url: `http://localhost:8081/api/bill/bill?username=${token.username}`,
            headers: {}
        };

        axios(config)
            .then(function (res) {
                setBills(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    console.log(bills);
    const eleTable = bills.map((item, index) => {
        return (
            <Table striped bordered hover key={index}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {(item.billDetail || []).map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{item.idProduct}</th>
                                <td>{item.nameProduct}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price} </td>
                            </tr>
                        )
                    })}
                    <tr key={index}>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td>Total : {item.total} </td>
                    </tr>
                </tbody>
            </Table>
        )
    })
    return (
        <div>
            <MainHeader />
            <div style={styleTable}>
                {eleTable}
            </div>
        </div>

    );
}

export default BillInf;