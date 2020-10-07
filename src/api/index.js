import { message } from 'antd';
import jsonp from 'jsonp';

import ajax from './ajax';

// export function reqLogin(username, password) {
//     return ajax('/login', { username, password }, 'POST');
// }

const BASE = '';
export const reqLogin = (username, password) =>
    ajax(BASE + '/login', { username, password }, 'POST');
export const reqAddUser = (user) =>
    ajax(BASE + '/manage/user/add', user, 'POST');

export const reqWeather = (location) => {
    return new Promise((resolve, rejct) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url, {}, (err, data) => {
            console.log('jsonp()', err, data);
            if (!err && data.status === 'success') {
                const {
                    dayPictureUrl,
                    weather,
                } = data.results[0].weather_data[0];
                resolve({ dayPictureUrl, weather });
            } else {
                message.error('Request reqWeather failed.');
            }
        });
    });
};
// reqWeather('北京');
