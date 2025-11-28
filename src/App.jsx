import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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

const client = new QueryClient()

const router = createBrowserRouter([{

  path: '', element: <AuthLayout />, children: [
    { path: 'login', element: <AuthProtectedRoute> <LoginPage /></AuthProtectedRoute> },
    { path: 'register', element: <AuthProtectedRoute><RegisterPage /></AuthProtectedRoute> },
  ]
},
{
  path: '', element: <MainLayout />, children: [
    { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
    { path: 'post-details/:id', element: <PostDetails /> },
    { path: 'profile', element: <ProfilePage /> },
    { path: '*', element: <NotFound /> },
  ]
}])


function App() {

  return (
    <QueryClientProvider  client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
