import { useQuery } from '@tanstack/react-query'
import React, { use } from 'react'
import axios from 'axios';
import Posts from '../Components/Post/Posts';
import { useState } from 'react';
import EditComment from '../Components/EditComment';
import EditModal from '../Components/EditModal';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import useDelete from '../Hooks/useDelete';
import useDeletePost from '../Hooks/useDelete';
import LoadingScreen from '../Components/LoadingScreen';
import CreatePost from '../Components/CreatePost';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");
  const [ImagePreview, setImagePreview] = useState(null)


  function test(e) {
    console.log(e.target.value);
  }
  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await axios.get('https://linked-posts.routemisr.com/users/profile-data', {
        headers: { token: localStorage.getItem('token') }
      });
      return response.data;
    }

  });

  const { data: postsData ,isLoading, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {

      const response = await axios.get('https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts', {
        headers: { token: localStorage.getItem('token') },

      });
      return response.data;
    }
  });

  const { handleDeletePost } = useDeletePost(refetch);
  console.log(postsData)

  return (

    <div>
      {/* HERO SECTION */}

      <div className="flex justify-center border-b-2 border-gray-300">
        <div className=" h-40 w-6xl flex  p-5 justify-center items-center ">
          <div className='relative'>
            <img src={profileData?.user.photo} alt=""
              className="w-24 h-24 rounded-full object-cover border-4 border-white  " />
            <button onClick={onOpen}
              className='absolute bottom-0 right-0 cursor-pointer bg-gray-200 p-2 rounded-full text-gray-600
             hover:text-gray-800 hover:bg-gray-300 hover:shadow-lg transition-all duration-300 '>
              <i className='fa fa-edit'></i>
            </button>
          </div>
          <div className="flex flex-col">
            <h2 className="ml-4 text-5xl">{profileData?.user.name}</h2>
            <h4 className="ml-4 text-2xl">{profileData?.user.email}</h4>
          </div>
        </div>
      </div>
    {/* CreatePost section */}
      <CreatePost getPosts={refetch} />

      {/* POSTS SECTION */}
      {/* <div className=" flex flex-col justify-center items-center mt-10">
        <h2 className="text-3xl mb-5 italic">Recent Posts</h2>
        <div className="w-2/3 ">
          {postsData?.posts.reverse().map((post) => (
            <div key={post._id}

              className='bg-transparent my-12 max-w-5xl mx-auto  '>
              {postsData?.posts?.length == 0 ? <div>You don't have any posts yet</div> : <Posts
                getAllPosts={refetch}
                posts={post}
                callbackFunction={handleDeletePost}
              />}
            </div>)
          )}
        </div>
        </div> */}

      <div className="container mt-10 mb-20 relative">
        {isLoading || isFetching ? (
          <div className="text-center py-10 text-xl absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center w-full h-full">
            <LoadingScreen></LoadingScreen>
          </div>
        ) : postsData?.posts?.length === 0 ? (
          <div className="text-center py-10 text-xl">
            You don't have any posts yet
          </div>
        ) : (
          [...postsData.posts].reverse().map((post) => (
            <div
              key={post._id}
              className="bg-transparent my-12 max-w-5xl mx-auto"
            >
              <Posts
                getAllPosts={refetch}
                posts={post}
                callbackFunction={handleDeletePost}
              />
            </div>
          ))
        )}
      </div>

      <div>
        <div className="flex flex-wrap gap-3">

          <div className="flex flex-wrap gap-3">


            <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose} >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Upload Photo</ModalHeader>
                    <ModalBody >
                      <div >
                        <Input

                          type="file"
                          onSubmit={(e) => test(e)}
                          placeholder='Upload your photo'
                          color='primary' />
                      </div>
                      <div className="relative my-5 rounded-2xl">
                        <img className='bg-cover w-full rounded-3xl' src={ImagePreview} alt="Preview" />
                        <button type='button' className='absolute top-3 right-3 bg-black text-white rounded-4xl p-1 text-xs '>
                          <i className="fa-solid fa-x "></i>
                        </button>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={deletePost}>
                        Upload
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>

      </div>

    </div>





  )

}