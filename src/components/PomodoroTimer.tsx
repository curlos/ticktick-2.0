import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useState, useEffect } from "react";
import alarmSound from '/clock-alarm-8761.mp3';
import iosDarkNoise from '/IOS Dark Noise Background sound 1 Hour.mp3';

const PomodoroTimer: React.FC = () => {
    const [initialSeconds, _] = useState(5); // Assuming you want to start with a 5 seconds timer for testing
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const [isOvertime, setIsOvertime] = useState(false);
    const backgroundNoise: any = useState(new Audio(iosDarkNoise));
    backgroundNoise.loop = true;

    useEffect(() => {
        let intervalId: any = null;

        if (isActive) {
            if (backgroundNoise && backgroundNoise[0]?.paused) {
                backgroundNoise[0].play();
            }

            intervalId = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 0 && !isOvertime) {
                        console.log('hello world');
                        playPomodoroCompleteSound();
                        showNotification();
                        setIsOvertime(true); // Switch to overtime
                        return initialSeconds + 1; // Start counting up from 0
                    }
                    return isOvertime ? prevSeconds + 1 : prevSeconds - 1;
                });
            }, 1000);
        } else if (!isActive && seconds !== initialSeconds) {
            backgroundNoise[0].pause();
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isActive, seconds, isOvertime]);

    const handleTimerAction = () => {
        setIsActive(!isActive); // Toggle between starting and pausing the timer
    };

    const handleResetTimer = () => {
        // This function will stop and reset the timer, also exiting the overtime phase if it's active
        setIsActive(false);
        setIsOvertime(false);
        setSeconds(initialSeconds); // Reset to the initial time setting
    };

    const showNotification = () => {
        // Check if Notification permission has already been granted
        if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            new Notification("Pomodoro Timer", {
                body: "Time's up!",
                icon: "/path/to/icon.png" // Optional: add a custom icon path
            });
        } else if (Notification.permission !== "denied") {
            // Otherwise, we need to ask the user for permission
            Notification.requestPermission().then(permission => {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    new Notification("Pomodoro Timer", {
                        body: "Time's up!",
                        icon: "/path/to/icon.png" // Optional: add a custom icon path
                    });
                }
            });
        }
    };

    const playPomodoroCompleteSound = () => {
        const audio = new Audio(alarmSound);
        audio.onended = () => {
            // backgroundNoise[0].play();
        };
        backgroundNoise[0].pause();
        audio.play();
    };

    function formatSeconds(seconds: number) {
        // Calculate the number of minutes and the remaining seconds
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // Pad with leading zeros if necessary
        const paddedMinutes = minutes.toString().padStart(2, '0');
        const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

        // Return the formatted string
        return `${paddedMinutes}:${paddedSeconds}`;
    }

    const getPercentage = () => {
        return (seconds / initialSeconds) * 100;
    };

    const bgThemeColor = 'bg-[#FF7D01]';
    const textThemeColor = 'text-[#FF7D01]';

    return (
        <div className="text-center">
            <div className={`text-white mb-4 cursor-pointer`}>Focus <span className="text-gray-500">{'>'}</span></div>
            <CircularProgressbarWithChildren value={getPercentage()}
                strokeWidth={1.5}
                styles={buildStyles({
                    textColor: "#FF7D01",
                    pathColor: "#FF7D01",
                    trailColor: "#3d3c3c"
                })}
                counterClockwise={true}
            >
                <div className="text-white text-[40px] flex justify-center gap-4 w-[100%]" onMouseOver={() => console.log('helfodsf')}>
                    <div className={`${textThemeColor} cursor-pointer`} onClick={() => setSeconds(seconds - 300)}>-</div>
                    <div className="text-center text-[45px]">{formatSeconds(seconds)}</div>
                    <div className={`${textThemeColor} cursor-pointer`} onClick={() => setSeconds(seconds + 300)}>+</div>
                </div>
            </CircularProgressbarWithChildren>

            <div className="flex flex-col gap-2 justify-center items-center pt-6">
                <button type="button" className={`${bgThemeColor} rounded-full py-3 px-10 text-white min-w-[200px]`} onClick={handleTimerAction}>
                    {isActive ? 'Pause' : (seconds !== initialSeconds ? 'Continue' : 'Start')}
                </button>
                <button type="button" className={`${seconds !== initialSeconds && !isActive ? '' : 'invisible '}${bgThemeColor} rounded-full py-3 px-10 text-white min-w-[200px]`} onClick={handleResetTimer}>
                    End
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;