import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CallApi from '../../../../CallApi';
import Popup from 'reactjs-popup';
import * as actions from '../../../../redux/actions/actions';
import './style2.css';
import callAPI from '../../../../CallApi';

const URL_API = "https://cors-anywhere.herokuapp.com/thongtindoanhnghiep.co/api/city";


function InfBuyer(props) {
    const infBuyer = JSON.parse(localStorage.getItem('infBuyer'));
    const { onAddNewBill ,cart_Products} = props;
    const [infBuyers, setinfBuyers] = useState({
        userName: '',
        email: '',
        address: '',
        city: '',
        phoneNumber: '',
        total: 0,
        billDetail: [],
        payment: 'thanh-toan-truc-tiep',
        status: null
    });

    const [city, setcity] = useState([]);
    const [cityDetail, setcityDetail] = useState([]);
    const [id, setid] = useState('');
    const [isBuyed, setisBuyed] = useState(false);




    useEffect(() => {
        fetch(URL_API).then(response => response.json())
            .then(data => {
                const newCity = (data.LtsItem || []).map(item => {
                    return {
                        Title: item.Title,
                        ID: item.ID
                    }
                })
                setcity(newCity);
            });
            setinfBuyers({ ...infBuyers, billDetail: infBuyer.billDetail, total: infBuyer.total, userName: infBuyer.userName })

    }, []);
    useEffect(() => {
        
    });

    useEffect(() => {
        const URL_DETAIL = `https://cors-anywhere.herokuapp.com/thongtindoanhnghiep.co/api/city/${id}/district`;
        fetch(URL_DETAIL).then(response => response.json())
            .then(data => {
                const detail = (data || []).map(item => {
                    return {
                        Title: item.Title,
                        ID: item.ID
                    }
                })
                setcityDetail(detail);
                // console.log(data);
            });
    }, [id]);

    const onHandleChangeCity = (e) => {
        const target = e.target;
        const value = target.value;
        setid(value);

        const URL_CITYDETAIL = `https://cors-anywhere.herokuapp.com/https://thongtindoanhnghiep.co/api/city/${value}`;
        fetch(URL_CITYDETAIL).then(response => response.json())
            .then(data => {
                setinfBuyers({ ...infBuyers, city: data.Title })
            });

    }

    const onHandleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setinfBuyers({ ...infBuyers, [name]: value })
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();

    }


    const Check = () => {

        if (infBuyers.email == '' || infBuyers.phoneNumber == '' || infBuyers.address == '') return false;
        return true;
    }

    const onBuy = () => {
        const a = Check();
        if (!a) {
            alert("please fill your information!!")
            return;
        }
        CallApi('bill/create', 'POST', infBuyers).then(res => {
            onAddNewBill(infBuyers);
            alert("thao tác thành công")
            localStorage.removeItem('infBuyer');
        })


        setisBuyed(true);
    }

    console.log(infBuyers);
    console.log(infBuyer);

    if (isBuyed) {
        return (
            <Redirect to="/billinf" />
        )
    }

    return (
        <div className="container-fluid bg-secondary">
            <div className="container">
                <h3>Thông tin khách hàng và thanh toán</h3>
                <div className="row">
                    <form onSubmit={onHandleSubmit}>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                            <div className="form-inf bg-primary" style={{ padding: 20 }}>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputEmail4">Email</label>
                                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={onHandleChange} required />
                                    </div>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAddress">Address</label>
                                    <input type="text" className="form-control" name="address" placeholder="1234 Main St" onChange={onHandleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAddress2">Phone Number</label>
                                    <input type="text" className="form-control" id="inputAddress2" placeholder="Phone Number..." name="phoneNumber" onChange={onHandleChange} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCity">City</label>
                                        <select id="inputState" className="form-control" onChange={onHandleChangeCity} required>
                                            {(city || []).map((item, index) => {
                                                return (
                                                    <option value={item.ID} key={index}>{item.Title}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputState">State</label>
                                        <select id="inputState" className="form-control">
                                            {(cityDetail || []).map((item, index) => {
                                                return (
                                                    <option value={item.ID} key={index}>{item.Title}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="inputZip">Zip</label>
                                        <input type="text" className="form-control" id="inputZip" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                                        <label className="form-check-label" htmlFor="gridCheck">
                                            Check me out
                                        </label>
                                    </div>
                                </div>
                                {/* <button type="submit">Submit</button> */}

                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="prices-room bg-primary" style={{ padding: 20, marginBottom: 20, }}>
                                <div className="row" style={{ borderBottom: 'white solid 1px !important' }}>
                                    {/* <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <p>Giá phòng</p>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                    <p>₫ 9.000.000</p>
                                </div> */}
                                </div>
                                <div className="row" style={{ paddingTop: 10 }}>
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <p id="cl-white">Tổng</p>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                        <p id="cl-white"><strong>₫ {infBuyers ? infBuyers.total : ""}</strong></p><br /><br />
                                        <p id="cl-white">Giá bao gồm thuế.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="prices-room bg-primary" style={{ padding: 20, marginBottom: 20 }}>
                                <div className="row" style={{ borderBottom: 'white solid 1px !important' }}>
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <p id="cl-white">Phương thức thanh toán</p>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                    </div>
                                </div>
                                <div className="row" style={{ paddingTop: 10 }}>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="thanh-toan-truc-tiep" defaultChecked onChange={(e) => { setinfBuyers({ ...infBuyers, payment: e.target.value }) }} />
                                            <label className="form-check-label" htmlFor="exampleRadios1">
                                                <img ng-src="https://new-hls.s3.amazonaws.com/data/0/settings/onepay-logo_1544117501.png" className="max-h-18" src="https://new-hls.s3.amazonaws.com/data/0/settings/onepay-logo_1544117501.png" style={{ width: 30 }} />
                                            thanh toán trực tiếp
                  {/* OnePay Vietnam (For ATM Cards) */}
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="thanh-toan-online" onChange={(e) => { setinfBuyers({ ...infBuyers, payment: e.target.value }) }} />
                                            <label className="form-check-label" htmlFor="exampleRadios2">
                                                <img ng-src="https://new-hls.s3.amazonaws.com/data/0/settings/onepay-logo_1544117501.png" className="max-h-18" src="https://new-hls.s3.amazonaws.com/data/0/settings/onepay-logo_1544117501.png" style={{ width: 30 }} />
                                            OnePay Vietnam (For ATM Cards)
                                        </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="prices-room bg-primary" style={{ padding: 20, marginBottom: 20 }}>
                                <div className="row">
                                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                        <input type="checkbox" /> Tôi đã đọc và chấp nhận Chính sách mua hàng.
                                </div>
                                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-right">
                                        <button type="submit" className="btn text-primary " onClick={onBuy}> Mua hàng </button> <br /> <br />
                                        <Popup trigger={<button className="btn text-primary "> Xem chi tiết hóa đơn</button>} modal>
                                            {infBuyers ? (
                                                <div className="bg-dark">
                                                    <div className="contents">
                                                        <table className="table table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th>ID</th>
                                                                    <th>Tên sản phẩm</th>
                                                                    <th>Đơn giá</th>
                                                                    <th>Số lượng</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {infBuyers.billDetail.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{item.idProduct}</td>
                                                                            <td>{item.nameProduct}</td>
                                                                            <td>{item.quantity}</td>
                                                                            <td>{item.price}</td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                                <tr >
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>tổng tiền: {infBuyers.total}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        {/* thong tin khach hang */}
                                                        <table className="table table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th>ID</th>
                                                                    <th>Tên khách hàng</th>
                                                                    <th>Địa chỉ</th>
                                                                    <th>Tổng tiền</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{}</td>
                                                                    <td>{infBuyers.email}</td>
                                                                    <td>{infBuyers.address + " " + infBuyers.city}</td>
                                                                    <td>{infBuyers.total}</td>
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </div>
                                            ) : (
                                                    <div>
                                                        <p>none</p>
                                                    </div>
                                                )
                                            }
                                        </Popup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        bills: state.bills,
        cart_Products : state.cart_Products
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddNewBill: (bill) => {
            dispatch(actions.addBill(bill))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfBuyer);