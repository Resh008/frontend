import React, { useEffect, useState } from 'react'

const CountDown = ({data}) => {
    const [timeLeft, setTimeleft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeleft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    })

    function calculateTimeLeft() {
        const diffrence = +new Date(data.Finish_Date) - +new Date();
        let timeLeft = {};

        if (diffrence > 0) {
            timeLeft = {
                days: Math.floor(diffrence / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diffrence / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diffrence / 1000 / 60) % 60),
                seconds: Math.floor((diffrence / (1000)) % 60),
            }
        }
        return timeLeft;
    }

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (!timeLeft[interval]) {
            return null;
        }
        return (
            <span className='text-[25px] text-[#475ad2]'>
                {timeLeft[interval]} {interval} {" "}
            </span>
        )
    })

    return (
        <div>
            {timerComponents.length ? timerComponents : <span className='text-[red] text-[25px]'>You missed it! Stay Tuned for future Update </span>}
        </div>
    )
}

export default CountDown
