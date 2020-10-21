import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/actions';
import CallAPI from '../../../../CallApi';
import axios from 'axios';
import { storage } from '../../../../firebase/index';


function OptionForm(props) {
    const { onAddProduct, currentProd } = props;
    const token = JSON.parse(localStorage.getItem('token')).accessToken || null;
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const [product, setProduct] = useState({

        title: '',
        price: 0,
        description: '',
        imgUrl: '',
        categoryCode: ''
    });

    const [category, setCategory] = useState([]);
    const [typeProduct, setTypeProduct] = useState({ code: '', listType: [] });

    useEffect(() => {
        CallAPI('category/categorys', 'GET', null).then(res => {
            setCategory(res.data);
        })
    }, []);

    useEffect(() => {
        if (!category) return;
        const newList = category.filter(item => {
            return item.code == typeProduct.code
        })
        // ;   
        { newList[0] ? setTypeProduct({ ...typeProduct, listType: newList[0].child }) : console.log(newList[0]); }
    }, [typeProduct.code]);
    // console.log(product);
    function onHandleSubmit(e) {
        e.preventDefault();
        const currentP = product;

        if (currentP.id) {
            if (token) {

                axios.put(`http://localhost:8081/api/product/update/${currentP.id}`, currentP, config).then(res => {
                    alert("sua thanh cong")
                }).catch(err => {
                    if (err) {
                        alert("sua that bai")
                    }
                })

            } else {
                alert("sua that bai")
            }
        } else {
            if (token) {
                axios.post(`http://localhost:8081/api/product/create`, currentP, config).then(res => {
                    alert("them thanh cong")
                }).catch(err => {
                    console.log(err);
                    if (err) {
                        alert("them that bai")
                    }
                })

            } else {
                alert("them that bai")
            }
        }
        setProduct({

            title: '',
            price: 0,
            description: '',
            imgUrl: '',
            categoryCode: ''
        })
    }

    function onHandleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const newP = { ...product, [name]: value };
        setProduct(newP)

    }

    function onHandleImgChange(e) {
        if (e.target.files[0]) {
            const newP = { ...product, imgUrl: e.target.files[0] }
            setProduct(newP)
        }

    }

    const onHandleUpload = () => {
        const uploadTask = storage.ref(`images/${product.imgUrl.name}`).put(product.imgUrl);
        uploadTask.on(
            "state_changed",
            snapshot => { },
            err => {
                console.log(err);
            },
            () => {
                storage.ref("images").child(product.imgUrl.name).getDownloadURL().then(url => {
                    console.log(url);
                    setProduct({ ...product, imgUrl: url })
                })
            }
        )
    }


    useEffect(() => {
        if (!currentProd) return;
        // console.log(currentProd);
        setProduct(currentProd);
    }, [currentProd]);

    return (
        <div className="text-center">
            <div className="box box-primary" style={{ width: "60%", margin: "0 auto" }}>
                <div className="box-header with-border">
                    <h3 className="box-title">Option</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form onSubmit={onHandleSubmit}>
                    <div className="box-body">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={product.title} name="title" placeholder="name" onChange={onHandleChange} />
                        </div>
                        <div className="form-group">
                            <label >Price</label>
                            <input type="text" className="form-control" value={product.price} name="price" placeholder="Price" onChange={onHandleChange} />
                        </div>
                        <div className="form-group">
                            <label >Description</label>
                            <input type="text" className="form-control" value={product.description} name="description" placeholder="Description" onChange={onHandleChange} />
                        </div>
                        <div className="form-group">
                            <label >Type</label>

                            <select className="form-control form-control-lg" name="categoryCode" onChange={(e) => setTypeProduct({ ...typeProduct, code: e.target.value })}>
                                <option value=""></option>
                                {category.map((item, index) => {
                                    return (
                                        <option key={index} value={item.code}>{item.name}</option>
                                    )
                                })}
                            </select>

                            <select className="form-control form-control-lg" name="categoryCode" onChange={onHandleChange}>
                                <option value=""></option>
                                {(typeProduct.listType || []).map((item, index) => {
                                    return (
                                        <option key={index} value={item.code}>{item.name}</option>
                                    )
                                })}
                            </select>

                        </div>
                        <div className="form-group">
                            <label >File input</label>
                            <input type="file" name="imgUrl" onChange={onHandleImgChange} />
                            <p onClick={onHandleUpload}>upload</p>
                            <p className="help-block">Example block-level help text here.</p>
                        </div>

                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>

        </div>
    );
}

var mapStateToProps = state => {
    return {
        // products : state.products
    }
}

var mapDispatchToProps = (dispatch, props) => {
    return {
        // onGetProducts : (products)=>{
        //     dispatch(actions.getAll(products))
        // },
        onAddProduct: (item) => {
            dispatch(actions.addPro(item))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionForm);