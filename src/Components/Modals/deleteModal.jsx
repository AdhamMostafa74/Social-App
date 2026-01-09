import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import useDeleteComment from '../../Hooks/useDeleteComment';

export default function DeleteModal({
    isDeleting,
    mainTitle,
    subTitle,
    callbackFunction,
    isOpen,
    onOpenChange,
    id,
    setIsDeleting }) {

    const { handleDeleteComment } = useDeleteComment()
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
                            <ModalBody>
                                <p>
                                    {mainTitle}
                                </p>
                                <p className="text-danger">
                                    {subTitle}
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button isLoading={isDeleting}
                                    color="primary"
                                    onPress={() => callbackFunction(onClose, id, setIsDeleting)}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}
