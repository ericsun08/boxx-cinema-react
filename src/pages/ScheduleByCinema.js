import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import PageHeader from '../components/PageHeader'
import DatePicker from '../components/DatePicker'
import {  openPanel, displayList, handleShowDetail } from '../features/showDetailSlice'
import { getAllScheduleByTheaterCity } from '../features/showDetailSlice'
import Skeleton from 'react-loading-skeleton'

const ScheduleByCinema = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { selectedTheater } = useSelector((state) => state.theater)
  const { selectedDate, schedules2, loading } = useSelector((state) => state.show)

  useEffect(() => {
    const filterValue = {
      TheaterId: selectedTheater?.TheatreId,
      Date: new Date(selectedDate)
    }

    dispatch(getAllScheduleByTheaterCity(filterValue))
  },[dispatch, selectedTheater, selectedDate])

  const handleSlidePanel = () => {
    dispatch(openPanel())
    dispatch(displayList({isShowDetail:false, isCityList:false, isTheaterList:true, isPayment:false}))
  }

  const handleShowInfo = (value, val, v) => {
    dispatch(openPanel())
    dispatch(displayList({isShowDetail:true, isCityList:false, isTheaterList:false, isPayment:false}))
    dispatch(handleShowDetail({
      MovieId: value.MovieId,
      ImageUrl: value.ImageUrl,
      Title: value.Title,
      TheaterName: selectedTheater?.TheatreName,
      Price: selectedTheater?.Price,
      ScreenName: val.ScreenName,
      ScreenId:val.ScreenId,
      Date: selectedDate,
      ShowId:v.ShowId,
      StartTime: v.ShowStartTime,
      EndTime: v.ShowEndTime
    }))
  }

  return (
    <div className='scroll-div overflow-y-scroll scrollbar-none h-full pb-16'>
      <PageHeader/>
      <div className='Image-Container flex flex-row items-center justify-between px-5'>
        <div>
            <span className='text-slate-200 font-bold sm:text-lg text-sm'>{selectedTheater?.TheatreName}</span>
            <div>
                <span className='text-slate-200 sm:text-sm text-xs'>{selectedTheater?.TheatreAddress}</span>
            </div>
        </div>
        <div>
            <div className='border border-slate-300 rounded border-solid p-2 text-center cursor-pointer' onClick={() => handleSlidePanel()}>
                <span className='text-slate-200'>Change</span>
            </div>
        </div>
      </div>
      <div className='mx-5 my-3'>
        <DatePicker/>
      </div>
      <div className='mx-5 my-5'>
        {
            !loading && schedules2?.Movies?.map((value, index) => 
                <div key={index} className='border border-slate-300 rounded border-solid my-5 p-3'>
                    <div className='flex flex-row items-center cursor-pointer' onClick={() => navigate('/movieDetail', {state: {MovieId:value.MovieId}})}>
                        <img src={value.ImageUrl} alt={value.Title} className='rounded-full w-8 h-8 object-cover'/>
                        <span className='font-bold sm:text-sm text-xs ml-3'>{value.Title.toUpperCase()}</span>
                    </div>
                    <div className='mt-4'>
                    {
                        value.Screen.map((val, idx) => 
                        <div key={idx} className='m-2'>
                            <span className='text-sm'>{val.ScreenName}</span>
                            <div className='grid grid-cols-4 gap-3 mt-2'>
                            {
                                val.Show.map((v, i) => 
                                <div key={i} className='border border-slate-300 rounded border-solid p-1 text-center hover:bg-sky-950 hover:text-slate-100 active:bg-sky-950 active:text-slate-100 cursor-pointer' onClick={() => handleShowInfo(value, val, v)}>
                                    <span className='text-sm' >{moment.utc(v.ShowStartTime).format('HH:mm')}</span>
                                </div>
                                )
                            }
                            </div>
                        </div>
                        )
                    }
                    </div>
                </div>
            )
        }
        {
          !loading && schedules2?.Movies?.length === 0 && 
            <div className='flex justify-center items-center mt-20'>
              <span className='font-semibold'>No shows on this date</span>
            </div>
        }
        {
          loading &&
            <>
              <div className='p-1'>
                <Skeleton height={150} count={4} style={{marginTop:10}}/>
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default ScheduleByCinema
