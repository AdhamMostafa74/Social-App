import React from 'react'
import { Outlet } from 'react-router-dom'
import AppNavbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function MainLayout() {
  return (
    <div>
      <AppNavbar />
      <div className="container">
        <Outlet />
      <Footer/>
      </div>
    </div>)
}
