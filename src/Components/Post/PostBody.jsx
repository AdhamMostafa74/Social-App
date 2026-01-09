import React from 'react'

export default function PostBody({caption, photo}) {
    return (
        <div className='border-b-gray-200 border-b-2'>
            {caption && <p className='py-2'>{caption}</p>}
            {photo && <img className='w-full bg-cover my-5' src={photo}  />}
        </div>
    )
}
