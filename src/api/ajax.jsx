import { message } from 'antd';
import axios from 'axios';

// component to send ajax request async
// wrap axios lib
// return value is a promise object

export default function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        let promise;
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data,
            });
        } else {
            promise = axios.post(url, data);
        }
        promise
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                message.error('Request failed:' + error.message);
            });
    });
}

// ajax('/login', { username: 'Tom', password: '12345' }, 'POST').then();
// ajax(
//     '/manage/add/user',
//     { username: 'Tom', password: '12345', phone: '1311234567' },
//     'POST'
// ).then();
