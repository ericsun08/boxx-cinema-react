import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { MdKeyboardArrowRight } from "react-icons/md";
import { editProfile, logoutUser, updateUserDetail } from '../features/AuthDetailSlice'
import PageHeader from '../components/PageHeader'
import { handleSuccessModal, openErrorModal, handleErrorMessage } from '../features/AppSlice';
import { ThreeDots } from 'react-loader-spinner'

const UserProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo, isEdit, loading } = useSelector((state) => state.auth)

  const [userDetail, setUserDetail] = useState({
    UserId: userInfo.UserId || "",
    FirstName: userInfo.FirstName || "",
    LastName: userInfo.LastName || "",
    PhoneNumber: userInfo.PhoneNumber || "",
    Address: userInfo.Address || "",
  })

  const handleInputChange = (e) => {
    setUserDetail({...userDetail, [e.target.name]: e.target.value})
  }

  const handleUserLogout = () => {
    dispatch(logoutUser())
    navigate('/myaccount')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateUserDetail(userDetail))
    .then(unwrapResult)
    .then((data) => {
      dispatch(editProfile())
      dispatch(handleSuccessModal(data.data.message ))
    })
    .catch((err) => {
      dispatch(openErrorModal())
      dispatch(handleErrorMessage(err))
    })
  }

  const navigatePage = (path) => {
    navigate(path)
  }

  return (
    <div className='scroll-div overflow-y-scroll scrollbar-none h-full pb-16'>
      <PageHeader title={!isEdit ? "My Profile" : "Edit Profile"}/>
      <div className='mt-4 mx-7'>
        <div className='flex justify-between'>
          <div className='p-2'>
            <span className='font-bold text-xl'>Hi, {userInfo.FirstName + ' ' + userInfo.LastName}</span>
          </div>
          <div>
            <img src={require('../assets/images/profile-blank.png')}  className='rounded-full h-10 w-10' alt="profile-blank"/>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='bg-slate-100 p-2 mt-5'>
            <span className='ml-3'>Profile</span>
        </div>
        <div className='mx-7 mt-5'>
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <span>First Name</span>
              <div className='my-2'>
                {
                  !isEdit ? 
                    <span className='font-semibold text-md'>{userInfo.FirstName}</span>
                  :
                    <input type='text' name='FirstName' value={userDetail.FirstName} onChange={(e) => handleInputChange(e)} className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                }
              </div>
            </div>
            <div>
              <span>Last Name</span>
              <div className='my-2'>
                {
                  !isEdit ?
                    <span className='font-semibold text-md'>{userInfo.LastName}</span>
                  :
                    <input type='text' name='LastName' value={userDetail.LastName} onChange={(e) => handleInputChange(e)} className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                }
              </div>
            </div>
          </div>
          <div className='mt-5 grid grid-cols-2 gap-3'>
            <div>
              <span>Phone Number</span>
              <div className='my-2'>
                {
                  !isEdit ? 
                    <span className='font-semibold text-md'>{userInfo.PhoneNumber}</span>
                  :
                    <input type='text' name='PhoneNumber' value={userDetail.PhoneNumber} onChange={(e) => handleInputChange(e)} className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                }
              </div>
            </div>
            <div>
              <span>Email Address</span>
              <div className='my-2'>
                {
                  !isEdit ? 
                    <span className='font-semibold text-md'>{userInfo.Email}</span>
                  :
                    <input type='text' name='Email' disabled={true} value={userInfo.Email} onChange={(e) => handleInputChange(e)} className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                }
              </div>
            </div>
          </div>
        </div>
        <div className='bg-slate-100 p-2 mt-5'>
          <span className='ml-3'>Address</span>
        </div>
        <div className='mx-7 mt-5'>
          <div className=''>
              <span>Address</span>
              <div className='my-2'>
                {
                  !isEdit ?
                    <span className='font-bold text-md'>{userInfo.Address ? userInfo.Address : '-'}</span>
                  :
                    <input type='text' name='Address' value={userDetail.Address} onChange={(e) => handleInputChange(e)} className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                }
              </div>
          </div>
        </div>
        {
          isEdit && 
          <div className='mx-7 mt-10'>
              <button className={`w-full p-2 border-solid border rounded border-sky-950 flex items-center justify-center`}>
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
        }
      </form>
      {
        !isEdit && 
        <>
        <div className='bg-slate-100 p-2 mt-5'>
          <span className='ml-3'>Security</span>
        </div>
        <div className=''>
          <div className='flex justify-between cursor-pointer hover:bg-sky-100 p-6' onClick={() => navigatePage('/change-password')}>
            <span>Change Password</span>
            <MdKeyboardArrowRight size={25}/>
          </div>
        </div>
        <div className='bg-slate-100 p-2'>
          <span className='ml-3'>Others</span>
        </div>
        <div className=''>
          <div className='flex justify-between cursor-pointer hover:bg-sky-100 p-6' onClick={() => navigatePage('/transaction-history')}>
            <span>Transaction History</span>
            <MdKeyboardArrowRight size={25}/>
          </div>
          <div className='flex justify-between cursor-pointer hover:bg-sky-100 p-6' onClick={() => navigatePage('/saved-movie')}>
            <span>Saved Movie</span>
            <MdKeyboardArrowRight size={25}/>
          </div>
          <div className='flex justify-between cursor-pointer hover:bg-sky-100 p-6' onClick={() => handleUserLogout()}>
            <span>Logout</span>
            <MdKeyboardArrowRight size={25}/>
          </div>
        </div>
        </>
      }
    </div>
  )
}

export default UserProfile
