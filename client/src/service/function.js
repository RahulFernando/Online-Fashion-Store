import axios from 'axios';

let authenticated = false;

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
        authenticated = true;
        localStorage.setItem('usertoken', res.data.token)
        console.log('Successful login')
    })
    .catch(err => { console.log(err) })
}

export const loginAdmin = admin => {
    return axios.post("admin/login", {
        username: admin.username,
        password: admin.password
    })
    .then(res => {
        authenticated = true
        localStorage.setItem('admintoken', res.data.token)
        console.log('Successful login')
    })
}

export const isAuthenticated = () => {
   return authenticated
}

export const createMainCategory = mainCategory => {
    return axios.post("/mainCategory/mainCategory", {
        mainCategoryName: mainCategory.mainCategoryName
    })
}

export const getMainCategories = () => {
    return axios.get('/mainCategory/mainCategories')
}

export const updateMainCategories = (id, mainCategory) => {
    return axios.put('/mainCategory/mainCategories/'+id, {
        mainCategoryName: mainCategory.mainCategoryName
    }).then(res => {
        console.log(res.data.message)
    }).catch(err => {
        console.log(err)
    })
}