import { addToast } from "@heroui/toast"
import { deleteCommentApi } from "../Services/CommentServices"
import { useQueryClient } from "@tanstack/react-query"

export default function useDeleteComment() {
    const queryClient = useQueryClient()

    async function handleDeleteComment(onClose, commentId, setIsDeletingComment) {
        setIsDeletingComment(true)
        const data = await deleteCommentApi(commentId)
        if (data.message == 'success') {
            setIsDeletingComment(false)
            onClose()
            await queryClient.invalidateQueries({ queryKey: ['posts'] })

            addToast({
                title: 'Comment Deleted!',
                color: 'success',
                timeout: 3000,
                shouldShowTimeoutProgress: true
            })
        } else {
            setIsDeletingComment(false)
            addToast({
                title: data.message,
                color: 'danger',
                timeout: 3000,
                shouldShowTimeoutProgress: true
            })
            onClose()

        }
    } return { handleDeleteComment }
}