import React, { useEffect } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { handleErrorMessage, openErrorModal } from '../features/AppSlice'
import { openPanel } from '../features/showDetailSlice'
import { getAllCityList, changeCity } from '../features/CityDetailSlice'
import { getAllTheaterList, changeTheater } from '../features/theaterDetailSlice'
import { payTickets } from '../features/BookDetailSlice'
import { ThreeDots } from 'react-loader-spinner'

const SlidePanel = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isPanelOpen, isShowDetail, isCityList, isTheaterList, isPayment, selectedShow, ticketQty, subTotal } = useSelector((state) => state.show)
  const { cities, selectedCityId } = useSelector((state) => state.city)
  const { theaters } = useSelector((state) => state.theater)
  const { bookings, loading } = useSelector((state) => state.book)
  const { userInfo } = useSelector((state) => state.auth)

  const bookingId = bookings.BookingId
  const userId = userInfo?.UserId

  useEffect(() => {
    dispatch(getAllTheaterList(selectedCityId))
  },[dispatch, selectedCityId])

  useEffect(() => {
    dispatch(getAllCityList())
  },[dispatch])

  const handleChangeCity = (CityName, CityId) => {
    dispatch(changeCity({CityName: CityName, CityId:CityId}))
  }

  const navigatePage = (path) => {
    navigate(path)
  }

  const handleModalClick = (e) => {
    if(isPayment){
      e.stopPropagation();
    }
  };

  const handlePayment = () => {
    dispatch(payTickets({BookingId: bookingId, UserId: userId}))
      .then(unwrapResult)
      .then(() => {
        navigate('/success-payment')
        dispatch(openPanel())
      })
      .catch((err) => {
        dispatch(openErrorModal())
        dispatch(handleErrorMessage(err))
      })
  }

  return (
    <div className={`overlay ${isPanelOpen ? 'block' : 'hidden'}`} onClick={() => dispatch(openPanel())} style={{zIndex:1000}}>
        <div className={`slide-panel-container ${isPanelOpen ? 'open' : ''}`} onClick={handleModalClick}>
            <div className="slide-panel-content">
                {
                  isCityList &&
                    cities?.map((value, index) => 
                        <div key={index} className='flex flex-row justify-between my-3 mx-3 p-3 cursor-pointer hover:bg-sky-100' onClick={() => handleChangeCity(value?.CityName, value?.CityId)}>
                            <div>
                                <span>{value?.CityName}</span>
                            </div>
                            <div>
                                <span>{value?.TotalCinema} Cinemas</span>
                            </div>
                        </div>
                    )
                }
                {
                  isTheaterList &&
                    theaters?.map((value, index) =>
                      <div key={index} className='flex flex-row justify-between my-3 mx-3 p-3 cursor-pointer hover:bg-sky-100' onClick={() => dispatch(changeTheater({Theater: value}))}>
                            <div>
                                <span>{value.TheatreName}</span>
                            </div>
                      </div>
                    )
                }
                {
                  isShowDetail &&
                  <div>
                    <div className='flex flex-col items-center'>
                      <div>
                        <img className='h-56 object-cover rounded' src={selectedShow?.ImageUrl} alt={selectedShow?.Title}/>
                      </div>
                      <div className='mt-5 text-center'>
                        <span className='font-semibold'>{selectedShow?.Title}</span>
                        <div className='mt-5 flex justify-between'>
                          <span>{selectedShow?.Date}, </span>
                          <div>
                            <span>{moment(selectedShow?.StartTime).format('HH:mm')}</span> ~ 
                            <span>{moment(selectedShow?.EndTime).format('HH:mm')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-8'>
                      <button className='w-full p-2 border-solid border rounded border-sky-950 flex items-center justify-center hover:bg-sky-950 hover:text-slate-100 active:bg-sky-950 active:text-slate-100' onClick={() => navigatePage('/seat-layout')}>
                        Select Seat
                      </button>
                    </div>
                  </div>
                }
                {
                  isPayment &&
                  <div className='p-3'>
                    <div>
                      <span className='font-semibold text-lg'>Credit & Debit Card</span>
                    </div>
                    <div className='border-b border-slate-300 border-solid'>
                      <div className='my-3'>
                        <input placeholder="Enter card number" type='number' name='email' className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                      </div>
                      <div className='my-3'>
                        <input placeholder="Expiry Date (MM/YY)" type='text' name='email' className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                      </div>
                      <div className='my-3'>
                        <input placeholder="Enter 3 digit CVV code" type='number' name='email' className='w-full p-2 border-solid border rounded focus:ring focus:outline-none'/>
                      </div>
                    </div>
                    <div className='mt-10 border-b border-slate-300 border-solid pb-5'>
                      <span className='text-slate-400'>Transaction Detail</span>
                      <div className='flex justify-between mt-3'>
                        <div className='flex flex-col'>
                          <span className='text-sm font-semibold'>
                            Movie Ticket x{ticketQty}
                          </span>
                          <span className='text-sm'>
                            {selectedShow?.Title}
                          </span>
                          <span className='text-sm'>
                            @ {selectedShow?.TheaterName}
                          </span>
                          <span className='text-sm'>
                            {selectedShow?.Date}, {moment(selectedShow?.StartTime).format('HH:mm')} ~ {moment(selectedShow?.EndTime).format('HH:mm')}
                          </span>
                        </div>
                        <div>
                          <span>Rp. {subTotal?.toLocaleString('en-US')}</span>
                        </div>
                      </div>
                      <div className='flex justify-between mt-3'>
                        <div className='flex flex-col'>
                          <span className='text-sm font-semibold'>
                            Booking Fee
                          </span>
                        </div>
                        <div>
                          <span>Rp. {}</span>
                        </div>
                      </div>
                    </div>
                    <div className='mt-5 flex flex-col items-end'>
                        <span className='text-slate-400'>
                          Total Due
                        </span>
                        <span>Rp. {subTotal?.toLocaleString('en-US')}</span>
                    </div>
                    <div className='mt-6'>
                        <button className={`w-full p-2 border-solid border rounded border-sky-950 flex items-center justify-center hover:bg-sky-950 hover:text-slate-100 active:bg-sky-950 active:text-slate-100`} onClick={() => handlePayment()}>
                        {
                            !loading ?
                                'Pay'
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
                }
            </div>
        </div>
    </div>
  )
}

export default SlidePanel
