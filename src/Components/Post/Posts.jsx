import { useContext, useState } from "react";
import CardHeader from "./CardHeader";
import PostBody from "./PostBody";
import PostCommands from "./PostCommands";
import PostFooter from "./PostFooter";
import Comment from "./Comment";
import { Button, Input, useDisclosure } from "@heroui/react";
import addCommentApi from "../../Services/CommentServices";
import { addToast, } from "@heroui/toast";

import { authContext } from "../../Context/AuthContext";
import DeleteModal from "../Modals/deleteModal";
import DropDown from "../DropDown";
import UpdatePostModal from "../Modals/UpdatePostModal";

export default function Posts({
    posts,
    commentsLimit,
    getAllPosts,
    handleDeletePost,
    handleDeleteComment,
    isDeleting,
    callbackFunction,


}) {

    const [visibleComment, setVisibleComment] = useState(3)
    const [isLoading, setIsLoading] = useState(false)
    const [isPostDeleting, setIsPostDeleting] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const { userData } = useContext(authContext)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenUpdatePost, onOpen: onOpenUpdatePost, onClose: onCloseUpdatePost } = useDisclosure();





    // handleCommentSubmit

    async function handleCommentSubmit() {
        setIsLoading(true)
        await addCommentApi(inputValue, posts.id)
        await getAllPosts()
        setIsLoading(false)
        setInputValue('')

        addToast({
            title: 'Comment Added!',
            color: 'success',
            timeout: 3000,
            shouldShowTimeoutProgress: true
        })

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
        <div className='shadow-xl max-w-4xl mx-auto my-5 p-5  rounded-3xl'>
            <div>
                <div className=" w-full rounded-md  h-auto py-3 px-3 mt-5">
                    <div className="w-full h-16 flex items-center justify-between  rounded pe-5 ">

                        {/* post header */}
                        <CardHeader avatar={posts.user.photo} name={posts.user.name} creationDate={posts.createdAt} />


                        {/* Dropdown menu */}
                        {userData?._id == posts?.user._id && <DropDown onOpen={onOpen} onOpenUpdatePost={onOpenUpdatePost} />}

                        {/* post body */}
                    </div>
                    <PostBody caption={posts.body}
                        photo={posts.image} />

                    {/* post footer */}

                    <PostFooter commentsNumber={posts.comments.length} />

                    {/* post commands */}

                    <PostCommands id={posts.id}
                        handleDeleteComment={handleDeleteComment}
                        handleDeletePost={handleDeletePost}
                        getPosts={getAllPosts}
                    />



                    {/* // add comment */}
                    <div className="mx-auto flex my-5 ">
                        <Input
                            size="lg"
                            placeholder="Leave your comment ..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            variant="bordered" endContent={
                                <Button
                                    isDisabled={inputValue.trim() == '' || inputValue.trim().length < 2}
                                    isLoading={isLoading}
                                    isIconOnly
                                    size="lg"
                                    className="bg-transparent p-0 m-0"
                                    onPress={handleCommentSubmit}>
                                    <i className="fa-regular fa-paper-plane cursor-pointer"></i>
                                </Button>} />
                    </div>


                    {/* comments list */}

                    {[...posts.comments].reverse().slice(0, commentsLimit ??
                        visibleComment).map((comments) => <div key={comments._id} >
                            <Comment
                                comments={comments}
                                getAllPosts={getAllPosts}
                                handleDeleteComment={handleDeleteComment} />


                        </div>)}

                    {/* Comments Limit */}
                    {posts.comments.length >= visibleComment && !commentsLimit &&
                        <Button
                            isLoading={isLoading}
                            onPress={handleMoreComments}
                            className="mx-auto block mt-5"
                            color="primary"
                            variant="bordered">
                            Load More Comments
                        </Button>}
                </div>
            </div>

            {/* modal view  */}
            <DeleteModal setIsDeleting={setIsPostDeleting}
                id={posts._id}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onOpen={onOpen}
                isDeleting={isPostDeleting}
                mainTitle={'Are you sure you want to delete this post?'}
                subTitle={'THIS ACTION CANNOT BE REVERTED'}
                callbackFunction={handleDeletePost ? handleDeletePost : callbackFunction} />

            <UpdatePostModal
                onOpen={onOpenUpdatePost}
                isOpen={isOpenUpdatePost}
                onClose={onCloseUpdatePost}
                post={posts}
                getAllPosts={getAllPosts} />

        </div>)
}
