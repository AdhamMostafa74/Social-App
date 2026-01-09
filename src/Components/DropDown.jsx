import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import React from 'react'

export default function DropDown({ onOpen, setIsCommentEdited, onOpenUpdatePost }) {

    function handleEdit() {
        if (onOpenUpdatePost) {
            onOpenUpdatePost()
        } else if (setIsCommentEdited) {
            setIsCommentEdited(true)
        }
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <svg className="w-16 cursor-pointer outline-none" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round">
                    <circle cx={12} cy={12} r={1} />
                    <circle cx={19} cy={12} r={1} />
                    <circle cx={5} cy={12} r={1} />
                </svg>
            </DropdownTrigger>
            <DropdownMenu aria-label="Commands">
                <DropdownItem onPress={handleEdit} key="edit">Edit</DropdownItem>
                <DropdownItem onPress={onOpen} key="delete" className="text-danger" color="danger">
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>

    )
}