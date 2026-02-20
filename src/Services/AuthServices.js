import axios from "axios";
const baseUrl = 'https://linked-posts.routemisr.com/'

export async function registerApi(formData) {
    try {
        const { data } = await axios.post(baseUrl + 'users/signup', formData)
        return data

    } catch (error) {
        throw new Error(error.response ? error.response.data.error : error.message)
    }
}
export async function loginApi(formData) {
    try {
        const { data } = await axios.post(baseUrl + 'users/signin', formData)
        return data

    } catch (error) {
        throw new Error(error.response ? error.response.data.error : error.message);
    }
}
export async function getLoggedUserDataApi() {
    try {
        const { data } = await axios.get(baseUrl + 'users/profile-data',
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        )
        return data

    } catch (error) {
        throw new Error(error.response ? error.response.data.error : error.message);
    }
}


