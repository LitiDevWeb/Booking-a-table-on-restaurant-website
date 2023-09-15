import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import MockReservationClient from "../../clients/mockReservationsClient";

export default function BookingForm(props) {
    const [reservationRequest, setReservationRequest] = useState({
        date: null,
        time: null,
        numberOfGuests: 0,
        occaision: ""
    });

    const [submitErrors, setSubmitErrors] = useState({
        validationErrors: [],
        bookingErrors: [],
        submitSuccessfull: false,
        submitRequestMade: false // would be better to use a status enum here if this was a real application
    })

    var navigate = useNavigate()
    if(props.mockNavigateHook != null) {
        navigate = props.mockNavigateHook
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        var validationErrors = []
        var bookingErrors = []
        if(reservationRequest.date === null) {
            validationErrors.push("Reservation date must be set.");
        }

        if(reservationRequest.time === null || reservationRequest.time === "Select" ) {
            validationErrors.push("Reservation time must be set.");
        }

        const dateStr = reservationRequest.date + " " + reservationRequest.time
        if(Date.parse(dateStr) < Date.now()) {
            validationErrors.push("Reservation time must be in the future.")
        }

        if(reservationRequest.numberOfGuests === null || reservationRequest.numberOfGuests === 0) {
            validationErrors.push("Number of guests must be set.");
        }

        if(reservationRequest.occaision === null ||
            reservationRequest.occaision === "" ||
            reservationRequest.occaision === "Select") {
            validationErrors.push("Occasion must be set.")
        }

        if(validationErrors.length === 0) {
            const mockReservationsClient = new MockReservationClient()
            const response = mockReservationsClient.submitAPI(reservationRequest)
            if(response === false) {
                bookingErrors.push("Something went wrong, please try again...")
                setSubmitErrors({validationErrors: validationErrors, bookingErrors: bookingErrors, submitSuccessfull: false, submitRequestMade: true})
            } else {
                setSubmitErrors({validationErrors: validationErrors, bookingErrors: bookingErrors, submitSuccessfull: true, submitRequestMade: true})
            }
        } else {
            setSubmitErrors({validationErrors: validationErrors, bookingErrors: bookingErrors, submitSuccessfull: false, submitRequestMade: false})
        }
      }

    const handleChange = (event) => {
        const {name, value} = event.target;
        var newReservationRequest = {...reservationRequest}
        if(name === "res-date") {
            newReservationRequest.date = value;
        } else if(name === "res-time") {
            newReservationRequest.time = value;
        } else if(name === "guests") {
            newReservationRequest.numberOfGuests = value;
        } else if(name === "occaision") {
            newReservationRequest.occaision = value;
        }
        setReservationRequest(newReservationRequest);
    }

    const dispatchAvailableTimes = props.dispatchAvailableTimes
    useEffect(() => {
        if(dispatchAvailableTimes != null) {
            dispatchAvailableTimes({
                type: 'UpdateDate',
                value: new Date(reservationRequest.date).valueOf()
            })
        }
    }, [reservationRequest.date, dispatchAvailableTimes])

    var errorMessage = <></>
    if (submitErrors.validationErrors.length > 0) {
        var index = 0
        const errorItems = submitErrors.validationErrors.map(function(error){
            return(<li key={++index}style={{color: "red"}}>{error}</li>)
        })
        errorMessage = <ul>
            {errorItems}
        </ul>
    }

    const bookingErrorMessage = (submitErrors.bookingErrors.length >= 0 && submitErrors.submitRequestMade === true) ?
    <span style={{color: "red"}}>We're sorry, something went wrong. Please try again.</span> : <span></span>

    var timeOptions =  [<option key="-1">Select</option>]
    if(props != null && props.availableTimes != null) {
        for(var i = 0; i < props.availableTimes.length; i++) {
            timeOptions.push(<option key={i}>{props.availableTimes[i]}</option>)
        }
    }

    if(submitErrors.bookingErrors.length === 0 && submitErrors.submitSuccessfull === true && submitErrors.submitRequestMade === true) {
        navigate("/booking-confirmation")
    }

    return (
        <>
            <form style={{display: "grid", maxWidth: "200px", gap: "20px"}} onSubmit={handleSubmit}>
                <label htmlFor="res-date">Choose date</label>
                <input type="date" id="res-date" name="res-date" onChange={handleChange}/>
                <label htmlFor="res-time">Choose time</label>
                <select id="res-time" name="res-time" onChange={handleChange}>
                    {timeOptions}
                </select>
                <label htmlFor="guests">Number of guests</label>
                <input type="number" placeholder="0" min="0" max="10" id="guests" name="guests" onChange={handleChange}/>
                <label htmlFor="occasion">Occasion</label>
                <select id="occasion" name="occaision" onChange={handleChange}>
                    <option>Select</option>
                    <option>None</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                </select>
                <button className='app-button' aria-label="On Click" type="Submit">Book Now</button>
            </form>
            {bookingErrorMessage}
            {errorMessage}
        </>
    );
}