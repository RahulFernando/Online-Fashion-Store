import axios from 'axios';


// get all main categories
export const getMainCategories = () => {
    return axios.get("/admin/mainCategory/mainCategories")
}

// get sub categories
export const getSubCategories = () => {
    return axios.get("/admin/subCategory/subCategories")
}

