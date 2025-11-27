import { useContext, useEffect, useState } from 'react'
import getPostsApi from '../Services/PostsServices'
import { map } from 'zod'
import LoadingScreen from '../Components/LoadingScreen'
import Posts from '../Components/Post/Posts'
import CreatePost from '../Components/CreatePost'
import { authContext } from '../Context/AuthContext'

export default function Home() {

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [limit, setLimit] = useState()

  async function getPosts() {
    const data = await getPostsApi()
    if (data.message == 'success') {
      setIsLoading(false)
      setPosts(data.posts)
      setLimit(data.paginationInfo.limit)
    }
  }


  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div >
      <CreatePost getPosts={getPosts}/>
      {

        isLoading ? <LoadingScreen /> :
          [...posts].reverse().slice(0, limit).map((posts) => <div key={posts.id} className='bg-transparent my-20 max-w-5xl mx-auto  '>
            <Posts getAllPosts={getPosts} posts={posts} commentsLimit={1} />

          </div>)

      }


    </div>


  )
}
