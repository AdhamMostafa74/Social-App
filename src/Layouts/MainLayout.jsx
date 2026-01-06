import React from 'react'
import { Outlet } from 'react-router-dom'
import AppNavbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function MainLayout() {
  return (
    <div className=''>
      <AppNavbar />
      <div className="flex-1 container">
        <Outlet />
      </div>
      <div>
        <Footer />

      </div>
      </div>

  )
}
