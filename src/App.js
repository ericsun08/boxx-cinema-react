import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import ShowOrHideNav from "./components/ShowOrHideNav";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import TicketDetail from "./pages/TicketDetail";
import MovieDetail from "./pages/MovieDetail";
import ScheduleByMovie from "./pages/ScheduleByMovie";
import ScheduleByCinema from "./pages/ScheduleByCinema";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import ChangePassword from "./pages/ChangePassword";
import SeatLayout from "./pages/SeatLayout";
import Payment from "./pages/Payment";
import SavedMovie from "./pages/SavedMovie";
import TransactionHistory from "./pages/TransactionHistory";
import SuccessPayment from "./pages/SuccessPayment";
import SuccessPage from "./pages/SuccessPage";
import SlidePanel from "./components/SlidePanel";
import ErrorMessage from "./components/ErrorMessage";
import SuccessMessage from "./components/SuccessMessage";
import WarningMessage from "./components/WarningMessage";
import ProtectedPages from "./pages/ProtectedPages";

function App() {
  return (
    <div className="flex justify-center min-h-screen max-h-screen overflow-hidden">
      <div className="relative bg-white shadow-md" style={{width:'600px'}}>
        <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route path='/movieDetail' element={<MovieDetail/>} />
              <Route path='/scheduleByMovie' element={<ScheduleByMovie/>} />
              <Route path='/schedule' element={<ScheduleByCinema/>} />
              <Route path='/myaccount' element={<SignIn/>} />
              <Route path='/Register' element={<Register/>} />
              <Route path='/ticket' element={<Tickets/>} />
              <Route path='/seat-layout' element={<SeatLayout/>}/>
              <Route element={<ProtectedPages/>}>
                <Route path='/user-profile' element={<UserProfile/>} />
                <Route path='/change-password' element={<ChangePassword/>}/>
                <Route path='/payment' element={<Payment/>}/>
                <Route path='/transaction-history' element={<TransactionHistory/>}/>
                <Route path='/success-payment' element={<SuccessPayment/>}/>
                <Route path='/ticket-detail' element={<TicketDetail/>}/>
                <Route path='/saved-movie' element={<SavedMovie/>}/>
              </Route>
              <Route path='/successPage' element={<SuccessPage/>}/>
            </Routes>
          <ShowOrHideNav>
            <Navbar/>
          </ShowOrHideNav>
          <SlidePanel />
          <SuccessMessage />
          <ErrorMessage />
          <WarningMessage/>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
