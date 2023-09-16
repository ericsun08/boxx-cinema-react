import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import PageHeader from '../components/PageHeader'
import moment from 'moment'
import { getSeatsByScreen } from '../features/SeatDetailSlice'
import { handleErrorMessage, openErrorModal } from '../features/AppSlice'
import { handleTicket } from '../features/showDetailSlice'
import { bookTicket } from '../features/BookDetailSlice'
import { logoutUser } from '../features/AuthDetailSlice'
import { ThreeDots } from 'react-loader-spinner'

const SeatLayout = () => { 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [selectedSeats, setSelectedSeats] = useState([])

  const { isLoggedin, userInfo } = useSelector((state) => state.auth)
  const { selectedShow } = useSelector((state) => state.show)
  const { seats } = useSelector((state) => state.seat)
  const { selectedCityName } = useSelector((state) => state.city)
  const { loading } = useSelector((state) => state.book)

  const quantity = selectedSeats.length
  const subTotal = selectedShow?.Price * selectedSeats.length

  useEffect(() => {
    dispatch(getSeatsByScreen({ScreenId:selectedShow.ScreenId, ShowId:selectedShow.ShowId}))
  },[dispatch,selectedShow])

  const handleSelectedSeat = (value) => {
    const { SeatId, SeatRow, SeatNumber } = value

    const isSeatSelected = selectedSeats.some(selectedSeats => selectedSeats.SeatId === SeatId)

    if(selectedSeats.length >= 6){
        if(isSeatSelected){
            setSelectedSeats(selectedSeats.filter(item => item.SeatId !== SeatId))
        } else {
            dispatch(openErrorModal())
            dispatch(handleErrorMessage('Max 6 selected seat'))
        }
    } else {
        if(isSeatSelected){
            setSelectedSeats(selectedSeats.filter(item => item.SeatId !== SeatId))
        } else {
            setSelectedSeats(prevState => [
                ...prevState,
                {
                    ShowId: selectedShow.ShowId,
                    SeatId: SeatId,
                    SeatRow: SeatRow,
                    SeatNumber:SeatNumber,
                    UserId: userInfo.UserId,
                    MovieId: selectedShow.MovieId,
                    MovieTitle:selectedShow.Title,
                    City:selectedCityName,
                    TheatreName:selectedShow.TheaterName,
                    ScreenName:selectedShow.ScreenName,
                    ShowDate:new Date(selectedShow.Date),
                    ShowStartTime:selectedShow.StartTime,
                    ShowEndTime:selectedShow.EndTime,
                    SubTotal:selectedShow?.Price * (selectedSeats.length+1),
                }
            ])
        }
    }
  }

  const handleBookSeat = () => {
    dispatch(bookTicket(selectedSeats))
        .then(unwrapResult)
        .then(() => {
            navigate('/payment')
            dispatch(handleTicket({quantity: quantity, subTotal:subTotal}))
        })
        .catch((err) => {
            dispatch(openErrorModal())
            dispatch(handleErrorMessage(err))
        }) 
  }

  const validationButton = () => {
    if(selectedSeats.length === 0){
        return true
    }
    return false
  }

  useEffect(() => {
    const tokenExp = localStorage.getItem('tokenExp')
    const tokenExpTime = new Date(tokenExp * 1000)

    if(tokenExp){
        if(tokenExpTime && new Date() > tokenExpTime){
            dispatch(logoutUser())
            navigate('/myaccount')
            dispatch(openErrorModal(true))
            dispatch(handleErrorMessage('Token Expired'))
        }
    }
  },[dispatch, navigate])

  if(!isLoggedin && !userInfo){
    localStorage.setItem('intendedPath', '/seat-layout')
    return <Navigate to='/myaccount'/>
  }

  return (
    <div className='scroll-div overflow-y-scroll scrollbar-none h-full pb-20'>
      <PageHeader title="Select Seat"/>
      <div className='mx-5 flex'>
        <div>
            <img className="h-36 object-cover rounded" src={selectedShow.ImageUrl} alt={selectedShow.Title}/>
        </div>
        <div className='ml-5'>
            <div>
                <span className='font-semibold sm:text-lg text-sm'>{selectedShow.Title}</span>
            </div>
            <div className='mt-5'>
                <span className='sm:text-md text-sm'>{selectedShow.Date}, {moment(selectedShow.StartTime).format('HH:mm') + '~' + moment(selectedShow.EndTime).format('HH:mm')}</span>
            </div>
            <div className='mt-2'>
                <span className='sm:text-md text-sm'>{selectedShow.TheaterName} - {selectedShow.ScreenName}</span>
            </div>
        </div>
      </div>
      <div className='my-5'>
        <div className='relative text-center mb-20' style={{height:'600px'}}>
            <div className='w-full bg-slate-500 text-slate-50 p-1'>
                <span className='font-semibold'>SCREEN</span>
            </div>
            <div className='absolute w-full p-6 overflow-auto bg-slate-200'>
                <div className='flex justify-center space-x-14 m-3' style={{width:'700px'}}>
                    <div className=''>
                        {
                            seats?.data?.Rows?.toReversed().map((value, index) => 
                                <div key={index} className='grid grid-cols-6'>
                                    {
                                        value?.seats?.toReversed().slice(0,6).map((val, idx) => {
                                            const isSeatLockedorBooked = val.BookedSeats[0]?.Status === 'Locked' || val.BookedSeats[0]?.Status === 'Booked';
                                            const isSelected = selectedSeats.some(item => item.SeatId === val.SeatId);
                                            return (
                                                <div 
                                                    key={idx} 
                                                    className={`${isSelected ? 'bg-sky-400' : isSeatLockedorBooked ? 'bg-rose-400' : 'bg-slate-50'} w-10 h-10 m-1 flex items-center justify-center rounded ${!isSeatLockedorBooked && 'cursor-pointer hover:bg-sky-200'}`} 
                                                    onClick={() => !isSeatLockedorBooked ? handleSelectedSeat(val) : ''}
                                                >
                                                    <span className='text-xs'>{val.SeatRow}{val.SeatNumber}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div>
                        {
                            seats?.data?.Rows?.toReversed().map((value, index) => 
                                <div key={index} className='grid grid-cols-6'>
                                    {
                                        value?.seats?.toReversed().slice(6,12).map((val, idx) => {
                                            const isSeatLockedorBooked = val.BookedSeats[0]?.Status === 'Locked' || val.BookedSeats[0]?.Status === 'Booked';
                                            const isSelected = selectedSeats.some(item => item.SeatId === val.SeatId);
                                            return (
                                                <div 
                                                    key={idx} 
                                                    className={`${isSelected ? 'bg-sky-400' : isSeatLockedorBooked ? 'bg-rose-400' : 'bg-slate-50'} w-10 h-10 m-1 flex items-center justify-center rounded ${!isSeatLockedorBooked && 'cursor-pointer hover:bg-sky-200'}`} 
                                                    onClick={() => !isSeatLockedorBooked ? handleSelectedSeat(val) : ''}
                                                >
                                                    <span className='text-xs'>{val.SeatRow}{val.SeatNumber}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className='p-4 absolute bottom-0 w-full bg-slate-100'>
        <div className='flex justify-between items-center'>
            <div>
                <span>Subtotal</span>
                <div>
                    <span className='font-bold text-lg'>Rp. {subTotal.toLocaleString('en-US')}</span>
                </div>
            </div>
            <div>
                <button className='p-2 px-5 border-solid border rounded border-sky-950 hover:bg-sky-950 hover:text-slate-100' disabled={validationButton()} onClick={() => handleBookSeat()}>
                {
                            !loading ?
                                'Next'
                            :
                                <ThreeDots
                                    height={25}
                                    width={30}
                                    color='#082f49'
                                />
                        }
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SeatLayout
