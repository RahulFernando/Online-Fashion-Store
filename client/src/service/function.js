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
        const {token} = res.data
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
        const {token} = res.data
        localStorage.setItem('admintoken',token)
    })
}

export const createMainCategory = mainCategory => {
    return axios.post("/mainCategory/mainCategory", {
        mainCategoryName: mainCategory.mainCategoryName
    })
}

export const getMainCategories = () => {
    return axios.get("/mainCategory/mainCategories")
}

export const getMainCategory = (id) => {
    return axios.get("/mainCategory/mainCategories/"+id)
}

export const updateMainCategories = (id, mainCategory) => {
    return axios.put("/mainCategory/mainCategories/"+id, {
        mainCategoryName: mainCategory.mainCategoryName
    }).then(res => {
        console.log(res.data.message)
    }).catch(err => {
        console.log(err)
    })
}

export const deleteMainCategories = (id) => {
    return axios.delete("/mainCategory/mainCategories/"+id)
    .then(res => { console.log(res.data.message) })
    .catch(err => { console.log(err) })
}

export const createSubCategory = (subCategory) => {
    return axios.post("/subCategory/newSubCategory", {
        subCategoryName: subCategory.subCategoryName,
        main_category_id: subCategory.main_category_id
    })
}

export const getSubCategories = () => {
    return axios.get("/subCategory/subCategories")
}

export const updateSubCategory = (id, subCategory) => {
    return axios.put("/subCategory/subCategories/" + id, {
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
    return axios.delete("/subCategory/subCategories/"+id)
    .then(res => { console.log(res.data.message) })
    .catch(err => { console.log(err) })
}