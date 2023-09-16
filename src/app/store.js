import  { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage/session';
import MovieDetail from '../features/movieDetailSlice'
import ShowDetail from '../features/showDetailSlice'
import CityDetail from '../features/CityDetailSlice';
import TheaterDetail from '../features/theaterDetailSlice';
import AuthDetail from '../features/AuthDetailSlice';
import SeatDetail from '../features/SeatDetailSlice';
import BookDetail from '../features/BookDetailSlice';
import SavedMovieSlice from '../features/SavedMovieSlice';
import App from '../features/AppSlice'

const rootReducer = combineReducers({
    app: persistReducer({ key: 'root', storage }, App),
    movie: persistReducer({ key: 'movie', storage }, MovieDetail),
    show: persistReducer({ key: 'show', storage }, ShowDetail),
    city: persistReducer({ key: 'city', storage }, CityDetail),
    theater: persistReducer({ key: 'theater', storage }, TheaterDetail),
    seat: persistReducer({ key: 'seat', storage }, SeatDetail),
    book: persistReducer({ key: 'book', storage}, BookDetail),
    savedMovie: persistReducer({ key: 'savedMovie', storage}, SavedMovieSlice),
    auth: persistReducer({ key: 'auth', storage }, AuthDetail),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store);