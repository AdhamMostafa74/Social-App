import { useContext, useState } from "react";
import CardHeader from "./CardHeader";
import PostBody from "./PostBody";
import PostCommands from "./PostCommands";
import PostFooter from "./PostFooter";
import Comment from "./Comment";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, toast, useDisclosure } from "@heroui/react";
import addCommentApi, { editCommentApi } from "../../Services/CommentServices";
import { addToast,  } from "@heroui/toast";

import { authContext } from "../../Context/AuthContext";
import { deletePostApi } from "../../Services/PostsServices";
import DeleteModal from "../deleteModal";
import DropDown from "../DropDown";

export default function Posts({ posts, commentsLimit, getAllPosts }) {
    const [visibleComment, setVisibleComment] = useState(3)
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const { userData } = useContext(authContext)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    

    // handleCommentSubmit

    async function handleCommentSubmit() {
        setInputValue('')
        setIsLoading(true)
        await addCommentApi(inputValue, posts.id)
        await getAllPosts()
        setIsLoading(false)
        addToast({
            title: 'Comment Added!',
            color: 'success',
            timeout: 3000,
            shouldShowTimeoutProgress: true
        })

    }

    // handleDeletePost

    async function handleDeletePost(onClose) {
        setIsLoading(true)
        const data = await deletePostApi(posts._id)
        if (data.message == 'success') {
            await getAllPosts()

            setIsLoading(false)
            onClose()
            addToast({
                title: 'Post Deleted!',
                color: 'success',
                timeout: 3000,
                shouldShowTimeoutProgress: true
            })
        } else {
            // console.log(data)
        }
    }


    // handleMoreComments

    function handleMoreComments() {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setVisibleComment(visibleComment * 2)
        }, 1000);
    }


    return (
        <div className='shadow-2xl max-w-4xl mx-auto my-5 p-5  rounded-3xl'>
            <div>
                <div className=" w-full rounded-md  h-auto py-3 px-3 mt-5">
                    <div className="w-full h-16 flex items-center justify-between  rounded pe-5 ">

                        {/* post header */}
                        <CardHeader avatar={posts.user.photo} name={posts.user.name} subHeader={posts.createdAt} />


                        {/* Dropdown menu */}
                        {userData._id == posts.user._id && <DropDown onOpen={onOpen} />}

                        {/* post body */}
                    </div>
                    <PostBody caption={posts.body} photo={posts.image} />

                    {/* post footer */}

                    <PostFooter commentsNumber={posts.comments.length} />

                    {/* post commands */}

                    <PostCommands id={posts.id} />



                    {/* // add comment */}
                   <div className="mx-auto flex my-5 ">
                        <Input size="lg" placeholder="Leave your comment ..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} variant="bordered" endContent={
                            <Button isDisabled={inputValue.trim() == '' || inputValue.trim().length < 2} isLoading={isLoading} isIconOnly size="lg" className="bg-transparent p-0 m-0" onPress={handleCommentSubmit}>
                                <i className="fa-regular fa-paper-plane cursor-pointer"></i>
                            </Button>} />
                    </div>


                    {/* comments list */}

                    {[...posts.comments].reverse().slice(0, commentsLimit ?? visibleComment).map((comments) => <div key={comments._id} >
                       <Comment comments={comments} getAllPosts={getAllPosts} />
                            
                           
                    </div>)}

                    {/* show more comments */}
                    {posts.comments.length >= visibleComment && !commentsLimit && <Button isLoading={isLoading} onPress={handleMoreComments} className="mx-auto block mt-5" color="primary" variant="bordered">
                        Load More Comments
                    </Button>}
                </div>
            </div>

            {/* modal view  */}
            <DeleteModal isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen} isLoading={isLoading} mainTitle={'Are you sure you want to delete this post?'} subTitle={'THIS ACTION CANNOT BE REVERTED'} callbackFunction={handleDeletePost} />

            {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Post</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are You sure that you want to delete this post ?
                                </p>
                                <p className="text-danger">
                                    THIS ACTION CAN'T BE REVERTED
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button isLoading={isLoading} color="primary" onPress={() => handleDeletePost(onClose)}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal> */}

        </div>)
}
