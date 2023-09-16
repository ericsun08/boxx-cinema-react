import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PageHeader from '../components/PageHeader'
import { getBookingList, handleSelectedBooking } from '../features/BookDetailSlice'
import { handleShowDetail, handleTicket } from '../features/showDetailSlice'
import moment from 'moment'
import Skeleton from 'react-loading-skeleton'

const TransactionHistory = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)
  const { bookingLists, loading } = useSelector((state) => state.book)

  const UserId = userInfo.UserId

  useEffect(()=> {
    dispatch(getBookingList(UserId))
  },[dispatch, UserId])

  const handleShowTransaction = (value) => {
    dispatch(handleShowDetail({
      Title: value.MovieTitle,
      TheaterName: value.TheatreName,
      Price: value.SubTotal,
      Date: moment(value.ShowDate).format('dddd, DD MMM YYYY'),
      StartTime: value.ShowStartTime,
      EndTime: value.ShowEndTime,
    }))
    dispatch(handleSelectedBooking(value))
    dispatch(handleTicket({quantity: value.TicketQty, subTotal:value.SubTotal}))
    navigate('/payment')
  }

  return (
    <div className='scroll-div overflow-y-scroll scrollbar-none h-full pb-16'>
      <PageHeader title="Transaction History"/>
      <div>
        {
          !loading && bookingLists?.data?.Transaction?.map((value, index) => 
            {
              const statusUnpaid = value.Status === 'Unpaid'
              return(
                <div key={index} className='mx-5 my-4 p-4 border border-1 border-slate-200 rounded'>
                  <div className='flex justify-between'>
                    <div className='flex flex-col space-y-1'>
                      <span className='font-semibold'>
                        {value.MovieTitle} x{value.TicketQty} Ticket(s)
                      </span>
                      <span>
                        @ {value.TheatreName}
                      </span>
                      <span>
                        {moment(value.ShowDate).format('YYYY-MM-DD')}, {moment(value.ShowStartTime).format('HH:mm') + "~" + moment(value.ShowEndTime).format('HH:mm')}
                      </span>
                    </div>
                    <div className='flex flex-col'>
                      <span className='font-semibold'>
                        Rp. {value.SubTotal.toLocaleString('en-US')}
                      </span>
                      <span>
                        {moment(value.createdAt).format('YYYY-MM-DD')}
                      </span>
                      <span className={`${statusUnpaid ? 'text-orange-400' : 'text-green-400'} font-semibold`}>
                        {value.Status}
                      </span>
                    </div>
                  </div>
                  {
                      statusUnpaid && 
                        <div className='mt-5'>
                            <button className={`w-full p-1 border-solid border rounded border-sky-950 flex items-center justify-center hover:bg-sky-950 hover:text-slate-100`} onClick={() => handleShowTransaction(value)}>
                                Pay
                            </button>
                        </div>
                  }
                </div>
              )
            }
          )
        }
        {
          !loading && !bookingLists?.data?.Transaction?.length &&
          <div className='text-center my-12'>
            <span className='font-semibold'>There is no transaction history</span>
          </div>
        }
        {
          loading && 
          <>
            <div className='my-2 p-5'>
              <Skeleton height={150} count={5} style={{marginTop:'10px'}}/>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default TransactionHistory
