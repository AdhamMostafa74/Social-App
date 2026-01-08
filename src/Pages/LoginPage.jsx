import { Button, Input } from '@heroui/react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from '../Schema/LoginSchema'
import { loginApi, } from '../Services/AuthServices'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../Context/AuthContext'


export default function LoginPage() {

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const { isLoggedIn, setisLoggedIn } = useContext(authContext)


  const { register, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: {
      "email": "",
      "password": "",
    },
    resolver: zodResolver(schema),
  })
  async function handleLogin(formData) {
    setIsLoading(true)
    const data = await loginApi(formData)
    setIsLoading(false)
    if (data.message == 'success') {
      localStorage.setItem('token', data.token)
      setisLoggedIn(true)
      navigate('/')

    } else {
     setErrorMessage(data.error)
    }
  }
  return (
    <div className="mx-auto py-12 w-1/2 my-12">
      <h2 className='text-center font-bold text-3xl pb-6' >Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className='flex flex-col gap-6'>
          <Input
            isInvalid={Boolean(errors.email?.message)}
            errorMessage={errors.email?.message}
            variant='bordered'
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register('email')} />
          <Input
            isInvalid={Boolean(errors.password?.message)}
            errorMessage={errors.password?.message}
            variant='bordered'
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register('password')} />
          <Button isLoading={isLoading} className='w-1/2 mx-auto ' type="submit" color="primary" variant="bordered">
            Login
          </Button>
          {errorMessage && <p className=' text-red-700 text-center mt-0 pt-0 bg-red-100 rounded w-1/2 mx-auto'>{errorMessage}</p>}
          <p className='text-center font-bold underline'>Don't have and account? <Link className='text-blue-500' to={'/register'}>Sign up</Link></p>

        </div>
      </form>
    </div>
  )
}
