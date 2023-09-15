// api integration isn't working, for now, just using these mock interfaces
// thanks to: https://github.com/greyhatguy007/meta-front-end-developer-professional-certificate/blob/main/C8-Capstone-Project/Little-Lemon-Project/src/utils/temp.ts#L12
// for this implementation.
export default class MockReservationClient {
    seededRandom(seed) {
        const m = 2 ** 35 - 31
        const a = 185852
        let s = seed % m
        return function () {
            return (s = (s * a) % m) / m
        }
    }

    fetchAPI(date) {
        const result = []
        const random = this.seededRandom(date)

        for (let i = 17; i <= 23; i++) {
            if (random() < 0.5) {
                result.push(i + ":00")
            }
            if (random() < 0.5) {
                result.push(i + ":30")
            }
        }
        return result
    }

    submitAPI(formData) {
        const random = this.seededRandom(Date.now())
        if(random() < 0.9) {
            return true
        } else {
            return false
        }
    }
}