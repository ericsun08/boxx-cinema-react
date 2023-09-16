import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { changeUserPassword } from '../features/AuthDetailSlice'
import { handleSuccessModal, handleErrorMessage, openErrorModal } from '../features/AppSlice'
import PageHeader from '../components/PageHeader'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import { ThreeDots } from 'react-loader-spinner'

const ChangePassword = () => {
  const dispatch = useDispatch()

  const [userPassword, setUserPassword] = useState({})
  const [showPassword, setShowPassword] = useState({
    currentPassword: false, 
    newPassword:false, 
    newPasswordConfirmation:false
  })
  const [showPasswordWarning, setShowPasswordWarning] = useState(false)

  const { userInfo, loading } = useSelector((state) => state.auth)

  const handleShowPassword = (value) => {
    if(value === 'current-password'){
        setShowPassword({...showPassword, currentPassword: !showPassword.currentPassword})
    }
    if(value === 'new-password'){
        setShowPassword({...showPassword, newPassword: !showPassword.newPassword})
    }
    if(value === 'new-password-confirmation'){
        setShowPassword({...showPassword, newPasswordConfirmation: !showPassword.newPasswordConfirmation})
    }
  }

  const handlePasswordChange = (e) => {
    if(e.target.name === 'newPasswordConfirmation' && e.target.value !== userPassword.newPassword){
        setShowPasswordWarning(true)
    } else {
        setShowPasswordWarning(false)
    }
    setUserPassword({...userPassword, [e.target.name]: e.target.value})
  }

  const handlePasswordValidation = () => {
    if(!userPassword.currentPassword){
        return true
    }
    if(!userPassword.newPassword){
        return true
    }
    if(!userPassword.newPasswordConfirmation){
        return true
    }
    if(userPassword.newPasswordConfirmation !== userPassword.newPassword){
        return true
    }
    return false
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(changeUserPassword({body: userPassword, UserId: userInfo.UserId}))
        .then(unwrapResult)
        .then((data) => {
            dispatch(handleSuccessModal(data.data.message))
        })
        .catch((err) => {
            dispatch(openErrorModal())
            dispatch(handleErrorMessage(err))
        })
  }

  return (
    <div>
      <PageHeader title='Change Password'/>
      <form onSubmit={handleSubmit}>
        <div className='mx-7 mt-3'>
            <div className=''>
                <span>Current Password<span className='text-red-500'>*</span></span>
                <div className='my-2 relative'>
                    <input autoComplete='off' type={showPassword.currentPassword ? 'text' : 'password'} name='currentPassword' onChange={(e) => handlePasswordChange(e)} className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                    <div className='absolute right-5 cursor-pointer' style={{top: '12px'}} onClick={() => handleShowPassword('current-password')}>
                        {
                            showPassword.currentPassword ?
                                <IoEyeOffOutline size={20}/>
                            :
                                <IoEyeOutline size={20}/>
                        }
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <span>New Password<span className='text-red-500'>*</span></span>
                <div className='my-2 relative'>
                    <input autoComplete='off' type={showPassword.newPassword ? 'text' : 'password'} name='newPassword' onChange={(e) => handlePasswordChange(e)} className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                    <div className='absolute right-5 cursor-pointer' style={{top: '12px'}} onClick={() => handleShowPassword('new-password')}>
                        {
                            showPassword.newPassword ?
                                <IoEyeOffOutline size={20}/>
                            :
                                <IoEyeOutline size={20}/>
                        }
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <span>New Password Confirmation<span className='text-red-500'>*</span></span>
                <div className='my-2 relative'>
                    <input autoComplete='off' type={showPassword.newPasswordConfirmation ? 'text' : 'password'} name='newPasswordConfirmation' onChange={(e) => handlePasswordChange(e)} className={`w-full p-2 border-solid border rounded focus:ring focus:outline-none ${showPasswordWarning ? 'focus:ring-red-200' : 'focus:ring-green-200' }`}/>
                    <div className='absolute right-5 cursor-pointer' style={{top: '12px'}} onClick={() => handleShowPassword('new-password-confirmation')}>
                        {
                            showPassword.newPasswordConfirmation ?
                                <IoEyeOffOutline size={20}/>
                            :
                                <IoEyeOutline size={20}/>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className='mx-7 mt-6'>
            <button className={`w-full p-2 border-solid border rounded border-sky-950 flex items-center justify-center hover:bg-sky-950 hover:text-slate-100`} disabled={handlePasswordValidation()}>
                {
                    !loading ? 
                        'Update'
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

export default ChangePassword
