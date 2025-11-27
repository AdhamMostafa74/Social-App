import axios from "axios";
const baseUrl = 'https://linked-posts.routemisr.com/'

// addCommentApi
export default async function addCommentApi(content, postId) {
    try {
        const { data } = await axios.post(baseUrl + 'comments' , {
            content: content,
            post: postId
        },{
            headers:{
                token: localStorage.getItem('token')
            }
        })
        return data;
    } catch (error) {
        return error.response ? error.response.data.error : error.message
    }
}


// deleteCommentApi
export async function deleteCommentApi(commentId) {
    try {
        const { data } = await axios.delete(baseUrl + 'comments/' + commentId , {
            headers:{
                token: localStorage.getItem('token')
            }
        })
        return data;
    } catch (error) {
        return error.response ? error.response.data.error : error.message
    }
}


// updateCommentApi
export  async function editCommentApi(content, commentId) {
    try {
        const { data } = await axios.put(baseUrl + 'comments/' + commentId ,{
            content: content,
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data;
    } catch (error) {
        return error.response ? error.response.data.error : error.message
    }
}