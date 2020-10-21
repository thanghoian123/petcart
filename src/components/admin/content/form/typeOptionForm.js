import React, { useState } from 'react';
import CallAPI from '../../../../CallApi';
import axios from 'axios';
import { useEffect } from 'react';

function TypeOptionForm(props) {
    const [type, setType] = useState([]);
    const [childType, setChildType] = useState([]);
    const [newType, setNewType] = useState({
        name: '',
        code: '',
        categoryCode: ''
    });

    const token = JSON.parse(localStorage.getItem('token')).accessToken || null;

    useEffect(() => {
        CallAPI('category/categorys', 'GET', null).then(res => {
            console.log(res.data);
            setType(res.data);
            // onGetPost((res.data || []).map(item => ({ ...item })))
        })
    }, []);

    useEffect(() => {
        if (newType.categoryCode == '0') {
            setChildType([]);

        } else {
            const newL = type.filter(item => {
                return item.code == newType.categoryCode
            })
            { newL[0] ? setChildType(newL[0].child) : console.log(newL[0]); }
        }
    }, [newType.categoryCode]);

    const onHandleSubmit = (e) => {
        e.preventDefault();
        var data = JSON.stringify(newType);

        var config = {
            method: 'post',
            url: 'http://localhost:8081/api/category/create',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                alert(response.data.message)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onHandleChange = (e) => {
        const { value, name } = e.target;
        setNewType({ ...newType, [name]: value })
    }

    console.log(newType);
    console.log(childType);
    

    return (
        <div className="text-center">
            < form onSubmit={onHandleSubmit} style={{ width: "60%", margin: "0 auto" }} >
                <div className="box-body">
                    <div className="form-group">
                        <label >Name</label>
                        <input type="text" className="form-control" value={newType.name} name="name" onChange={onHandleChange} placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label>Category Code</label>
                        <select className="form-control" name="categoryCode" onChange={onHandleChange}>
                            {(type || []).map((item, index) => {
                                return (
                                    <option key={index} value={item.code}>{item.code}</option>
                                )
                            })}
                            <option value="0">thêm mới</option>
                        </select>
                    </div>
                    <div>
                        <div className="form-group">
                            <label>Code</label>
                            {/* {(newType.categoryCode == '0' || (newType.categoryCode != '0' && childType.length==0))
                                ? (<input type="text" className="form-control" value={newType.code} name="code" onChange={onHandleChange} placeholder="Code" />)
                                : (<select className="form-control" name="code" onChange={onHandleChange}>
                                    {(childType || []).map((item, index) => {
                                        return (
                                            <option key={index} value={item.code}>{item.code}</option>
                                        )
                                    })}
                                </select>)} */}
                            <input type="text" className="form-control" value={newType.code} name="code" onChange={onHandleChange} placeholder="Code" />

                        </div>

                    </div>


                </div>
                <div className="box-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form >

        </div>
    );
}

export default TypeOptionForm;