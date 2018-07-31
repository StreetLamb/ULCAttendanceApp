import axios from 'axios';

const instance=axios.create({
  baseURL:'https://ulc-attendance-app.firebaseio.com/',
});

export default instance;
