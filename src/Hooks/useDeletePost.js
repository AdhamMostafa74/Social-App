import { useState } from "react"
import { deletePostApi } from "../Services/PostsServices"
import { addToast } from '@heroui/toast'
import { useQueryClient } from '@tanstack/react-query'

export default function useDeletePost() {
    const queryClient = useQueryClient()


    async function handleDeletePost(onClose, postId, setIsDeleting) {
        setIsDeleting(true)
        try {
            const data = await deletePostApi(postId)
            if (data.message == 'success') {
                await queryClient.invalidateQueries({ queryKey: ['posts'] })
                onClose()
                addToast({
                    title: 'Post Deleted!',
                    color: 'success',
                    timeout: 3000,
                    shouldShowTimeoutProgress: true
                })
            }
        } catch (err) {
            addToast({
                title: err.message || 'Network Error',
                color: 'danger',
                timeout: 3000,
                shouldShowTimeoutProgress: true
            })
        }
        setIsDeleting(false)

    }

    return { handleDeletePost }
}