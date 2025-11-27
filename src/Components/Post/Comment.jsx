import { useContext, useState } from 'react';
import DeleteModal from '../deleteModal';
import CardHeader from './CardHeader'
import { addToast, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, toast, useDisclosure } from "@heroui/react";
import { authContext } from '../../Context/AuthContext';
import { deleteCommentApi, editCommentApi } from '../../Services/CommentServices';
import { getSinglePostApi } from '../../Services/PostsServices';
import { useParams } from 'react-router-dom';
import DropDown from '../DropDown';


export default function Comment({ comments, getAllPosts, }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false)
    const { userData } = useContext(authContext)
    const [isCommentEdited, setIsCommentEdited] = useState(false)
    const [editInputValue, setEditInputValue] = useState(comments.content)
    const [isDisabled, setisDisabled] = useState(false)



    async function handleEditComment(commentId) {
        
        setIsLoading(true)
        const data = await editCommentApi(editInputValue, commentId)
        await getAllPosts()
        setIsLoading(false)
        setIsCommentEdited(false)
        addToast({
            title: 'Comment Edited!',
            color: 'success',
            timeout: 3000,
            shouldShowTimeoutProgress: true
        })
    }


    async function handleDeleteComment() {
        setIsLoading(true)
        const data = await deleteCommentApi(comments._id)
        if(data.message == 'success'){
            await getAllPosts()
            setIsLoading(false)
            addToast({
                title: 'Comment Deleted!',
                color: 'success',
                timeout: 3000,
                shouldShowTimeoutProgress: true
            })
        }else{
            setIsLoading(false)
            addToast({
                title: data.message,
                color: 'danger',
                timeout: 3000,
                shouldShowTimeoutProgress: true
            })
        }
       
    }

    return (
        <div className='max-w-4xl mx-auto py-2'>
            {isCommentEdited == false ? <div className=" h-16 flex items-center justify-between bg-gray-100 rounded px-5 shadow-lg">
                <CardHeader avatar={comments.commentCreator.photo} name={comments.commentCreator.name} subHeader={comments.content} />
                {
                    userData._id == comments.commentCreator._id && <DropDown setIsCommentEdited={setIsCommentEdited} onOpen={onOpen} />
                }
            </div>
                :
                <div className="flex flex-col  ">
                    <div className=' bg-gray-100  shadow-lg'>
                        <Input size="lg" value={editInputValue} onChange={(e) => setEditInputValue(e.target.value)} variant="bordered" />
                    </div>
                    <div className="flex justify-end gap-3 pt-5">
                        <Button onPress={() => setIsCommentEdited(false)}>Cancel</Button>
                        <Button isDisabled={editInputValue.trim() == '' || editInputValue.trim().length <2 } isLoading={isLoading} onPress={() => handleEditComment(comments._id)} color="primary">Edit</Button>
                    </div>
                </div>}
            <DeleteModal callbackFunction={() => handleDeleteComment(comments._id)} isLoading={isLoading} isOpen={isOpen} mainTitle={'Are you sure you want to delete this comment ?'} onOpen={onOpen} onOpenChange={onOpenChange} subTitle={'THIS ACTION CANNOT BE REVERTED'} />
        </div>
    )
}
