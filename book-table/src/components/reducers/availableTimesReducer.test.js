import { initializeTimes, updateTimes } from "./availableTimesReducer";

test('initializes the appropriate times', () => {
    const availableTimes = initializeTimes()
    expect(availableTimes).toBeDefined
})

test('updates times correctly when provided the UpdateDate action type', () => {
    const newTimes = updateTimes({}, {type: "UpdateDate", value: Date.now})
    expect(newTimes).toBeDefined
})