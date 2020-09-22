import axios from 'axios';
import * as configs from './redux/constances/config';

export default function callAPI(endPoint,method,data){
    return axios({
        method:method,
        url:`${configs.API_URL}/${endPoint}`,
        data:data
    }).catch(err =>{
        console.log(err)
    })
}