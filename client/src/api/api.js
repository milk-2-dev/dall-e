import { axios_api } from '../config/api/index';

const getImage = (prompt) => {
    return axios_api.post(`/dalle`, {prompt});
};

const postImage = (data) => {
    return axios_api.post(`/post`, JSON.stringify({ ...data }));
};

const getPosts = () => {
    return axios_api.get(`/post`);
};

const API = {
    getImage,
    postImage,
    getPosts,
}

export default API;