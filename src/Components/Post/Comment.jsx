import { useContext, useState } from 'react';
import DeleteModal from '../Modals/deleteModal';
import CardHeader from './CardHeader'
import { Input, useDisclosure } from "@heroui/react";
import { authContext } from '../../Context/AuthContext';
import DropDown from '../DropDown';
import EditComment from '../EditComment';


export default function Comment({
    comments,
    getAllPosts,
    handleDeleteComment }) {


    // state variables
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false)
    const [isDeletingComment, setIsDeletingComment] = useState(false)
    const { userData } = useContext(authContext)
    const [isCommentEdited, setIsCommentEdited] = useState(false)
    const [editInputValue, setEditInputValue] = useState(comments.content)


    return (
        <div className='max-w-4xl mx-auto py-2'>
            {isCommentEdited == false ?

                // add comment section
                <div className=" h-16 flex items-center justify-between bg-gray-100 rounded px-5 shadow-lg">

                    <CardHeader
                        avatar={comments.commentCreator.photo}
                        name={comments.commentCreator.name}
                        subHeader={comments.content} />
                    {
                        userData?._id == comments.commentCreator._id
                        &&
                        <DropDown setIsCommentEdited={setIsCommentEdited}
                            onOpen={onOpen} />
                    }
                </div>

                :

                // edit comment section
                <EditComment editInputValue={editInputValue}
                    setEditInputValue={setEditInputValue}
                    id={comments._id}
                    setIsCommentEdited={setIsCommentEdited}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    getAllPosts={getAllPosts}
                />
            }


            {/* delete modal view */}

            <DeleteModal
                callbackFunction={handleDeleteComment}
                getAllPosts={getAllPosts}
                isDeleting={isDeletingComment}
                isOpen={isOpen}
                mainTitle={'Are you sure you want to delete this comment ?'}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                subTitle={'THIS ACTION CANNOT BE REVERTED'}
                id={comments._id}
                setIsDeleting={setIsDeletingComment} />
        </div>
    )
}
