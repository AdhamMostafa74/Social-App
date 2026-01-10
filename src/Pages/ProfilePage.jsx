import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { use } from 'react'
import axios from 'axios';
import Posts from '../Components/Post/Posts';
import { useState } from 'react';
import EditComment from '../Components/EditComment';
import EditModal from '../Components/Modals/EditModal';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  addToast,
} from "@heroui/react";
import useDeletePost from '../Hooks/useDeletePost';
import LoadingScreen from '../Components/LoadingScreen';
import CreatePost from '../Components/CreatePost';
import { useForm } from 'react-hook-form';
import UpdatePhotoModal from '../Components/Modals/UpdatePhotoModal';
import ChangePasswordModal from '../Components/Post/ChangePasswordModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../Schema/ChangePasswordSchema';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const { isOpen: isPhotoOpen, onOpen: onPhotoOpen, onClose: onPhotoClose } = useDisclosure();
  const { isOpen: isPasswordOpen, onOpen: onPasswordOpen, onOpenChange: onPasswordOpenChange } = useDisclosure();

  const [backdrop, setBackdrop] = React.useState("blur");
  const [selectedImage, setSelectedImage] = useState()
  const [imagePreview, setImagePreview] = useState('')
  const queryClient = useQueryClient();


  // Queries & Hooks

  const { data: profileData, refetch: refetchProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await axios.get('https://linked-posts.routemisr.com/users/profile-data', {
        headers: { token: localStorage.getItem('token') }
      });
      return response.data;
    },


  });

  const { data: postsData, isLoading, isFetching, refetch: refetchPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {

      const response = await axios.get('https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts', {
        headers: { token: localStorage.getItem('token') },

      });
      return response.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const { mutate, isPending } = useMutation(
    {
      mutationFn: async (values) => {
        let formData = new FormData();
        formData.append('photo', values.photo[0]);
        console.log(values.photo[0])
        const response = await axios.put('https://linked-posts.routemisr.com/users/upload-photo', formData, {
          headers: { token: localStorage.getItem('token') }
        });

        return response.data;

      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        setImagePreview('');
        setSelectedImage(null);
        onPhotoClose();
        addToast({
          title: 'Success',
          type: 'success',
          message: 'Photo uploaded successfully',
          color: 'success',
          timeout: 3000,
          shouldShowTimeoutProgress: true
        });
      },
      onError: (error) => {
        addToast({
          title: 'Error',
          message: error.message,
          type: 'error',
          color: 'danger',
          timeout: 3000,
          shouldShowTimeoutProgress: true
        });
        console.error('Error uploading photo:', error.response?.data || error.message);
      }
    });

  const { mutate: PasswordChange, isPending: isPasswordPending } = useMutation(
    {
      mutationFn: async (values) => {

        const response = await axios.patch('https://linked-posts.routemisr.com/users/change-password', {
          password: values.password,
          newPassword: values.newPassword
        }, {
          headers: { token: localStorage.getItem('token') }
        });
      },
      onSuccess: () => {
        onPasswordOpenChange();
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        addToast({
          title: 'Success',
          type: 'success',
          message: 'Password changed successfully',
          color: 'success',
          timeout: 3000,
          shouldShowTimeoutProgress: true
        });
        localStorage.removeItem('token');
        window.location.href = '/login';
      },
      onError: (error) => {
        addToast({
          title: error.response?.data?.error || 'Error',
          message: error.message,
          type: 'error',
          color: 'danger',
          timeout: 3000,
          shouldShowTimeoutProgress: true
        });
      }
    });
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      'password': '',
      'newPassword': ''
    },
    resolver: zodResolver(schema),

  });

  const {
    handleSubmit: handlePhotoSubmit,
    register: registerPhoto
  } = useForm({
    defaultValues: {
      photo: null
    }
  });



  const { handleDeletePost } = useDeletePost(refetchPosts);




  // Functions


  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onPhotoOpen();
  };

  function handleImage(e) {

    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  function handleImagePreviewRemoval() {
    setImagePreview('')
    setSelectedImage(null)
    document.querySelector('#input').value = ''
  }


  return (

    <div className="overflow-x-hidden">
      {/* HERO SECTION */}

      <div className="flex justify-center border-b-2 border-gray-300 " >
        <div className=" w-full max-w-6xl flex flex-col sm:flex-row p-5 justify-center items-center gap-6  ">
          <div className='flex'>
            <div className='relative '>
              <img src={profileData?.user.photo} alt=""
                className="w-24 h-24 rounded-full object-cover border-4 border-white  " />
              <button onClick={onPhotoOpen}
                className='absolute bottom-0 right-0 cursor-pointer bg-gray-200 p-2 rounded-full text-gray-600
             hover:text-gray-800 hover:bg-gray-300 hover:shadow-lg transition-all duration-300 '>
                <i className='fa fa-edit'></i>
              </button>
            </div>
            <div className="flex flex-col justify-end ">
              <h2 className="ml-4 text-2xl sm:text-5xl">{profileData?.user.name}</h2>
              <h4 className="ml-4 text-lg sm:text-2xl">{profileData?.user.email}</h4>
            </div>
          </div>
          <button
            onClick={onPasswordOpen}
            className=' cursor-pointer bg-gray-200 p-2 rounded-xl text-gray-900 mb-3
             hover:text-gray-800 hover:bg-gray-300 hover:shadow-lg transition-all duration-300 '>
            Change Password
          </button>

        </div>
      </div>
      {/* CreatePost section */}
      <CreatePost getPosts={refetchPosts} />

      {/* POSTS SECTION */}


      <div className="container mt-10 mb-20 relative">

        {isLoading || isFetching ? (
          <div className='flex justify-center items-start -translate-y-40'>
            <LoadingScreen />

          </div>

        ) : postsData?.posts?.length === 0 ? (
          <div className="text-center py-10 text-xl">
            You don't have any posts yet
          </div>
        ) : (
          [...postsData.posts].reverse().map((post) => (
            <div
              key={post._id}
              className="bg-transparent my-12 max-w-full sm:max-w-5xl mx-auto"
            >
              <h2 className="text-3xl mb-5 italic text-center">Recent Posts</h2>

              <Posts
                getAllPosts={refetchPosts}
                posts={post}
                callbackFunction={handleDeletePost}
                
              />
            </div>
          ))
        )}
      </div>



      <UpdatePhotoModal
        isOpen={isPhotoOpen}
        onClose={onPhotoClose}
        backdrop={backdrop}
        handleImage={handleImage}
        imagePreview={imagePreview}
        handleImagePreviewRemoval={handleImagePreviewRemoval}
        mutate={mutate}
        isPending={isPending}
        register={registerPhoto}
        selectedImage={selectedImage}
        handleSubmit={handlePhotoSubmit} />

      <ChangePasswordModal
        isPasswordOpen={isPasswordOpen}
        onPasswordOpenChange={onPasswordOpenChange}
        backdrop={backdrop}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        PasswordChange={PasswordChange}
        isPasswordPending={isPasswordPending} />




    </div>





  )

}

