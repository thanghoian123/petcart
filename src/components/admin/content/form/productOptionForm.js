import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/actions';
import callAPI from '../../../../CallApi';


function OptionForm(props) {
    const {onAddProduct,currentProd} = props;
    
    const [product, setProduct] = useState({
        id: '',
        title: '',
        price: 0,
        description: '',
        imgUrl: '',
        categoryCode: ''
    });
    // console.log(product);
    function onHandleSubmit(e){
        e.preventDefault();
        const currentP = product;
        console.log(currentP);
        if(currentP.id){
            callAPI(`products/${currentP.id}`, 'PUT', currentP).then(res => {
                alert('sua thanh cong')
            })             
        }else{
            callAPI('products','POST',product).then(res=>{
                onAddProduct(product);
                alert('them thanh cong')
            })
        }
        setProduct({
            id: '',
            title: '',
            price: 0,
            description: '',
            imgUrl: '',
            categoryCode: ''
        })
    }

    function onHandleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        const newP = {...product,[name]:value};
        setProduct(newP)        
    }

    useEffect(() => {        
        if(!currentProd) return;
        console.log(currentProd);    
        setProduct(currentProd);
    }, [currentProd]);

    return (
        <div  className="text-center">
            <div className="box box-primary" style={{width:"60%",margin: "0 auto"}}>
                <div className="box-header with-border">
                    <h3 className="box-title">Option</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form onSubmit={onHandleSubmit}>
                    <div className="box-body">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={product.title} name="title" placeholder="name" onChange={onHandleChange}/>
                        </div>
                        <div className="form-group">
                            <label >Price</label>
                            <input type="text" className="form-control" value={product.price} name="price" placeholder="Price" onChange={onHandleChange}/>
                        </div>
                        <div className="form-group">
                            <label >Description</label>
                            <input type="text" className="form-control" value={product.description} name="description" placeholder="Description" onChange={onHandleChange} />
                        </div>
                        <div className="form-group">
                            <label >Type</label>

                            <select className="form-control form-control-lg" name="categoryCode" onChange={onHandleChange}>
                                <option value=""></option>
                                <option value="do-an-cho">Dog food</option>
                                <option value="do-an-meo">Cat food</option>
                                <option value="do-choi-cho">Dog toy</option>
                                <option value="do-choi-meo">Cat toy</option>
                            </select>

                        </div>
                        <div className="form-group">
                            <label >File input</label>
                            <input type="file" name="imgUrl" onChange={onHandleChange}/>
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

export default connect(mapStateToProps,mapDispatchToProps)(OptionForm);