import React from "react"
import BookingForm from "../components/bookings/BookingForm"
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function Booking(props) {
  return (
  <>
    <Header />
    <BookingForm availableTimes={props.availableTimes}
                 dispatchAvailableTimes={props.dispatchAvailableTimes}/>
    <Footer />
  </>
  );
}
