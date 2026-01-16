import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePostApi, getSinglePostApi } from '../Services/PostsServices'
import Posts from '../Components/Post/Posts'
import Comment from '../Components/Post/Comment'
import LoadingScreen from '../Components/LoadingScreen'
import { deleteCommentApi } from '../Services/CommentServices'
import { addToast } from '@heroui/toast'

export default function PostDetails() {
  const [post, setPost] = useState()
  const { id } = useParams()
  const navigate = useNavigate()

  async function getSinglePost() {
    const response = await getSinglePostApi(id)
    if (response.message == 'success') {
      setPost(response.post)

    }
  }
  // delete post function

  async function handleDeletePost(onClose, postId, setIsPostDeleting) {
    setIsPostDeleting(true)
    const data = await deletePostApi(postId)
    if (data.message == 'success') {
      await getSinglePost()

      setIsPostDeleting(false)
      addToast({
        title: 'Post Deleted!',
        color: 'success',
        timeout: 3000,
        shouldShowTimeoutProgress: true
      })
      onClose()
      navigate('/')
      

    } else {
      console.log(data)
      console.log(postId)
    }
  }

  // delete comment function

  async function handleDeleteComment(onClose, commentId, setIsDeletingComment) {
    setIsDeletingComment(true)
    const data = await deleteCommentApi(commentId)
    if (data.message == 'success') {
      await getSinglePost()
      setIsDeletingComment(false)
      addToast({
        title: 'Comment Deleted!',
        color: 'success',
        timeout: 3000,
        shouldShowTimeoutProgress: true
      })
    } else {
      setIsDeletingComment(false)
      addToast({
        title: data.message,
        color: 'danger',
        timeout: 3000,
        shouldShowTimeoutProgress: true
      })
      onClose()

    }

  }


  // get single post function

 
  useEffect(() => {
    getSinglePost()

  }, [])

  return (
    <div className=' mb-52'>
      {post ? <Posts
       getAllPosts={getSinglePost}
       posts={post}
       handleDeleteComment={handleDeleteComment}
       handleDeletePost={handleDeletePost}
        /> : <LoadingScreen />}

    </div>
  )
}
