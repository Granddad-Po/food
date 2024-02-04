import getZero from '../utils/zero'

function timer(selector, deadline) {

    function getTimeRemaining(deadline) {
        const delta = Date.parse(deadline) - new Date()
        let days, hours, minutes, seconds

        if (delta <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(delta / (1000 * 60 * 60 * 24))
            hours = Math.floor(delta / (1000 * 60 * 60) % 24)
            minutes = Math.floor(delta / (1000 * 60) % 60)
            seconds = Math.floor((delta / 1000) % 60)
        }

        return {
            delta,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function setClock(selector, deadline) {
        const timer = document.querySelector(selector)
        let days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000)


        function updateClock() {
            const time = getTimeRemaining(deadline)

            days.innerHTML = getZero(time.days)
            hours.innerHTML = getZero(time.hours)
            minutes.innerHTML = getZero(time.minutes)
            seconds.innerHTML = getZero(time.seconds)

            if (time < 0) {
                clearInterval(timeInterval)
            }
        }

        updateClock()
    }

    setClock(selector, deadline)
}

export default timer