import {  fireEvent, render, screen } from "@testing-library/react";
import BookingForm from './BookingForm';
import { BrowserRouter } from "react-router-dom";

const testReservationRequestState = {
    date: null,
    time: null,
    numberOfGuests: 0,
    occaision: ""
}

const testSubmitErrorsState = {
    validationErrors: [],
    bookingErrors: [],
    submitSuccessfull: false,
    submitRequestMade: false
}

const dispatchAvailableTimesFunction = jest.fn()

test('Renders the Book Now button when no booking times exist', () => {
    render(
        <BrowserRouter>
            <BookingForm availableTimes={null}
                         dispatchAvailableTimes={dispatchAvailableTimesFunction} />
        </BrowserRouter>
    )
    const headingElement = screen.getByText("Book Now")
    expect(headingElement).toBeInTheDocument()
})

test('Renders the Book Now button and times when no booking times exist', () => {
    render(
        <BrowserRouter>
            <BookingForm availableTimes={["17:00", "18:00"]}
            dispatchAvailableTimes={dispatchAvailableTimesFunction}/>
        </BrowserRouter>
    )
    const headingElement = screen.getByText("Book Now")
    expect(headingElement).toBeInTheDocument()
    const bookingTimeElement = screen.getByText("17:00")
    expect(bookingTimeElement).toBeInTheDocument()
})

test('Renders the form correctly', () => {
    render(
        <BrowserRouter>
            <BookingForm availableTimes={["17:00", "18:00"]}
            dispatchAvailableTimes={dispatchAvailableTimesFunction}/>
        </BrowserRouter>
    )
    const chooseDateText = screen.getByText("Choose date")
    expect(chooseDateText).toBeInTheDocument()
    const dateInputElement = document.getElementById("res-date")
    expect(dateInputElement).toBeDefined()

    const chooseTimeText = screen.getByText("Choose time")
    expect(chooseTimeText).toBeInTheDocument()
    const timeInputElement = document.getElementById("res-time")
    expect(timeInputElement).toBeDefined()

    const numGuestsText = screen.getByText("Number of guests")
    expect(numGuestsText).toBeInTheDocument()
    const numGuestsInputElement = document.getElementById("guests")
    expect(numGuestsInputElement).toBeDefined()

    const occasionText = screen.getByText("Occasion")
    expect(occasionText).toBeInTheDocument()
    const occasionInputElement = document.getElementById("occasion")
    expect(occasionInputElement).toBeDefined()
})

test('Does not allow form submission if reservation date is missing', () => {
    render(
        <BrowserRouter>
            <BookingForm availableTimes={["17:00", "18:00"]}
            dispatchAvailableTimes={dispatchAvailableTimesFunction}/>
        </BrowserRouter>
    )

    const submitButton = screen.getByText("Book Now")
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText("Reservation date must be set.")
    expect(errorMessage).toBeInTheDocument()
})

test('Does not allow form submission if reservation time is missing', () => {
    render(
        <BrowserRouter>
            <BookingForm availableTimes={["17:00", "18:00"]}
            dispatchAvailableTimes={dispatchAvailableTimesFunction}/>
        </BrowserRouter>
    )

    const input = screen.getByLabelText('Choose date')
    fireEvent.change(input, {target: {value: '2023-09-14'}})

    const submitButton = screen.getByText("Book Now")
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText("Reservation time must be set.")
    expect(errorMessage).toBeInTheDocument()
})

test('Does not allow form submission if reservation time is in the past', () => {
    render(
        <BrowserRouter>
            <BookingForm availableTimes={["17:00", "18:00"]}
            dispatchAvailableTimes={dispatchAvailableTimesFunction}/>
        </BrowserRouter>
    )

    var input = screen.getByLabelText('Choose date')
    fireEvent.change(input, {target: {value: '1900-01-01'}})
    input = screen.getByLabelText('Choose time')
    fireEvent.change(input, {target: {value: '17:00'}})

    const submitButton = screen.getByText("Book Now")
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText("Reservation time must be in the future.")
    expect(errorMessage).toBeInTheDocument()
})

test('Does not allow form submission if number of guests is missing', () => {
    render(
        <BrowserRouter>
            <BookingForm availableTimes={["17:00", "18:00"]}
            dispatchAvailableTimes={dispatchAvailableTimesFunction}/>
        </BrowserRouter>
    )
    var input = screen.getByLabelText('Choose date')
    fireEvent.change(input, {target: {value: '3000-01-01'}})
    input = screen.getByLabelText('Choose time')
    fireEvent.change(input, {target: {value: '17:00'}})

    const submitButton = screen.getByText("Book Now")
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText("Number of guests must be set.")
    expect(errorMessage).toBeInTheDocument()
})

test('Does not allow form submission if occaison is missing', () => {
    render(
        <BrowserRouter>
            <BookingForm availableTimes={["17:00", "18:00"]}
            dispatchAvailableTimes={dispatchAvailableTimesFunction}/>
        </BrowserRouter>
    )
    var input = screen.getByLabelText('Choose date')
    fireEvent.change(input, {target: {value: '3000-01-01'}})
    input = screen.getByLabelText('Choose time')
    fireEvent.change(input, {target: {value: '17:00'}})
    input = screen.getByLabelText('Number of guests')
    fireEvent.change(input, {target: {value: '1'}})

    const submitButton = screen.getByText("Book Now")
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText("Occasion must be set.")
    expect(errorMessage).toBeInTheDocument()
})

test('Allows form submission and shows a service error if all parameters are set correctly', () => {
    render(
        <BrowserRouter>
            <BookingForm availableTimes={["17:00", "18:00"]}
            dispatchAvailableTimes={dispatchAvailableTimesFunction}
            mockNavigateHook={jest.fn()}/>
        </BrowserRouter>
    )
    var input = screen.getByLabelText('Choose date')
    fireEvent.change(input, {target: {value: '3000-01-01'}})
    input = screen.getByLabelText('Choose time')
    fireEvent.change(input, {target: {value: '17:00'}})
    input = screen.getByLabelText('Number of guests')
    fireEvent.change(input, {target: {value: '1'}})
    input = screen.getByLabelText('Occasion')
    fireEvent.change(input, {target: {value: 'None'}})

    const submitButton = screen.getByText("Book Now")
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText("We're sorry, something went wrong. Please try again.")
    expect(errorMessage).toBeInTheDocument()
})