import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PageHeader from '../components/PageHeader'
import { getMovieById } from '../features/movieDetailSlice'
import moment from 'moment'
import QRCode from "react-qr-code"

const TicketDetail = () => {
  const dispatch = useDispatch()
  const { selectedTicket } = useSelector((state) => state.book)
  const { movie } = useSelector((state) => state.movie)

  useEffect(() => {
    dispatch(getMovieById(selectedTicket.MovieId))
  },[dispatch, selectedTicket])

  return (
    <div className='scroll-div overflow-y-scroll scrollbar-none h-full pb-16'>
      <PageHeader title="Ticket Detail"/>
      <div className='m-5'>
        <div className='bg-sky-900 p-4 rounded-t-lg'>
            <div className='text-center'>
                <span className='text-slate-100 font-semibold text-lg'>{selectedTicket.MovieTitle}</span>
            </div>
            <div className='flex flex-row p-3'>
                <div className='sm:w-48 w-32'>
                    <img className='rounded-lg drop-shadow-2xl' src={movie.ImageUrl} alt={selectedTicket.MovieTitle}/>
                </div>
                <div className='ml-5'>
                    <div className='grid sm:grid-cols-3 grid-cols-1'>
                        <div className=''>
                            <span className='text-slate-300 sm:text-md text-xs'>Date:</span>
                        </div>
                        <div className=''>
                            <span className='text-slate-100 sm:text-md text-xs'>{moment(selectedTicket.ShowDate).format('dddd, DD MMM YYYY')}</span>
                        </div>
                    </div>
                    <div className='grid sm:grid-cols-3 grid-cols-1'>
                        <div className=''>
                            <span className='text-slate-300 sm:text-md text-xs'>Cinema:</span>
                        </div>
                        <div className=''>
                            <span className='text-slate-100 sm:text-md text-xs'>{selectedTicket.City}-{selectedTicket.TheatreName}</span>
                        </div>
                    </div>
                    <div className='grid sm:grid-cols-3 grid-cols-1'>
                        <div className=''>
                            <span className='text-slate-300 sm:text-md text-xs'>Show Time:</span>
                        </div>
                        <div className=''>
                            <span className='text-slate-100 sm:text-md text-xs'>{moment(selectedTicket.ShowStartTime).format('HH:mm')}</span>
                        </div>
                    </div>
                    <div className='grid sm:grid-cols-3 grid-cols-1'>
                        <div className=''>
                            <span className='text-slate-300 sm:text-md text-xs'>Screen:</span>
                        </div>
                        <div className=''>
                            <span className='text-slate-100 sm:text-md text-xs'>{selectedTicket.ScreenName}</span>
                        </div>
                    </div>
                    <div className='grid sm:grid-cols-3 grid-cols-1'>
                        <div className=''>
                            <span className='text-slate-300 sm:text-md text-xs'>Seat:</span>
                        </div>
                        <div className=''>
                            {
                                selectedTicket.BookedSeats.map((value, index) => 
                                    <span key={index} className='text-slate-100 sm:text-md text-xs'>{value.SeatRow}{value.SeatNumber}, </span>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='p-4 border rounded-b-lg'>
            <div className='text-center'>
                <span className='font-semibold text-slate-400'>Booking Code</span>
            </div>
            <div className='my-5 flex justify-center'>
                <QRCode
                    value={selectedTicket.BookingId}
                />
            </div>
            <div className='p-4 my-5 border-dashed border-t-2 border-slate-300'>
                <div className='text-center'>
                    <span className='font-semibold text-slate-400'>Steps to Check In</span>
                </div>
                <div className='mt-5 flex flex-col'>
                    <span className='font-semibold text-slate-500'>1. Go to the cinema that you have booked.</span>
                    <span className='font-semibold text-slate-500'>2. Scan the QR Code at the available self ticket machine.</span>
                    <span className='font-semibold text-slate-500'>3. Show the printed ticket to the staff.</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail
