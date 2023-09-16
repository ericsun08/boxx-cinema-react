import React, { useCallback, useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { handleChangeTicketTab, handleErrorMessage, openErrorModal } from '../features/AppSlice'
import { getTicketList, handleSelectedTicket, handleSelectedBooking } from '../features/BookDetailSlice'
import { handleShowDetail, handleTicket } from '../features/showDetailSlice'
import { logoutUser } from '../features/AuthDetailSlice'
import moment from 'moment'
import Skeleton from 'react-loading-skeleton'

const Tickets = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { ticketTab } = useSelector((state) => state.app)
  const { isLoggedin, userInfo } = useSelector((state) => state.auth)
  const { ticketList, loading } = useSelector((state) => state.book)

  const [ticketData, setTicketData] = useState(ticketList?.data?.Tickets)

  const countPendingTick = ticketList?.data?.Tickets.filter((item) => item.Status === 'Unpaid').length

  useEffect(() => {
    dispatch(getTicketList(userInfo?.UserId))
  },[dispatch, userInfo])

  const handleTicketDetail = (value) => {
    dispatch(handleSelectedTicket(value))
    navigate('/ticket-detail')
  }

  const displayTicket = useCallback((value) => {
    if(value === 'Active'){
        setTicketData(ticketList?.data?.Tickets.filter((item) => item.Status === 'Paid' && new Date(item.ShowEndTime) > new Date()))
    }
    if(value === 'Pending'){
        setTicketData(ticketList?.data?.Tickets.filter((item) => item.Status === 'Unpaid'))
    }
    if(value === 'Past'){
        setTicketData(ticketList?.data?.Tickets.filter((item) => item.Status === 'Paid' && new Date(item.ShowEndTime) < new Date()))
    }
  },[ticketList])

  useEffect(() => {
    displayTicket(ticketTab)
  },[displayTicket, ticketTab])

  const ticketStatusTab = [
    {
        label:'Active',
    },
    {
        label:'Pending',
    },
    {
        label:'Past',
    }
  ]

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
    dispatch(handleTicket({quantity: value.BookedSeats.length, subTotal:value.SubTotal}))
    navigate('/payment')
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
    localStorage.setItem('intendedPath', '/ticket')
    return <Navigate to='/myaccount'/>
  }

  return (
    <div className='scroll-div overflow-y-scroll scrollbar-none h-full pb-16'>
      <PageHeader title='Tickets'/>
      <div className='mx-5 flex flex-row'>
        {
            ticketStatusTab.map((item, index) => {
                return (
                    <div 
                        key={index} 
                        className={`mr-1 cursor-pointer p-3 hover:text-sky-900 ${ticketTab === item.label ? 'font-bold text-sky-950 border-solid border-b-2 border-sky-950' : ''}`} 
                        onClick={() => {dispatch(handleChangeTicketTab(item.label)); displayTicket(item.label)}}
                    >
                        <span className='sm:text-md text-sm'>{item?.label} Ticket {item?.label === 'Pending' && countPendingTick !== 0 ? "("+countPendingTick+")" : ''}</span>
                    </div>
                )
            })
        }
      </div>
      <div className='m-5'>
        {
            !loading && ticketData?.map((value, index) => {
                const isPaid = value.Status === 'Paid'
                const pastStatus = ticketTab === 'Past'
                return(
                    <div key={index} className='my-5'>
                        <div className='bg-sky-900 p-4 rounded-t-lg'>
                            <div>
                                <span className='text-slate-100 font-semibold text-lg'>{value.MovieTitle}</span>
                            </div>
                            <div className='grid grid-cols-3 mt-5'>
                                <div className='px-3'>
                                    <span className='text-slate-100 sm:text-md text-xs'>Date</span>
                                </div>
                                <div className='px-3'>
                                    <span className='text-slate-100 sm:text-md text-xs'>Cinema</span>
                                </div>
                                <div className='px-3'>
                                    <span className='text-slate-100 sm:text-md text-xs'>Show Time</span>
                                </div>
                            </div>
                            <div className='grid grid-cols-3'>
                                <div className='border-r px-3'>
                                    <span className='text-slate-100 sm:text-md text-xs font-semibold'>{moment(value.ShowDate).format('dddd, DD MMM YYYY')}</span>
                                </div>
                                <div className='border-r px-3'>
                                    <span className='text-slate-100 sm:text-md text-xs font-semibold'>{value.TheatreName}</span>
                                </div>
                                <div className='px-3'>
                                    <span className='text-slate-100 sm:text-md text-xs font-semibold'>{moment(value.ShowStartTime).format('HH:mm')}</span>
                                </div>
                            </div>
                        </div>
                        <div className='p-4 flex justify-between border rounded-b-lg items-center'>
                            <div className='flex flex-col'>
                                <span>{value.BookedSeats.length} Ticket(s)</span>
                                <span className={`${isPaid ? 'text-green-400' : 'text-orange-400'} font-semibold mt-1`}>{value.Status}</span>
                            </div>
                            {
                                !pastStatus &&
                                <div>
                                    <button className='p-2 px-4 border-solid border rounded border-sky-950 hover:bg-sky-950 hover:text-slate-100 active:bg-sky-950 active:text-slate-100' onClick={() => {isPaid ? handleTicketDetail(value) : handleShowTransaction(value)}}>
                                        {isPaid ? "View" : "Pay"}
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                )
            })
        }
        {
           !loading && !ticketData?.length &&
            <div className='my-20 text-center'>
                <span className='font-semibold'>There are no {ticketTab} tickets</span>
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

export default Tickets
