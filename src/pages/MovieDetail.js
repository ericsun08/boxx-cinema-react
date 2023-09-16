import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PageHeader from '../components/PageHeader'
import { ThreeDots } from 'react-loader-spinner'
import { getAllMovieCast } from '../features/movieDetailSlice'
import { getSavedMovie, saveMovie, deleteSavedMovie } from '../features/SavedMovieSlice'


const MovieDetail = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const MovieId = location.state.MovieId

  const { movies, casts } = useSelector((state) => state.movie)
  const { savedMovies, loading } = useSelector((state) => state.savedMovie)
  const { isLoggedin, userInfo } = useSelector((state) => state.auth)

  const movieDetail = movies.find((item) => item.MovieId === MovieId)

  const isMovieSaved = savedMovies?.data?.SavedMovie?.find((item) => item.MovieId === MovieId)

  const navigatePage = (Page, MovieId) => {
    navigate(Page, {state: {MovieId:MovieId}})
  }

  useEffect(() => {
    dispatch(getSavedMovie(userInfo?.UserId))
  },[dispatch, userInfo])

  useEffect(() => {
    dispatch(getAllMovieCast(MovieId))
  },[dispatch, MovieId])

  const save = (movieId) => {
    const body = {
        MovieId:movieId,
        UserId:userInfo?.UserId
    }
     dispatch(saveMovie(body))
        .then(() => {
            dispatch(getSavedMovie(userInfo?.UserId))
        })
        .catch((err) => {
            console.log(err)
        })
  }

  const unsave = (movieId) => {
    const query = {
        MovieId:movieId,
        UserId:userInfo.UserId
    }
    dispatch(deleteSavedMovie(query))
        .then(() => {
            dispatch(getSavedMovie(userInfo?.UserId))
        })
        .catch((err) => {
            console.log(err)
        })
  }

  const saveOrUnsave = (movieId) => {
    if(!isMovieSaved){
        if(!isLoggedin && !userInfo){
            navigate('/myaccount')
        }
        save(movieId)
    } else {
        unsave(movieId)
    }
  }

  return (
    <div>
      <PageHeader title="Movie Detail"/>
      <div className='p-5'>
        <div className='flex flex-row'>
            <div className='w-40'>
                <img className='rounded-lg drop-shadow-2xl' src={movieDetail.ImageUrl} alt={movieDetail.Title}/>
            </div>
            <div className='ml-5 w-full'>
                <span className='sm:text-xl text-md font-bold'>{movieDetail.Title}</span>
                <div className='flex mt-6'>
                    <div className='flex flex-col'>
                        <span className='sm:text-sm text-xs'>Genre: </span>
                        <span className='sm:text-sm text-xs'>Duration: </span>
                        <span className='sm:text-sm text-xs'>Language: </span>
                    </div>
                    <div className='flex flex-col ml-5'>
                        <span className='sm:text-sm text-xs font-bold'>{movieDetail.Genre}</span>
                        <span className='sm:text-sm text-xs font-bold'>{movieDetail.Duration}m</span>
                        <span className='sm:text-sm text-xs font-bold'>{movieDetail.Language}</span>
                    </div>
                </div>
                <div className='mt-5 grid grid-cols-2 gap-4' >
                    <button className={`p-2 border-solid border rounded border-sky-950 flex items-center justify-center ${isMovieSaved ? 'bg-sky-950 text-slate-100 hover:bg-sky-950 hover:text-slate-100' : 'text-sky-950 hover:bg-sky-950 hover:text-slate-100'}`} onClick={() => saveOrUnsave(movieDetail.MovieId)}>
                        {
                            loading ?
                                <ThreeDots
                                    height={25}
                                    width={30}
                                    color={isMovieSaved ? '#FFFFFF' : '#082f49'}
                                />
                            :
                            isMovieSaved ?
                                'Saved'
                            :
                                'Save'
                        }
                    </button>
                    <button className='p-2 border-solid border rounded border-sky-950 text-sky-950 hover:bg-sky-950 hover:text-slate-100' onClick={() => navigatePage('/scheduleByMovie', MovieId)}>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
        <div className='mt-12'>
            <span className='font-bold sm:text-lg text-sm'>Synopsis</span>
            <div className='mt-1'>
                <span className='sm:text-md text-sm '>{movieDetail.Description}</span>
            </div>
        </div>
        <div className='mt-8'>
            <span className='font-bold sm:text-lg text-sm'>Casts</span>
            <div className='mt-1'>
                {
                    casts && casts.map((value, index) => 
                        <span key={index} className='sm:text-md text-sm '>{value.CastName}, </span>
                    )
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
