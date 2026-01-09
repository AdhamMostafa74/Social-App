import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'

export default function UpdatePhotoModal({ isOpen,
    onClose,
    backdrop,
    handleImage,
    imagePreview,
    handleImagePreviewRemoval,
    mutate,
    isPending,
    register,
    selectedImage,
    handleSubmit }) {
    return (
        <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose} >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(mutate)}>

                        <>
                            <ModalHeader className="flex flex-col gap-1">Upload Photo</ModalHeader>
                            <ModalBody >
                                <div className='cursor-none'>
                                    <label className='cursor-pointer'>
                                        <input
                                            id='input'
                                            className='hidden'
                                            type="file"
                                            accept='image/*'
                                            {...register('photo', { onChange: (e) => handleImage(e) })} />
                                        <div className=" flex justify-between text-xl font-bold italic cursor-default">
                                            <div className="cursor-pointer border border-gray-500
                                             hover:bg-gray-300 transition duration-300 flex flex-row flex-nowrap items-center p-3 rounded-2xl">
                                                <i className="fa-regular fa-image"></i>
                                                <h2 className='ps-3'>Photo</h2>
                                            </div>
                                        </div>


                                    </label>
                                </div>
                                {imagePreview &&
                                    <div className="relative my-5 rounded-2xl">
                                        <img
                                            className='bg-cover w-full rounded-3xl'
                                            src={imagePreview} alt="Preview" />
                                        <button
                                            onClick={handleImagePreviewRemoval}
                                            type='button'
                                            className='absolute top-3 right-3 bg-black text-white rounded-4xl p-1 text-xs '>
                                            <i className="fa-solid fa-x "></i>
                                        </button>
                                    </div>}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    isLoading={isPending}
                                    isDisabled={!selectedImage || isPending}
                                    className="ml-2"
                                >
                                    Upload
                                </Button>
                            </ModalFooter>
                        </>
                    </form>

                )}

            </ModalContent>
        </Modal>)
}
