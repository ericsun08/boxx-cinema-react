import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import PageHeader from '../components/PageHeader'
import DatePicker from '../components/DatePicker'
import { getAllScheduleByMovieCity } from '../features/showDetailSlice'
import { openPanel, displayList, handleShowDetail } from '../features/showDetailSlice'
import Skeleton from 'react-loading-skeleton'

const ScheduleByMovie = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const MovieId = location.state.MovieId
  const { movies } = useSelector((state) => state.movie)
  const MovieDetail = movies.find((item) => item.MovieId === MovieId)
  const { selectedCityId } = useSelector((state) => state.city) 
  const { selectedDate, schedules, loading } = useSelector((state) => state.show)

  useEffect(() => {
    const filterValue = {
      MovieId: MovieId,
      CityId: selectedCityId,
      Date: new Date(selectedDate)
    }

    dispatch(getAllScheduleByMovieCity(filterValue))
  },[dispatch, MovieId, selectedCityId, selectedDate])

  const navigatePage = (Page, MovieId) => {
    navigate(Page, {state: {MovieId:MovieId}})
  }

  const handleShowInfo = (value, val, v) => {
    dispatch(openPanel())
    dispatch(displayList({isShowDetail:true, isCityList:false, isTheaterList:false, isPayment:false}))
    dispatch(handleShowDetail({
      MovieId: MovieDetail.MovieId,
      ImageUrl: MovieDetail.ImageUrl,
      Title: MovieDetail.Title,
      TheaterName: value.TheatreName,
      Price:value.Price,
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
      <PageHeader title=""/>
      <div>
        <div className=''>
            <img src={MovieDetail.ImageUrl} alt={MovieDetail.Title} className='w-full h-48 object-cover grayscale-[80%]'/>
            <div className='cursor-pointer relative flex flex-col items-center text-center' style={{top: '-40px', left: '50%',transform: 'translate(-50%, -50%)'}} onClick={() => navigatePage('/movieDetail', MovieDetail.MovieId)}>
                <img src={MovieDetail.ImageUrl} alt={MovieDetail.Title} className='w-32 rounded-lg mb-3'/>
                <span className='font-bold text-sm'>{MovieDetail.Title.toUpperCase()}</span>
            </div>
        </div>
        <div className='mx-5' style={{marginTop:'-130px'}}>
          <DatePicker/>
        </div>
        <div className='mx-5 my-5'>
          {
            !loading && schedules?.Schedules?.map((value, index) => 
              <div key={index} className='border border-slate-300 rounded border-solid my-5 p-3'>
                <span className='text-xs font-bold tracking-wide'>{value.TheatreName}</span>
                <div className=''>
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
            !loading && schedules?.Schedules?.length === 0 && 
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
    </div>
  )
}

export default ScheduleByMovie
