import { Button, CircularProgress, image, Textarea } from '@heroui/react'
import { addToast, ToastProvider } from "@heroui/toast";

import { useState } from 'react'
import { addPostApi } from '../Services/PostsServices'
import { useQueryClient } from '@tanstack/react-query'

export default function CreatePost({ getPosts }) {
    const [showButton, setShowButton] = useState(true)
    const [caption, setCaption] = useState('')
    const [selectedImage, setSelectedImage] = useState()
    const [imagePreview, setImagePreview] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()


    // handlePostSubmit

    async function handlePostSubmit(e) {
        e.preventDefault()
        const postData = new FormData()
        if (caption) {
            postData.append('body', caption)
        }
        if (selectedImage) {
            postData.append('image', selectedImage)
        }
        setIsLoading(true)
        try {
            await addPostApi(postData)
            await queryClient.invalidateQueries({ queryKey: ['posts'] })
            await getPosts()
            formReset()
            setIsLoading(false)
            setShowButton(true)
            addToast({
                title: 'Post Added!',
                color: 'success',
                timeout: 3000,
                shouldShowTimeoutProgress: true
            })
        } catch (err) {
            setIsLoading(false)
            addToast({
                title: err.message || 'Failed to add post',
                color: 'danger',
                timeout: 3000,
                shouldShowTimeoutProgress: true
            })
        }

    }



    // handleImage

    function handleImage(e) {


        if (e.target.files[0]) {
            setSelectedImage(e.target.files[0])
            setImagePreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    // handleImagePreviewRemoval

    function handleImagePreviewRemoval() {
        setImagePreview('')
        setSelectedImage(null)
        document.querySelector('#input').value = ''
    }

    // formReset

    function formReset() {
        setCaption('')
        handleImagePreviewRemoval()

    }

    return (
        <div className='drop-shadow-xl bg-gray-100 rounded-3xl max-w-4xl my-10 p-5 mx-auto'>
            {showButton && <Button color='' onPress={() => setShowButton(false)} className='w-full hover:bg-gray-400 text-xl italic  flex justify-baseline'>What's in your mind?   Share a post!</Button>
            }
            {!showButton && <form onSubmit={handlePostSubmit}>
                {/* Caption */}
                <div className="my-5">
                    <Textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        autoFocus
                        isClearable
                        label="Caption"
                        placeholder="What's in your mind"
                        variant="bordered"
                    />
                </div>


                {/* image  preview */}

                {
                    imagePreview && <div className="relative my-5 rounded-2xl">
                        <img className='bg-cover w-full rounded-3xl' src={imagePreview} alt="Preview" />
                        <button onClick={handleImagePreviewRemoval} type='button' className='absolute top-3 right-3 bg-black text-white rounded-4xl p-1 text-xs '>
                            <i className="fa-solid fa-x "></i>
                        </button>
                    </div>

                }


                {/* Action Buttons */}

                <div className="flex justify-between">
                    <label className='cursor-pointer'>
                        <input id='input' onChange={handleImage} className='hidden' type="file" accept='image/*' />
                        <div className=" flex justify-between text-xl font-bold italic ">
                            <div className="border border-gray-500 hover:bg-gray-300 transition duration-300 flex flex-row flex-nowrap items-center p-3 rounded-2xl">  <i className="fa-regular fa-image"></i>
                                <h2 className='ps-3'>Photo</h2></div>
                        </div>


                    </label>
                    <div className="flex justify-between gap-5">
                        <button onClick={() => setShowButton(true)} className=' bg-red-300 text-xl font-bold italic hover:bg-red-500 transition duration-300 flex flex-row flex-nowrap items-center p-3 rounded-2xl' type='button' >Cancel</button>

                        <button disabled={caption.trim() == '' && selectedImage == null || isLoading} type='submit' className='  text-xl font-bold italic disabled:bg-primary-50 disabled:cursor-not-allowed bg-primary-300 hover:bg-primary-500 transition duration-300 flex flex-row flex-nowrap items-center p-3 rounded-2xl' >


                            {isLoading ?
                                <CircularProgress className='flex flex-row gap-2' label="Posting..." aria-label='Loading' />
                                : 'Post'}
                        </button>
                    </div>
                </div>

            </form>}
        </div>
    )
}
