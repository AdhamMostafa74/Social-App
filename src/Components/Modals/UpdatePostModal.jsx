import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import {updatePostApi} from "../../Services/PostsServices";
import { addToast } from "@heroui/toast";

export default function UpdatePostModal({ onOpen, isOpen, onClose, post, getAllPosts }) {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(post?.image || '');

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            body: post?.body || '',
        }
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('body', data.body);
            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            await updatePostApi(post.id, formData);
            addToast({
                title: 'Post updated successfully',
                color: 'success',
                timeout: 3000,
                shouldShowTimeoutProgress: true
            });
            getAllPosts();
            onClose();
        } catch (error) {
            addToast({
                title: 'Error updating post',
                message: error.message,
                color: 'danger',
                timeout: 3000,
                shouldShowTimeoutProgress: true
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} size='lg' onClose={onClose}>
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader className="flex flex-col gap-1">Edit Post</ModalHeader>
                    <ModalBody>
                        <Textarea
                            label="Post Content"
                            placeholder="Update your post..."
                            {...register('body', { required: 'Content is required' })}
                            errorMessage={errors.body?.message}
                        />
                        <Input
                            type="file"
                            label="Update Image (optional)"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded" />
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary" type="submit" isLoading={isLoading}>
                            Update Post
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}

