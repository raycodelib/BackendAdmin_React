import { message } from 'antd';
import jsonp from 'jsonp';

import ajax from './ajax';

// export function reqLogin(username, password) {
//     return ajax('/login', { username, password }, 'POST');
// }

const BASE = '';

//login
export const reqLogin = (username, password) =>
    ajax(BASE + '/login', { username, password }, 'POST');

//add user
export const reqAddUser = (user) =>
    ajax(BASE + '/manage/user/add', user, 'POST');

// category
export const reqCategory = (parentId) =>
    ajax(BASE + '/manage/category/list', { parentId });

export const reqAddCategory = (categoryName, parentId) =>
    ajax(BASE + '/manage/category/add', { categoryName, parentId }, 'POST');

export const reqUpdateCategory = ({ categoryId, categoryName }) =>
    ajax(
        BASE + '/manage/category/update',
        { categoryId, categoryName },
        'POST'
    );

// send jsonp to get weather information
export const reqWeather = (location) => {
    return new Promise((resolve, rejct) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url, {}, (err, data) => {
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
