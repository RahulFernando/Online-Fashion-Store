import axios from 'axios';

let usertoken = ''
let admintoken = ''
let userid = ''

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
            console.log(res.data._id) 
            usertoken = res.data.token
            userid = res.data._id;
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
        console.log(res)
        if (res.data.type === 'admin') {
            admintoken = res.data.token
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
    return axios.get("/admin/mainCategory/mainCategories")
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
    return axios.get("/admin/subCategory/subCategories")
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
    if (admintoken) {
        return true
    }
    return false
}

export const isUserAuthenticated = () => {
    if (usertoken) {
        return true
    }
    return false
}

//get Item Details
export const getItemDetails = () => {
    return axios.get("/product/getItem")
}

//Return user id
export const getUserId = () => {

    if (usertoken) {
        return userid;
    }
    return null
}

//Add items to user's wish list

export const wishList = (id,itemid) => {

     return axios.post("/users/wishlist/add/"+id, {
       
         itemID: itemid
       
     })
    .then(res => console.log(res.data)
    )
    .catch(err => { console.log(err) })
}

//Display user's Wish list

export const displayWishList = (id) => {

    return axios.get("/users/wishlist/display/"+id)

}


//Delete user's Wish List Items

export const DeleteWishListItem = (userId,itemId) => {

    return axios.post("/users/wishlist/delete/"+userId, {
       
        itemID: itemId
      
    })
    .then(res => console.log(res.data)
    )
    .catch(err => { console.log(err) })

}

//Get Item details for a given Id

export const FindItem = (id) => {

    return axios.get("/product/getItem/"+id)
}

//add to items to user' cart

export const AddToCart = (id,itemid) => {

    return axios.post("/users/cart/add/"+id, {
      
        itemID: itemid
      
    })
   .then(res => console.log(res.data)
   )
   .catch(err => { console.log(err) })
}

