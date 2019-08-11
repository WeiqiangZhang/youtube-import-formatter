import axios from 'axios';
const KEY = 'AIzaSyCAhezourwG-9lbBmnUSSHey1h2jDqD7t8';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 50,
        key: KEY
    }
})