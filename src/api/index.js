import { message } from "antd";
import jsonp from "jsonp";

import ajax from "./ajax";

// export function reqLogin(username, password) {
//     return ajax('/login', { username, password }, 'POST');
// }

const BASE = "";

//login
export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");

//add user
export const reqAddUser = (user) =>
  ajax(BASE + "/manage/user/add", user, "POST");

// get category
export const reqCategory = (parentId) =>
  ajax(BASE + "/manage/category/list", { parentId });

// add category
export const reqAddCategory = (categoryName, parentId) =>
  ajax(BASE + "/manage/category/add", { categoryName, parentId }, "POST");

// update category
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax(BASE + "/manage/category/update", { categoryId, categoryName }, "POST");

// get category for product
export const reqProductCategory = (categoryId) =>
  ajax(BASE + "/manage/category/info", { categoryId });

// get products
export const reqProducts = (pageNum, pageSize) =>
  ajax(BASE + "/manage/product/list", { pageNum, pageSize });

// search product by productName/productType
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType,
}) =>
  ajax(BASE + "/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });
// search product by productDesc
// export const reqSearchProducts = ({ pageNum, pageSize, searchName }) =>
//   ajax(BASE + "/manage/product/search", {
//     pageNum,
//     pageSize,
//     productDesc: searchName,
//   });

// send jsonp to get weather information
export const reqWeather = (location) => {
  return new Promise((resolve, rejct) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === "success") {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0];
        resolve({ dayPictureUrl, weather });
      } else {
        message.error("Request reqWeather failed.");
      }
    });
  });
};
// reqWeather('北京');
