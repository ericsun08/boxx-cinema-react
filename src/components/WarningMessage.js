import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit';
import { handleWarningModal } from '../features/AppSlice'
import { IoAlertCircleOutline } from "react-icons/io5"
import { abortBook } from '../features/BookDetailSlice'
import { handleErrorMessage, openErrorModal,  } from '../features/AppSlice'

const WarningMessage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const { isWarningMessage, warningMessage } = useSelector((state) => state.app)
  const { bookings } = useSelector((state) => state.book)

  const bookingId = bookings.BookingId

  const handleWarning = () => {
    dispatch(handleWarningModal({isOpen:false, message:null}))
  }

  const abortBooking = () => {
    dispatch(abortBook({BookingId: bookingId, UserId: userInfo.UserId}))
        .then(unwrapResult)
        .then((data) => {
            navigate('/')
            dispatch(openErrorModal(true))
            dispatch(handleErrorMessage(data.data.message))
        })
        .catch((err) => {
            dispatch(openErrorModal())
            dispatch(handleErrorMessage(err))
        })
    }

  return (
    <div className={`overlay flex justify-center items-center ${isWarningMessage ? 'block' : 'hidden'}`} onClick={() => handleWarning()}>
    <div className={`error-modal-container ${isWarningMessage ? 'open' : ''}`}>
      <div className="error-modal-content text-center">
          <div className='border-b border-slate-950 border-solid'>
              <div className='flex justify-center'>
                  <IoAlertCircleOutline
                      size={55}
                      color={'#fb923c'}
                  />
              </div>
              <div className='mt-1 mb-3'>
                  <span className='text-xl'>Warning!</span>
              </div>
          </div>
          <div className='mt-5'>
              <span>{warningMessage}</span>
          </div>
          <div className='flex justify-center my-2'>
            <button className='bg-slate-300 text-slate-150 py-2 px-5 m-2 rounded' onClick={() => handleWarning()}>
                No
            </button>
            <button className='bg-sky-950 text-slate-200 py-2 px-5 m-2 rounded' onClick={() => abortBooking()}>
                Yes
            </button>
          </div>
      </div>
    </div>
  </div>
  )
}

export default WarningMessage
