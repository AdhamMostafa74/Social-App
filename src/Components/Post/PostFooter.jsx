import React from 'react'

export default function PostFooter({ commentsNumber }) {
    return (
        <div className='border-b-gray-200 border-b-2'>
            <div className="w-full h-8 flex items-center px-3 my-3">
              
                <div className="w-full text-center">
                    <p className="ml-3 text-gray-500">{commentsNumber} Comment</p>
                </div>
            </div>
        </div>
    )
}
