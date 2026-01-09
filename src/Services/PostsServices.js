import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const baseUrl = 'https://linked-posts.routemisr.com/'

export default async function getPostsApi() {

    try {
        const { data } = await axios.get(baseUrl + 'posts', {
            headers: {
                token: localStorage.getItem('token')
            },
            params: {
                sort: '-createdAt'
            }

        })
        return data;
    } catch (error) {
        return error.response ? error.response.data.error : error.message
    }

}

export async function addPostApi(postData) {

    try {
        const { data } = await axios.post(baseUrl + 'posts', postData, {
            headers: {
                token: localStorage.getItem('token')
            }
        })

        return data;
    } catch (error) {
        return error.response ? error.response.data.error : error.message
    }

}
export async function getSinglePostApi(postId) {

    try {
        const { data } = await axios.get(baseUrl + 'posts/' + postId, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data;
    } catch (error) {
        return error.response ? error.response.data.error : error.message
    }

}
export async function deletePostApi(postId) {

    try {
        const { data } = await axios.delete(baseUrl + 'posts/' + postId, {
            headers: {
                token: localStorage.getItem('token')
            }
        })

        return data;
    } catch (error) {
        return error.response ? error.response.data.error : error.message
    }

}


export async function updatePostApi(postId, postData) {

    try {
        const { data } = await axios.put(baseUrl + 'posts/' + postId, postData, {
            headers: {
                token: localStorage.getItem('token')
            }
        })

        return data;
    } catch (error) {
        return error.response ? error.response.data.error : error.message
    }

}