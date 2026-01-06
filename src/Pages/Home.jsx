import { useEffect, useState } from 'react'
import getPostsApi, { deletePostApi } from '../Services/PostsServices'
import LoadingScreen from '../Components/LoadingScreen'
import Posts from '../Components/Post/Posts'
import CreatePost from '../Components/CreatePost'
import { addToast } from '@heroui/toast'
import { deleteCommentApi } from '../Services/CommentServices'

export default function Home() {
  
  // state variables
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [limit, setLimit] = useState()


  // get posts function
  async function getPosts() {
    const data = await getPostsApi()
    if (data.message == 'success') {
      setIsLoading(false)
      setPosts(data.posts)
      setLimit(data.paginationInfo.limit)
    }
  }

  // use effect to get posts on component mount
  useEffect(() => {
    getPosts()
  }, [])


  // delete post function

  async function handleDeletePost(onClose, postId, setIsPostDeleting) {
    setIsPostDeleting(true)
    const data = await deletePostApi(postId)
    if (data.message == 'success') {
      await getPosts()

      setIsPostDeleting(false)
      addToast({
        title: 'Post Deleted!',
        color: 'success',
        timeout: 3000,
        shouldShowTimeoutProgress: true
      })
      onClose()

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
      await getPosts()
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


  return (
    <div >
      <CreatePost getPosts={getPosts} />
      {

        isLoading ? <LoadingScreen /> :

          [...posts].slice(0, limit).map((posts) =>
            <div key={posts.id}
              className='bg-transparent my-20 max-w-5xl mx-auto  '>

              <Posts
                handleDeletePost={handleDeletePost}
                getAllPosts={getPosts}
                posts={posts}
                commentsLimit={1}
                handleDeleteComment={handleDeleteComment} />
            </div>)
      }
    </div>


  )
}
