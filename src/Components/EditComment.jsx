import { addToast, Button, Input } from "@heroui/react";
import { editCommentApi } from "../Services/CommentServices";

export default function EditComment({
    setIsCommentEdited,
    editInputValue,
    isLoading,
    setIsLoading,
    getAllPosts,
    id,
    setEditInputValue
}) {

    // edit comment function
    async function handleEditComment() {
        setIsLoading(true)
        try {
            const data = await editCommentApi(editInputValue, id)
            await getAllPosts()
            setIsCommentEdited(false)
            setIsLoading(false)
            addToast({
                title: 'Comment Edited!',
                color: 'success',
                timeout: 3000,
                shouldShowTimeoutProgress: true
            })
        } catch (err) {
            setIsLoading(false)
            addToast({
                title: err.message || 'Failed to edit comment',
                color: 'danger',
                timeout: 3000,
                shouldShowTimeoutProgress: true
            })
        }
    }

    return (<>

        <div className="flex flex-col  ">
            <div className=' bg-gray-100  shadow-lg'>
                <Input
                    size="lg"
                    value={editInputValue}
                    onChange={(e) => setEditInputValue(e.target.value)}
                    variant="bordered" />
            </div>
        </div>

        <div className="flex justify-end gap-3 pt-5">
            <Button onPress={() => setIsCommentEdited(false)}>Cancel</Button>
            <Button isDisabled={editInputValue.trim() == '' || editInputValue.trim().length < 2}
                isLoading={isLoading}
                onPress={() => handleEditComment()}
                color="primary">Edit</Button>
        </div>
    </>
    )
}
