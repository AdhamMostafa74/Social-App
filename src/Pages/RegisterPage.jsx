import { Button, Input, Select, SelectItem } from '@heroui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from '../Schema/registerSchema'
import { loginApi, registerApi } from '../Services/AuthServices'
import { useNavigate } from 'react-router-dom'


export default function RegisterPage() {

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } , reset} = useForm({
    defaultValues: {
    "name": "",
      "email": "",
      "password": "",
      "rePassword": "",
      "dateOfBirth": "",
      "gender": ""
    },
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })
  async function handleRegister(formData) {
    setIsLoading(true)
    const data = await registerApi(formData)
    setIsLoading(false)
    if(data.error){
      setErrorMessage(data.error)
      setSuccessMessage('')
    }else{
      setErrorMessage('')
      setSuccessMessage(data.message + ', Redirected to Login in 2 seconds')
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    }
  }
  return (
    <div className="mx-auto py-12 w-1/2 my-12">
      <h2 className='text-center font-bold text-3xl pb-6' >Create new account</h2>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className='flex flex-col gap-6'>
          <Input isInvalid={Boolean(errors.name?.message)} errorMessage={errors.name?.message} variant='bordered' label="Name" placeholder="Enter your name" type="string" {...register('name')} />
          <Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors.email?.message} variant='bordered' label="Email" placeholder="Enter your email" type="email" {...register('email')} />
          <Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} variant='bordered' label="Password" placeholder="Enter your password" type="password" {...register('password')} />
          <Input isInvalid={Boolean(errors.rePassword?.message)} errorMessage={errors.rePassword?.message} variant='bordered' label="Confirm Password" placeholder="Enter confirm your password" type="password" {...register('rePassword')} />
          <Input isInvalid={Boolean(errors.dateOfBirth?.message)} errorMessage={errors.dateOfBirth?.message} variant='bordered' label="Date of birth" placeholder="Enter your date of birth" type="date" {...register('dateOfBirth')} />
          <Select isInvalid={Boolean(errors.gender?.message)} errorMessage={errors.gender?.message} variant='bordered' {...register('gender')}
            isRequired
            label="Gender"
          >
            <SelectItem key={'male'}>Male</SelectItem>
            <SelectItem key={'female'}>female</SelectItem>
          </Select>

          <Button isLoading={isLoading} className='w-1/2 mx-auto ' type="submit" color="primary" variant="bordered">
            Create account
          </Button>
          {errorMessage && <p className=' text-red-700 text-center mt-0 pt-0 bg-red-200 rounded w-1/2 mx-auto'>{errorMessage}</p>}
          {successMessage && <p className=' text-green-700 text-center mt-0 pt-0 bg-green-200 rounded w-1/2 mx-auto'>{successMessage}</p>}
          
        </div>
      </form>
    </div>
  )
}
