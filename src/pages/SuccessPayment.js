import React from 'react'
import { useSelector } from 'react-redux'
import { IoCheckmarkCircleOutline } from "react-icons/io5"
import moment from 'moment'
import QRCode from "react-qr-code"

const SuccessPayment = () => {
  const { bookedDetails } = useSelector((state) => state.book)

  const { BookingDetail, BookedSeat } = bookedDetails.data

  return (
    <div className='scroll-div overflow-y-scroll scrollbar-none h-full pb-14 my-5'>
      <div className='text-center'>
        <div className='flex justify-center mb-3'>
            <IoCheckmarkCircleOutline 
                size={80}
                color={'#4ade80'}
            />
        </div>
        <span className='font-bold'>Ticket Successfully Purchased!</span>
      </div>
      <div className='mt-5'>
        <div className='bg-slate-100 p-2 mt-5'>
            <span className='ml-3'>Booking Details</span>
        </div>
        <div className='grid sm:grid-cols-3 grid-cols-2 gap-1 m-5'>
            <div>
                <span>Movie:</span>
            </div>
            <div>
                <span className='font-semibold'>{BookingDetail.MovieTitle}</span>
            </div>
        </div>
        <div className='grid sm:grid-cols-3 grid-cols-2 gap-1 m-5'>
            <div>
                <span>Cinema:</span>
            </div>
            <div>
                <span className='font-semibold'>{BookingDetail.TheatreName} - {BookingDetail.City}</span>
            </div>
        </div>
        <div className='grid sm:grid-cols-3 grid-cols-2 gap-1 m-5'>
            <div>
                <span>Date:</span>
            </div>
            <div>
                <span className='font-semibold'>{moment(BookingDetail.ShowDate).format('dddd, DD MMM YYYY')}</span>
            </div>
        </div>
        <div className='grid sm:grid-cols-3 grid-cols-2 gap-1 m-5'>
            <div>
                <span>Show Time:</span>
            </div>
            <div>
                <span className='font-semibold'>{moment(BookingDetail.ShowStartTime).format('HH:mm')}</span>
            </div>
        </div>
        <div className='grid sm:grid-cols-3 grid-cols-2 gap-1 m-5'>
            <div>
                <span>Screen:</span>
            </div>
            <div>
                <span className='font-semibold'>{BookingDetail.ScreenName}</span>
            </div>
        </div>
        <div className='grid sm:grid-cols-3 grid-cols-2 gap-1 m-5'>
            <div>
                <span>Seat:</span>
            </div>
            <div>
                {
                    BookedSeat.map((value, index) => 
                        <span key={index} className='font-semibold'>{value.SeatRow}{value.SeatNumber}, </span>
                    )
                }
            </div>
        </div>
        <div className='bg-slate-100 p-2 mt-5'>
            <span className='ml-3'>Booking Code</span>
        </div>
        <div className='my-10 flex justify-center'>
            <QRCode
                value={BookingDetail.BookingId}
            />
        </div>
      </div>
    </div>
  )
}

export default SuccessPayment
