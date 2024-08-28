import "./Stopwatch.css"
import laliga_logo_white from "../assets/laliga_white.png"
import { useState, useEffect, useRef } from "react"
import Badge from "./Badge"
import { LaLiga } from "../teams/laliga"

function Stopwatch() {
	const [isRunning, setIsRunning] = useState(false)
	const [time, setTime] = useState(0)
	const intervalRef = useRef(0)
	const startTimeRef = useRef(0)

	const [homeTeam, setHomeTeam] = useState("mallorca")
	const [awayTeam, setAwayTeam] = useState("realmadrid")

	const [homeTeamScore, setHomeTeamScore] = useState(0)
	const [awayTeamScore, setAwayTeamScore] = useState(0)

	const [isGreenScreenActive, setIsGreenScreenActive] = useState(false)

	useEffect(() => {
		//If the stopwatch is running, make some math
		if (isRunning) {
			// After every 10ms we'll set our time to be a new state
			intervalRef.current = setInterval(() => {
				setTime(Date.now() - startTimeRef.current)
			}, 10)
		}

		return () => {
			clearInterval(intervalRef.current)
		}
	}, [isRunning])

	function start() {
		//Start or Resume the time
		setIsRunning(true)
		startTimeRef.current = Date.now() - time
		console.log(startTimeRef.current)
	}

	function pause() {
		//Pause the time
		setIsRunning(false)
	}

	function reset() {
		//Reset the time to the initial
		setTime(0)
		setHomeTeamScore(0)
		setAwayTeamScore(0)
		setIsRunning(false)
	}

	function formatTime() {
		//Format the time to a readable value
		const minutes = Math.floor((time / (1000 * 60)) % 60)
		const seconds = Math.floor((time / 1000) % 60)

		const minutesDoubleDigit = String(minutes).padStart(2, "0")
		const secondsDoubleDigit = String(seconds).padStart(2, "0")
		return `${minutesDoubleDigit}:${secondsDoubleDigit}`
	}

	function handleTeamSelectorHome(event: any) {
		setHomeTeam(event.target.value)
	}

	function handleTeamSelectorAway(event: any) {
		setAwayTeam(event.target.value)
	}

	function handleHomeTeamScoreUp() {
		setHomeTeamScore(homeTeamScore + 1)
	}

	function handleHomeTeamScoreDown() {
		setHomeTeamScore(homeTeamScore > 0 ? homeTeamScore - 1 : homeTeamScore)
	}

	function handleAwayTeamScoreUp() {
		setAwayTeamScore(awayTeamScore + 1)
	}

	function handleAwayTeamScoreDown() {
		setAwayTeamScore(awayTeamScore > 0 ? awayTeamScore - 1 : awayTeamScore)
	}

	function handleToggleGreenScreen() {
		setIsGreenScreenActive(!isGreenScreenActive)
	}

	return (
		<div className="stopwatch-container">
			<div className="team-selector">
				<div className="team-selector-home">
					<h3>Home</h3>
					<select onChange={handleTeamSelectorHome}>
						{LaLiga.map((team) => (
							<option value={team.img} label={team.name} selected={team.img === "mallorca" ?? "selected"}></option>
						))}
					</select>
					<div className="score-buttons">
						<button onClick={handleHomeTeamScoreUp}>+</button>
						<button onClick={handleHomeTeamScoreDown}>-</button>
					</div>
				</div>
				<div className="team-selector-away">
					<h3>Away</h3>
					<select onChange={handleTeamSelectorAway}>
						{LaLiga.map((team) => (
							<option value={team.img} label={team.name} selected={team.img === "realmadrid" ?? "selected"}></option>
						))}
					</select>
					<div className="score-buttons">
						<button onClick={handleAwayTeamScoreUp}>+</button>
						<button onClick={handleAwayTeamScoreDown}>-</button>
					</div>
				</div>
			</div>

			<div className={"scoreboard-container " + (isGreenScreenActive ? "green-screen" : "")}>
				<div className="stopwatch">
					<div className="logo">
						<img className="logo-img" src={laliga_logo_white} alt="laliga_logo" />
					</div>
					<div className="badge">
						<Badge teamName={homeTeam} />
					</div>
					<div className="score">
						<span>{homeTeamScore}</span>
					</div>
					<div className="timer">
						<span>{formatTime()}</span>
					</div>
					<div className="badge">
						<Badge teamName={awayTeam} />
					</div>
					<div className="score">
						<span>{awayTeamScore}</span>
					</div>
				</div>
			</div>

			<div className="control-panel">
				<button className="start-button" onClick={start}>
					Start
				</button>
				<button className="pause-button" onClick={pause}>
					Pause
				</button>
				<button className="reset-button" onClick={reset}>
					Reset
				</button>
			</div>

			<div className="green-screen-control">
				<button className="green-screen-button" onClick={handleToggleGreenScreen}>
					Toggle GreenScreen
				</button>
			</div>
		</div>
	)
}

export default Stopwatch
