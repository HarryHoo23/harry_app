import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://season-app-edc93.firebaseio.com/'
});

export default instance;