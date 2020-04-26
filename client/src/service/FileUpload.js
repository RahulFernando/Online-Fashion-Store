import Axios from 'axios';

export const upload = (data) => {
    return Axios.post('/product/uploadItem', data)
    .then(res => {
        if(res.data.success) {
            alert('Product Successfully Uploaded')
        } else {
            alert('Failed to upload Product')
        }
    })
    
}