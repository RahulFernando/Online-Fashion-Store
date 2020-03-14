import axios from 'axios';

export const registerUser = newUser => {
    return axios.post("/users/register", {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password
    })
}

export const loginUser = user => {
    return axios.post("/users/login", {
        username: user.username,
        password: user.password
    })
    .then(res => {
      localStorage.setItem('usertoken', res.data.token)
      console.log('Successful login')
    })
    .catch(err => { console.log(err) })
}