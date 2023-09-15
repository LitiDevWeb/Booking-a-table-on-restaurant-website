import './App.css';
import Home from './pages/Home';
import Booking from './pages/Booking';
import BookingConfirmation from './pages/BookingConfirmation';
import { initializeTimes, updateTimes } from './components/reducers/availableTimesReducer';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useReducer } from "react"

function App() {
  const [availableTimesState, dispatchAvailableTimes] = useReducer(updateTimes, initializeTimes())

  return (
    <>
      <link href='https://fonts.googleapis.com/css?family=Karla:400,700,800' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Markazi Text:400,700,800' rel='stylesheet'/>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Home/>}></Route>
          <Route path="/bookings" element={<Booking availableTimes={availableTimesState.availableTimes} dispatchAvailableTimes={dispatchAvailableTimes}/>}></Route>
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
