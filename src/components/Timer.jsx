import { useState, useRef, useEffect } from "react"
import PropTypes from 'prop-types'

function Timer({duration}) {

  
  const [hour, setHour] = useState(() => {
    const parsedHr = parseInt(duration?.hr);
    return !parsedHr || isNaN(parsedHr) ? 0 : parsedHr;
  })

    const [min, setMin] = useState(() => {
      const parsedMin = parseInt(duration?.min);
      return !parsedMin || isNaN(parsedMin) ? 0 : parsedMin;
    })

    const [sec,setSec] = useState(0)
    const [countdownStarted, setCountdownStarted] = useState(false);
    const ref = useRef(null);


    useEffect(()=>{
      
    return () => clearInterval(ref.current);
    },[])

    const handleStart = () =>{
    if (!countdownStarted) {
      setCountdownStarted(true);
      ref.current = setInterval(() => {
        setSec(prev => {
          if (prev === 0) {
            setMin(prevMin => {
              if (prevMin === 0) {
                setHour(prevHour => {
                  if (prevHour === 0) {
                    clearInterval(ref.current)
                    setCountdownStarted(false)
                    return 0;
                  }

                  return prevHour - 1;
                })

                return 59;
              }

              return prevMin - 1;
            })

            return 59;
          }

          return prev - 1
        });
      
      }, 1000); 
    }

   
    }

    const handlePause = ()=>{
      clearInterval(ref.current)
      setCountdownStarted(false);
    }

    const handleReset = ()=>{
      clearInterval(ref.current)
      setCountdownStarted(false)
      setHour(parseInt(duration?.hr) || 0);
      setMin(parseInt(duration?.min) || 0);
      setSec(0);
    }
    
  return (
    <div className="p-4">
       <main className="flex flex-col items-center gap-4">
            <section className="flex gap-4 text-2xl">
                <div className="flex flex-col items-center">
                    <span className="font-bold">{String(hour).padStart(2, '0')}</span>
                    <span className="text-sm">Hours</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center">
                    <span className="font-bold">{String(min).padStart(2, '0')}</span>
                    <span className="text-sm">Minutes</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center">
                    <span className="font-bold">{String(sec).padStart(2, '0')}</span>
                    <span className="text-sm">Seconds</span>
                </div>
            </section>

            <section className="flex gap-4">
                    <button
                        onClick={handleStart}
                        disabled={countdownStarted}
                        className="px-4 py-2 bg-gray-700 rounded-xl hover:bg-gray-900 
                                 text-gray-50 disabled:bg-gray-400"
                    >
                        Start
                    </button>
                    <button
                        onClick={handlePause}
                        disabled={!countdownStarted}
                        className="px-4 py-2 bg-gray-700 rounded-xl hover:bg-gray-900 
                                 text-gray-50 disabled:bg-gray-400"
                    >
                        Pause
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-gray-700 rounded-xl hover:bg-gray-900 
                                 text-gray-50"
                    >
                        Reset
                    </button>
                </section>
      </main>
    </div>
  )
}

export default Timer;

Timer.propTypes = {
  duration: PropTypes.shape({
      hr: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
      ]).isRequired,
      min: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
      ]).isRequired
  }).isRequired
}

Timer.defaultProps = {
  duration: {
      hr: '0',
      min: '0'
  }
}

