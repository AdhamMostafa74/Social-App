import React from 'react'

export default function PostBody({caption, photo}) {
    return (
        <div>
            {caption && <p className='py-2'>{caption}</p>}
            {photo && <img className='w-full bg-cover my-5' src={photo}  />}
        </div>
    )
}
