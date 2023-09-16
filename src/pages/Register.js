import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import { ThreeDots } from 'react-loader-spinner'
import PageHeader from '../components/PageHeader'
import { registerNewUser } from '../features/AuthDetailSlice'
import { handleErrorMessage, openErrorModal } from '../features/AppSlice'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, isLoggedin, userInfo } = useSelector((state) => state.auth)
    
    const [userDetail, setUserDetail] = useState({})
    const [showFirstPassword, setShowFirstPassword] = useState(false)
    const [showSecondPassword, setShowSecondPassword] = useState(false)
    const [showPasswordWarning, setShowPasswordWarning] = useState(false)

    const handleChangeDetail = (e) => {
        if(e.target.name === 'passwordConfirmation' && e.target.value !== userDetail.password){
            setShowPasswordWarning(true)
        } else {
            setShowPasswordWarning(false)
        }

        setUserDetail({...userDetail, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => {
        setShowFirstPassword(!showFirstPassword)
    }

    const handleShowPasswordConfirmation = () => {
        setShowSecondPassword(!showSecondPassword)
    }

    const formValidation = () => {
        if(!userDetail.email){
            return true
        }
        if(!userDetail.phoneNumber){
            return true
        }
        if(!userDetail.firstName){
            return true
        }
        if(!userDetail.password){
            return true
        }
        if(!userDetail.passwordConfirmation){
            return true
        }
        if(userDetail.passwordConfirmation !== userDetail.password){
            return true
        }
        return false
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        dispatch(registerNewUser(userDetail))
            .then(unwrapResult)
            .then(() => {
                navigate('/successPage')
            })
            .catch((err) => {
                dispatch(openErrorModal())
                dispatch(handleErrorMessage(err))
            })
    }

    if(isLoggedin && userInfo){
        return <Navigate to='/user-profile'/>
    }

    return (
        <div className='scroll-div overflow-y-scroll scrollbar-none h-full pb-16'>
            <PageHeader title="Register"/>
            <form onSubmit={handleSubmitForm}>
                <div className='mx-7 mt-3'>
                    <div className=''>
                        <span>Email<span className='text-red-500'>*</span></span>
                        <div className='my-2'>
                            <input type='email' name='email' onChange={(e) => handleChangeDetail(e)} className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <span>Phone Number<span className='text-red-500'>*</span></span>
                        <div className='my-2'>
                            <input type='number' name='phoneNumber' onChange={(e) => handleChangeDetail(e)} className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                        </div>
                    </div>
                </div>
                <div className='bg-slate-100 p-2 mt-5'>
                    <span className='ml-3'>Additional Info</span>
                </div>
                <div className='mx-7 mt-5'>
                    <div className=''>
                        <span>First Name<span className='text-red-500'>*</span></span>
                        <div className='my-2'>
                            <input type='text' name='firstName' onChange={(e) => handleChangeDetail(e)} className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <span>Last Name</span>
                        <div className='my-2'>
                            <input type='text' name='lastName' onChange={(e) => handleChangeDetail(e)} className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <span>Address</span>
                        <div className='my-2'>
                            <textarea type='text' name='address' className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                        </div>
                    </div>
                </div>
                <div className='bg-slate-100 p-2 mt-5'>
                    <span className='ml-3'>Security</span>
                </div>
                <div className='mx-7 mt-5'>
                    <div className=''>
                        <span>Password<span className='text-red-500'>*</span></span>
                        <div className='my-2 relative'>
                            <input autoComplete='off' type={showFirstPassword ? 'text' : 'password'} name='password' onChange={(e) => handleChangeDetail(e)} className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                            <div className='absolute right-5 cursor-pointer' style={{top:'10px'}} onClick={() => handleShowPassword()}>
                                {
                                    showFirstPassword ?
                                        <IoEyeOffOutline size={20}/>
                                    :
                                        <IoEyeOutline size={20}/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <span>Password Confirmation<span className='text-red-500'>*</span></span>
                        <div className='mt-1 relative'>
                            <input autoComplete='off' type={showSecondPassword ? 'text' : 'password'} name='passwordConfirmation' onChange={(e) => handleChangeDetail(e)} className={`w-full p-2 border-solid border rounded focus:outline-none focus:ring ${showPasswordWarning ? 'focus:ring-red-200' : 'focus:ring-green-200' }`}/>
                            <div className='absolute right-5 cursor-pointer' style={{top: '10px'}} onClick={() => handleShowPasswordConfirmation()}>
                                {
                                    showSecondPassword ?
                                        <IoEyeOffOutline size={20}/>
                                    :
                                        <IoEyeOutline size={20}/>
                                }
                            </div>
                        </div>
                        {
                            showPasswordWarning && <span className='text-xs text-red-600'>The passwords do not match</span>
                        }
                    </div>
                </div>
                <div className='mx-7 mt-6'>
                    <button className={`w-full p-2 border-solid border rounded border-sky-950 flex items-center justify-center active:bg-sky-950 active:text-slate-100 ${!formValidation ? 'hover:bg-sky-950 hover:text-slate-100' : ''}`} disabled={formValidation()}>
                        {
                            !loading ?
                                'Register'
                            :
                                <ThreeDots
                                    height={25}
                                    width={30}
                                    color='#082f49'
                                />
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register