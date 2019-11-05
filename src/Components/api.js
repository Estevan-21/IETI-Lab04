import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 1000,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem("accessToken")}
});