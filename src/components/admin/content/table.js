import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/actions';
import {Link} from 'react-router-dom';
import callAPI from '../../../CallApi';

function Table(props) {
    const { posts, products, onGetPost, onGetProducts, onDelProducts } = props
    useEffect(() => {
        const script = document.createElement("script");
        script.src = 'js/table.js';
        script.async = true;

        document.body.appendChild(script);

        callAPI('news', 'GET', null).then(res => {
            onGetPost((res.data || []).map(item => ({ ...item })))
        })

        callAPI('products', 'GET', null).then(res => {
            onGetProducts((res.data || []).map(item => ({ ...item })))
        })
    }, []);

    const eleProduct = products.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                    <button type="button" className="btn btn-primary"><Link to={`/updproduct/${item.id}`}>UPD</Link></button>
                    <button type="button" className="btn btn-success" onClick={()=>onDelProduct(item.id)}>DEL</button>
                </td>
            </tr>
        )
    })

    const elePost = posts.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                    <button type="button" className="btn btn-primary"></button>
                    <button type="button" className="btn btn-success">DEL</button>
                </td>
            </tr>
        )
    })

    const onDelProduct = (id) =>{
        if(!id) return;
        callAPI('products','DELETE',[id]).then(res=>{
            onDelProducts(id)
        })
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
                                            {eleProduct}
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
        products: state.products.products
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);