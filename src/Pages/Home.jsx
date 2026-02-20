import getPostsApi from '../Services/PostsServices'
import LoadingScreen from '../Components/LoadingScreen'
import Posts from '../Components/Post/Posts'
import CreatePost from '../Components/CreatePost'
import useDeleteComment from '../Hooks/useDeleteComment'
import { useQuery } from '@tanstack/react-query'
import useDeletePost from '../Hooks/useDeletePost'

export default function Home() {

  // state variables

  // get posts function

  const { data: postsData, isFetching: isFetchingPosts, isError, error, refetch: refetchPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await getPostsApi();
      return response;

    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
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
          isError ? <div className="text-center py-10 text-xl text-red-500">Error: {error?.message || 'Bad Gateway - Server is down'}</div> :
            postsData && postsData.posts && Array.isArray(postsData.posts) ?
              [...postsData.posts].slice(0, postsData.paginationInfo?.limit || 10).map((posts) =>
                <div key={posts.id}
                  className='bg-transparent my-20 max-w-5xl mx-auto  '>

                  <Posts
                    handleDeletePost={handleDeletePost}
                    getAllPosts={refetchPosts}
                    posts={posts}
                    commentsLimit={1}
                    handleDeleteComment={handleDeleteComment} />
                </div>) : null
      }
    </div>


  )
}
