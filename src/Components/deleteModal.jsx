import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import React from 'react'

export default function DeleteModal({ isLoading, mainTitle, subTitle, callbackFunction, onOpen, isOpen, onOpenChange }) {


  return (
    <div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                              <Button isLoading={isLoading} color="primary" onPress={() => callbackFunction(onClose)}>
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
