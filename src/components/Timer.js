import { useEffect, useState } from "react";

import { FaPlay, FaPause, FaStop, FaRedoAlt, FaClock } from "react-icons/fa";

import "./Timer.css";

export function Timer() {
	const [seconds, setSeconds] = useState(0);
	const [paused, setPaused] = useState(true);
	const [pickedTime, setPickedTime] = useState(0);

	let displayHours;
	let displayMinutes;
	let displaySeconds;

	updateCountdown();

	useEffect(() => {
		const updateCountdown = () => {
			updateCountdown();
		};

		if (paused) {
			return;
		}

		if (seconds <= 0) {
			setPaused(true);
			return;
		}

		const timeout = setTimeout(() => {
			setSeconds(seconds - 1);
			updateCountdown();
		}, 1000);

		return () => clearTimeout(timeout);
	}, [seconds, paused]);

	function inputAmount() {
		let time = prompt("Enter the time in minutes", 30);

		if (isNaN(time)) {
			return;
		}

		if (time < 0) {
			return;
		}

		if (time > 5999) {
			time = 5999;
		}

		setPickedTime(time);
		setSeconds(time * 60);

		updateCountdown();
	}

	function updateCountdown() {
		var formatedHours = Math.floor(seconds / 3600);
		var formatedMinutes = Math.floor((seconds % 3600) / 60);
		var formatedSeconds = Math.floor((seconds % 3600) % 60);

		displayHours = formatedHours.toString().padStart(2, "0");
		displayMinutes = formatedMinutes.toString().padStart(2, "0");
		displaySeconds = formatedSeconds.toString().padStart(2, "0");
	}

	function startCountdown() {
		setPaused(false);
	}

	function pauseCountdown() {
		setPaused(true);
	}

	function stopCountdown() {
		setPaused(true);
		setSeconds(pickedTime * 60);

		updateCountdown();
	}

	return (
		<div className="container">
			<div className="countdown">
				<h1>
					{displayHours}:{displayMinutes}:{displaySeconds}
				</h1>
				<span>
					<FaClock
						onClick={inputAmount}
						className="clockIcon"
						size={64}
					/>
				</span>
			</div>
			<div className="buttons">
				<FaStop onClick={stopCountdown} size={64} />

				{paused === true ? (
					<FaPlay onClick={startCountdown} size={100} />
				) : (
					<FaPause onClick={pauseCountdown} size={100} />
				)}

				<FaRedoAlt onClick={stopCountdown} size={64} />
			</div>
		</div>
	);
}
