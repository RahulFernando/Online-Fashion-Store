import axios from 'axios';

let usertoken = ''
let admintoken = localStorage.getItem('admintoken')

// register new user
export const registerUser = newUser => {
    return axios.post("/users/register", {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password
    })
}

// log user
export const loginUser = user => {
    return axios.post("/users/login", {
        username: user.username,
        password: user.password
    })
    .then(res => {
        if (res.data.type === 'user') {
            usertoken = res.data.token
            localStorage.setItem('usertoken', usertoken)
        }
    })
    .catch(err => { console.log(err) })
}

// log admin
export const loginAdmin = admin => {
    return axios.post("admin/login", {
        username: admin.username,
        password: admin.password
    })
    .then(res => {
        if (res.data.type === 'admin') {
            admintoken = res.data.token
            localStorage.setItem('admintoken', admintoken)
        }
    })
    .catch(err => { console.log(err) })
}

// add new main category
export const createMainCategory = mainCategory => {
    return axios.post("/admin/mainCategory/mainCategory", {
        mainCategoryName: mainCategory.mainCategoryName
    }, { headers: {"Authorization":admintoken}})
}

// get all main categories
export const getMainCategories = () => {
    return axios.get("/admin/mainCategory/mainCategories", { headers: {"Authorization":admintoken}})
}

// get main category by id
export const getMainCategory = (id) => {
    return axios.get("/admin/mainCategory/mainCategories/"+id, { headers: {"Authorization":admintoken}})
}

// update main category by an id
export const updateMainCategories = (id, mainCategory) => {
    return axios.put("/admin/mainCategory/mainCategories/"+id, {
        mainCategoryName: mainCategory.mainCategoryName
    }, { headers: {"Authorization":admintoken}}).then(res => {
        console.log(res.data.message)
    }).catch(err => {
        console.log(err)
    })
}

// delete main category by an id
export const deleteMainCategories = (id) => {
    return axios.delete("/admin/mainCategory/mainCategories/"+id, { headers: {"Authorization":admintoken}})
    .then(res => { console.log(res.data.message) })
    .catch(err => { console.log(err) })
}

// add new sub category
export const createSubCategory = (subCategory) => {
    return axios.post("/admin/subCategory/newSubCategory", {
        subCategoryName: subCategory.subCategoryName,
        main_category_id: subCategory.main_category_id
    }, { headers: {"Authorization":admintoken}})
}

// get sub categories
export const getSubCategories = () => {
    return axios.get("/admin/subCategory/subCategories",{ headers: {"Authorization":admintoken}} )
}

// update sub category by an id 
export const updateSubCategory = (id, subCategory) => {
    return axios.put("/admin/subCategory/subCategories/"+id, {
        subCategoryName: subCategory.subCategoryName,
        main_category_id: subCategory.main_category_id
    }, { headers: {"Authorization":admintoken}})
    .then(res => {
        console.log(res.data.message);
    })
    .catch(err => {
        console.log(err)
    })
}

// delete sub category by an id
export const deleteSubCategories = (id) => {
    return axios.delete("/admin/subCategory/subCategories/"+id, { headers: {"Authorization":admintoken}})
    .then(res => { console.log(res.data.message) })
    .catch(err => { console.log(err) })
}

// add new store manager 
export const addNewStoreManager = (storeManager) => {
    return axios.post("/admin/storeManager/register", {
        username: storeManager.username,
        email: storeManager.email,
        password: storeManager.password
    }, { headers: {"Authorization":admintoken}})
}

// get all store managers
export const getAllStoreManagers = () => {
    return axios.get("/admin/storeManager/storeManagers", { headers: {"Authorization":admintoken}})
}

// update store managers
export const updateStoreManager = (id, storeManager) => {
    return axios.put("/admin/storeManager/storeManagers/"+id, {
        username: storeManager.username,
        email: storeManager.email,
        password: storeManager.password
    }, { headers: {"Authorization":admintoken}})
    .then(res => {
        console.log(res)
    })
}

// delete store managers
export const deleteStoreManagers = (id) => {
    return axios.delete("/admin/storeManager/storeManagers/"+id, { headers: {"Authorization":admintoken}}).then(res => console.log(res))
}

// check authentication
export const isAdminAuthenticated = () => {
    if (localStorage.getItem('admintoken')) {
        return true
    }
    return false
}

export const isUserAuthenticated = () => {
    if (localStorage.getItem('usertoken')) {
        return true
    }
    return false
}