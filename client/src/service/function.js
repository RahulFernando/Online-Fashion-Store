import axios from 'axios';

let token = ''
let isAuthenticate = false

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
        token = res.data.token
        localStorage.setItem('usertoken',token)
    })
    .catch(err => { console.log(err) })
}

export const loginAdmin = admin => {
    return axios.post("admin/login", {
        username: admin.username,
        password: admin.password
    })
    .then(res => {
        token = res.data.token
        isAuthenticate = true
        // localStorage.setItem('admintoken',token)
    })
}

export const createMainCategory = mainCategory => {
    return axios.post("/admin/mainCategory/mainCategory", { headers: {"Authorization":token}}, {
        mainCategoryName: mainCategory.mainCategoryName
    })
}

export const getMainCategories = () => {
    return axios.get("/admin/mainCategory/mainCategories", { headers: {"Authorization":token}})
}

export const getMainCategory = (id) => {
    return axios.get("/admin/mainCategory/mainCategories/"+id, { headers: {"Authorization":token}})
}

export const updateMainCategories = (id, mainCategory) => {
    return axios.put("/admin/mainCategory/mainCategories/"+id, { headers: {"Authorization":token}},  {
        mainCategoryName: mainCategory.mainCategoryName
    }).then(res => {
        console.log(res.data.message)
    }).catch(err => {
        console.log(err)
    })
}

export const deleteMainCategories = (id) => {
    return axios.delete("/admin/mainCategory/mainCategories/"+id, { headers: {"Authorization":token}})
    .then(res => { console.log(res.data.message) })
    .catch(err => { console.log(err) })
}

export const createSubCategory = (subCategory) => {
    return axios.post("/admin/subCategory/newSubCategory", { headers: {"Authorization":token}}, {
        subCategoryName: subCategory.subCategoryName,
        main_category_id: subCategory.main_category_id
    })
}

export const getSubCategories = () => {
    return axios.get("/admin/subCategory/subCategories",{ headers: {"Authorization":token}} )
}

export const updateSubCategory = (id, subCategory) => {
    return axios.put("/admin/subCategory/subCategories/"+id, { headers: {"Authorization":token}}, {
        subCategoryName: subCategory.subCategoryName,
        main_category_id: subCategory.main_category_id
    })
    .then(res => {
        console.log(res.data.message);
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteSubCategories = (id) => {
    return axios.delete("/admin/subCategory/subCategories/"+id, { headers: {"Authorization":token}})
    .then(res => { console.log(res.data.message) })
    .catch(err => { console.log(err) })
}

export const isAuthenticated = () => {
    if (isAuthenticate) {
        return isAuthenticate
    }
    return false
}