import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePostApi } from '../Services/PostsServices'
import Posts from '../Components/Post/Posts'
import Comment from '../Components/Post/Comment'
import LoadingScreen from '../Components/LoadingScreen'

export default function PostDetails() {
  const [post, setPost] = useState()
  const { id } = useParams()

  
  async function getSinglePost() {
    const response = await getSinglePostApi(id)
    if (response.message == 'success') {
      setPost(response.post)
      console.log(post)

    }
  }
  useEffect(() => {
    getSinglePost()

  }, [])

  return (
    <div>
      {post ? <Posts getAllPosts={getSinglePost} posts={post} /> : <LoadingScreen />}
     
    </div>
  )
}
