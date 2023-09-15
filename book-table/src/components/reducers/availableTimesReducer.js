import MockReservationClient from '../../clients/mockReservationsClient';

export function initializeTimes() {
    return {availableTimes: fetchAvailableTimes(Date.now())}
}

export function updateTimes(state, action) {
    switch(action.type) {
    case 'UpdateDate':
        const val = fetchAvailableTimes(action.value)
        const response = {
            availableTimes: val
        }
        return response
    default:
        throw new Error();
    }
}

function fetchAvailableTimes(date) {
    const mockReservationsClient = new MockReservationClient()
    const response = mockReservationsClient.fetchAPI(date)
    return response
}