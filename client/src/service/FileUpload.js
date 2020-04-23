import Axios from 'axios';

export const upload = (data) => {
    return Axios.post('/product/uploadImage', data)
    .then(res => {console.log(res)})
    
}