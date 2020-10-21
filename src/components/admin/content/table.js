import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/actions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import callAPI from '../../../CallApi';

function Table(props) {
    const {
        posts,
        products,
        bills,
        onGetPost,
        onGetProducts,
        onDelProducts,
        onDelPost,
        onGetBills,
        onDelBills,
        onUpdStt
    } = props;
    const token = JSON.parse(localStorage.getItem('token')).accessToken || null;
    const [type, setType] = useState([]);
    useEffect(() => {
        const script = document.createElement("script");
        script.src = 'js/table.js';
        script.async = true;

        document.body.appendChild(script);

        callAPI('news/news', 'GET', null).then(res => {
            // console.log(res.data);
            onGetPost((res.data || []).map(item => ({ ...item })))
        })

        callAPI('category/categorys', 'GET', null).then(res => {
            console.log(res.data);
            setType(res.data);
            // onGetPost((res.data || []).map(item => ({ ...item })))
        })

        callAPI('product/products', 'GET', null).then(res => {
            onGetProducts((res.data || []).map(item => ({ ...item })))
        })

        var data = '';

        var config = {
            method: 'get',
            url: 'http://localhost:8081/api/bill/bills',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                const bills = response.data;
                console.log(bills);
                onGetBills(bills);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    const eleProduct = products.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                    <button type="button" className="btn-primary"><Link className="btn-option" to={`updproduct/${item.id}`}>UPD</Link></button>
                    <button type="button" className="btn-success btn-option" onClick={() => onDelProduct(item.id)}>DEL</button>
                </td>
            </tr>
        )
    })

    const elePost = posts.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{item.description}</td>
                <td>
                    <button type="button" className="btn-primary"><Link className="btn-option" to={`updpost/${item.id}`}>UPD</Link></button>
                    <button type="button" className="btn-success btn-option" onClick={() => onDelNews(item.id)}>DEL</button>
                </td>
            </tr>
        )
    })

    const onChangeStatus = (item) => {
        // const newItem = { };
        if (item.status == 'PAID') {
            var newItem = { ...item, status: 'UNPAID' }
        } else {
            newItem = { ...item, status: 'PAID' }
        }
        callAPI(`bill/update/${item.id}`, 'PUT', newItem).then(res => {
            // onAddNewBill(infBuyers);
            onUpdStt(newItem);
            alert("thao tác thành công")
        })
        console.log(newItem);


    }


    const eleBill = (bills || []).map((item, index) => {
        console.log('billlls', item);

        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.userName}</td>
                <td>{item.total}</td>
                <td><span className={item.status == 'PAID' ? 'bill-stt-paid' : 'bill-stt'} onClick={() => onChangeStatus(item)}>{item.status}</span></td>
                <td>
                    <button type="button" className="btn-primary"><Link className="btn-option" to={`updpost/${item.id}`}>UPD</Link></button>
                    <button type="button" className="btn-success btn-option" onClick={() => onDelBill(item.id)}>DEL</button>
                </td>
            </tr>
        )
    })

    const eleType = type.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                    <select className="form-control form-control-lg" name="categoryCode" >
                        {item.child.map((item, index) => {
                            return (
                                <option key={index} value={item.code}>{item.name}</option>
                            )
                        })}
                    </select>
                </td>
                <td>
                    <button type="button" className="btn-primary"><Link className="btn-option" to={`updpost/${item.id}`}>UPD</Link></button>
                    <button type="button" className="btn-danger"><Link className="btn-option" to={`addtype/`}>ADD</Link></button>
                    <button type="button" className="btn-success btn-option" onClick={() => onDelType(item.id)}>DEL</button>
                </td>
            </tr>
        )
    })

    const onDelProduct = (id) => {
        if (!id) return;
        const token = JSON.parse(localStorage.getItem('token')).accessToken || null;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = "";

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:8081/api/product/delete?id=${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                onDelProducts(id)
                alert("success")
            })
            .catch(error => {
                console.log('error', error);
                alert("thao tac that bai")
            });
    }

    const onDelNews = (id) => {
        if (!id) return;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = "";

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:8081/api/news/delete?id=${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                // alert(result); 
                onDelPost(id)
                alert("success")
            })
            .catch(error => {
                console.log('error', error);
                alert("thao tac that bai")
            });
    }

    const onDelBill = (id) => {
        if (!id) return;

        var data = '';

        var config = {
            method: 'delete',
            url: `http://localhost:8081/api/bill/delete?id=${id}`,
            headers: {},
            data: data
        };

        axios(config)
            .then(function (response) {
                alert("thao tac thanh cong");
                onDelBills(id);
            })
            .catch(function (error) {
                alert("thao tac that bai");
            });

    }

    const onDelType = (id) => {
        if (!id) return;
        var data = '';

        var config = {
            method: 'delete',
            url: `http://localhost:8081/api/category/delete?id=${id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                alert('thao tác thành công');
            })
            .catch(function (error) {
                alert('thao tác thất bại');
            });
    }
    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Data Tables
                        <small>advanced tables</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
                        <li><a href="#">Tables</a></li>
                        <li className="active">Data tables</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Table Product</h3>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Description</th>
                                                <th>Option</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eleProduct}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Description</th>
                                                <th>Option</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                {/* /.box-body */}
                            </div>
                            {/* /.box */}
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Table Post</h3>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Engine version</th>
                                                <th>Option</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Trident</td>
                                                <td>Internet
                                                Explorer 4.0
                                                </td>
                                                <td>Win 95+</td>
                                                <td> 4</td>
                                                <td>X</td>
                                            </tr>
                                            {elePost}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>Rendering engine</th>
                                                <th>Browser</th>
                                                <th>Platform(s)</th>
                                                <th>Engine version</th>
                                                <th>CSS grade</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                {/* /.box-body */}
                            </div>
                            {/* /.box */}
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Table Bill</h3>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>Option</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eleBill}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>Option</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                {/* /.box-body */}
                            </div>
                            {/* box */}
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Table Type</h3>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>List Type</th>

                                                <th>Option</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eleType}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>List Type</th>

                                                <th>Option</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                {/* /.box-body */}
                            </div>
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </section>
                {/* /.content */}
            </div>

        </div>
    );
}

var mapStateToProps = state => {
    return {
        posts: state.posts,
        products: state.products.products,
        bills: state.bills
    }
}

var mapDispatchToProps = (dispatch, props) => {
    return {
        onGetPost: (posts) => {
            dispatch(actions.getPosts(posts));
        },
        onDelPost: (id) => {
            dispatch(actions.delPost(id));
        },
        onGetProducts: (products) => {
            dispatch(actions.getAll(products))
        },
        onDelProducts: (id) => {
            dispatch(actions.delPro(id))
        },
        onGetBills: (bills) => {
            dispatch(actions.getBill(bills));
        },
        onDelBills: (id) => {
            dispatch(actions.delBill(id))
        },
        onUpdStt: (item) => {
            dispatch(actions.updStt(item))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);