import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Layouts/AuthLayout'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import MainLayout from './Layouts/MainLayout'
import Home from './Pages/Home'
import PostDetails from './Pages/PostDetails'
import ProfilePage from './Pages/ProfilePage'
import NotFound from './Pages/NotFound'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import AuthProtectedRoute from './ProtectedRoutes/AuthProtectedRoute'

function App() {

const router = createBrowserRouter([{
  path:'', element: <AuthLayout/>, children:[
    {path: 'login', element:<AuthProtectedRoute> <LoginPage/></AuthProtectedRoute>},
    { path: 'register', element: <AuthProtectedRoute><RegisterPage /></AuthProtectedRoute> },
  ] 
},
{
  path:'' ,element: <MainLayout/>, children:[
    { index: true, element: <ProtectedRoute><Home /></ProtectedRoute>},
    {path:'post-details/:id' , element:<PostDetails/>},
    { path: 'profile', element: <ProfilePage />},
    { path: '*', element: <NotFound />},
  ]
}])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
