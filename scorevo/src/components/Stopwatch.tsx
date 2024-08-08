import './Stopwatch.css'
import laliga_logo_white from '../assets/laliga_white.png';
import mallorca from '../assets/badges/mallorca.png';
import madrid from '../assets/badges/realmadrid.png';
import { useState, useEffect, useRef } from 'react'
import Badge from './Badge';
function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const intervalRef = useRef(0);
    const startTimeRef = useRef(0);

    useEffect(() => {
        //If the stopwatch is running, make some math
        if(isRunning) {
            // After every 10ms we'll set our time to be a new state 
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTimeRef.current)
            }, 10);
        }

        return () => {
            clearInterval(intervalRef.current)
        }
    }, [isRunning])

    function start() {
        //Start or Resume the time
        setIsRunning(true);
        startTimeRef.current = Date.now() - time;
        console.log(startTimeRef.current);
    }

    function pause() {
        //Pause the time
        setIsRunning(false);
    }

    function reset() {
        //Reset the time to the initial
        setTime(0);
        setIsRunning(false);
    }

    function formatTime() {
        //Format the time to a readable value
        const minutes = Math.floor(time / (1000 * 60) % 60);
        const seconds = Math.floor(time / (1000) % 60);

        const minutesDoubleDigit = String(minutes).padStart(2,"0");
        const secondsDoubleDigit = String(seconds).padStart(2,"0");
        return `${minutesDoubleDigit}:${secondsDoubleDigit}`;
    }

    return(
        <>
            <div className="stopwatch">
                <div className="logo">
                    <img className="logo-img" src={laliga_logo_white} alt="laliga_logo" />
                </div>
                <div className="timer">
                    <div>
                        <span>{formatTime()}</span>
                    </div>
                </div>
                <div className="badge-home">
                    <Badge teamName="mallorca"/>
                </div>
                <div className="badge-away">
                    <Badge teamName="realmadrid"/>
                </div>
                <div className="score-home">
                    <span>1</span>
                </div>
                <div className="score-away">
                    <span>0</span>
                </div>
                
            </div>
            <br /><br />
            <div className="control-panel">
                <button className="start-button" onClick={start}>Start</button>
                <button className="pause-button" onClick={pause}>Pause</button>
                <button className="reset-button" onClick={reset}>Reset</button>
            </div>
        </>
        

    )
}

export default Stopwatch