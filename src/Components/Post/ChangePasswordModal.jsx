import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
} from "@heroui/react";


export default function ChangePasswordModal({ isPasswordOpen, onPasswordOpenChange, backdrop, handleSubmit, register, errors, PasswordChange, isPasswordPending }) {
    return (
        <Modal isOpen={isPasswordOpen} placement="top-center" onOpenChange={onPasswordOpenChange} backdrop={backdrop}>
            <ModalContent>
                {(onPasswordClose) => (
                    <form onSubmit={handleSubmit((values) => PasswordChange(values))}>
                        <>
                            <ModalHeader className="flex flex-col gap-1">Change Password</ModalHeader>
                            <ModalBody>
                                <Input
                                    isInvalid={Boolean(errors.password?.message)}
                                    errorMessage={errors.password?.message}
                                    variant='bordered'
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    {...register('password')} />
                                <Input
                                    isInvalid={Boolean(errors.newPassword?.message)}
                                    errorMessage={errors.newPassword?.message}
                                    variant='bordered'
                                    label="New Password"
                                    placeholder="Enter your new password"
                                    type="password"
                                    {...register('newPassword')} />

                            </ModalBody>

                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onPasswordClose}>
                                    Close
                                </Button>
                                <Button
                                    type='submit'
                                    color="primary"
                                    isLoading={isPasswordPending}
                                    isDisabled={isPasswordPending}
                                >
                                    Change Password
                                </Button>
                            </ModalFooter>
                        </>
                    </form>
                )}
            </ModalContent>
        </Modal>
)
}
