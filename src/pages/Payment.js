import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5"
import PageHeader from '../components/PageHeader'
import { openPanel, displayList } from '../features/showDetailSlice';
import { handleErrorMessage, openErrorModal,  } from '../features/AppSlice'

const Payment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const { selectedShow } = useSelector((state) =>  state.show)
  const { bookings } = useSelector((state) => state.book)

  const createdTime = bookings.createdAt
  const currentTime = new Date()

  const expiredTime = new Date(createdTime)
  expiredTime.setMinutes(expiredTime.getMinutes() + 10);

  const distance = Math.max(0, Math.floor((expiredTime - currentTime) / 1000))
 
  const [timer, setTimer] = useState(distance)

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(() => {
    const time = setInterval(() => {
        setTimer(prevState => Math.max(0, prevState - 1))
    },1000)

    return () => {
        clearInterval(time)
    }
  },[])

  useEffect(() => {
    const abortBooking = () => {
        navigate(-1)
        dispatch(openErrorModal(true))
        dispatch(handleErrorMessage('Booking Aborted'))
      }

    if(timer === 0){
        abortBooking()
    }
  },[timer, navigate, dispatch, userInfo])


  const handlePanel = () => {
    dispatch(openPanel())
    dispatch(displayList({isShowDetail:false, isCityList:false, isTheaterList:false, isPayment:true}))
  }

  return (
    <div>
      <PageHeader title="Payment"/>
      <div>
        <div className='Image-Container p-5'>
            <div className='flex justify-end items-center'>
                <IoTimerOutline size={20} color={'#e2e8f0'}/>
                <span className='ml-1 text-slate-200 font-semibold'>
                    {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
            </div>
            <div className='flex flex-col items-center justify-center mt-3'>
                <div>
                    <span className='text-slate-200 font-semibold'>
                        {selectedShow.Title}
                    </span>
                </div>
                <div className='my-4'>
                    <span className='text-slate-200'>
                        {selectedShow.TheaterName}
                    </span>
                </div>
                <div>
                    <span className='text-slate-200'>
                        {selectedShow.Date}, {moment(selectedShow.StartTime).format('HH:mm')} ~ {moment(selectedShow.EndTime).format('HH:mm')}
                    </span>
                </div>
            </div>
        </div>
        <div className='bg-slate-100 p-2'>
            <span className='ml-3'>Promo & Voucher</span>
        </div>
        <div className='flex justify-between cursor-pointer hover:bg-sky-100 p-6'>
            <span>E-Coupons</span>
            <MdKeyboardArrowRight size={25}/>
        </div>
        <div className='flex justify-between cursor-pointer hover:bg-sky-100 p-6'>
            <span>Voucher</span>
            <MdKeyboardArrowRight size={25}/>
        </div>
        <div className='bg-slate-100 p-2'>
            <span className='ml-3'>Payment Method</span>
        </div>
        <div className='flex justify-between cursor-pointer hover:bg-sky-100 p-6' onClick={() => handlePanel()}>
            <span>Credit & Debit Card</span>
            <MdKeyboardArrowRight size={25}/>
        </div>
        <div className='flex justify-between cursor-pointer hover:bg-sky-100 p-6'>
            <span>Transfer</span>
            <MdKeyboardArrowRight size={25}/>
        </div>
      </div>
    </div>
  )
}

export default Payment
