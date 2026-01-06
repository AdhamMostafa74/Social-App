import React, { useContext } from 'react'
import { counterContext } from '../Context/CounterContext'

export default function Footer() {



  return (
    <div className='h-1/4 bg-linear-to-b from-primary-200 to-primary-600 mt-20'>

      <div >
        <div className=' container w-6xl' >
          <ul className='flex justify-center py-12 gap-4'>
            <li><a className='border rounded-full'
              href="https://www.facebook.com/adham.mostafa.372">
              <i className="fa-brands fa-facebook-f"></i>
            </a></li>
            <li><a className='border rounded-full'
              href="https://www.linkedin.com/in/adham-mostafa-845a91293/">
              <i className="fa-brands fa-linkedin-in"></i>
            </a></li>
            <li><a className='border rounded-full'
              href="https://github.com/AdhamMostafa74">
              <i className="fa-brands fa-github"></i>
            </a></li>
            <li><a className='border rounded-full'
              href="#">
              <i className="fa-brands fa-twitter"></i>
            </a></li>

          </ul>
        </div>
        <div className='justify-center text-center end-0 w-full p-4'>
          <h3>Unleash your social potential with our app!</h3>
          <h3>copyright @ 2025 SocialApp Inc. All rights reserved.</h3>
        </div>
     </div>
    </div>
  )
}
