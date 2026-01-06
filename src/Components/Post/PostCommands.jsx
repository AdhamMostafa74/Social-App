import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PostCommands({ id }) {
    const [isCommentToggle, setIsCommentToggle] = useState(false)
    const location = useLocation()
    const isCommentDisabled = location.pathname === `/Post-details/${id}`
    const navigate = useNavigate()



    return (
        <div>
            <div className="flex w-full p-5 ">

                <button
                    disabled={isCommentDisabled}
                    onClick={() => navigate('Post-details/' + id)}
                    className=" disabled:hidden flex flex-row justify-center items-center w-full space-x-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={27}
                        height={27}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#838383"
                        strokeWidth={2}
                        strokeLinecap="square"
                        strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    <span className="font-semibold text-lg text-gray-600">Comment</span>
                </button>

            </div>
        </div>
    )
}
