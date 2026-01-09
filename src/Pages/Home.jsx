import { use, useEffect, useState } from 'react'
import getPostsApi, { deletePostApi } from '../Services/PostsServices'
import LoadingScreen from '../Components/LoadingScreen'
import Posts from '../Components/Post/Posts'
import CreatePost from '../Components/CreatePost'
import { addToast } from '@heroui/toast'
import { deleteCommentApi } from '../Services/CommentServices'
import useDeleteComment from '../Hooks/useDeleteComment'
import { useQuery } from '@tanstack/react-query'
import { data } from 'react-router-dom'
import useDeletePost from '../Hooks/useDeletePost'

export default function Home() {

  // state variables
  const [posts, setPosts] = useState([])
  const [limit, setLimit] = useState()

  // get posts function

  const { data: postsData, isLoading: isLoadingPosts, isFetching: isFetchingPosts, refetch: refetchPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await getPostsApi();
      return response;

    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });




  // delete post function


  const { handleDeletePost } = useDeletePost();

  // delete comment function


  const { handleDeleteComment } = useDeleteComment();

  return (
    <div >
      <CreatePost getPosts={refetchPosts} />
      {

        isFetchingPosts ? <LoadingScreen /> :

          [...postsData.posts].slice(0, postsData.paginationInfo.limit).map((posts) =>
            <div key={posts.id}
              className='bg-transparent my-20 max-w-5xl mx-auto  '>

              <Posts
                handleDeletePost={handleDeletePost}
                getAllPosts={refetchPosts}
                posts={posts}
                commentsLimit={1}
                handleDeleteComment={handleDeleteComment} />
            </div>)
      }
    </div>


  )
}
