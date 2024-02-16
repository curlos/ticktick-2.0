import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useState, useEffect } from "react";
import alarmSound from '/clock-alarm-8761.mp3';
import iosDarkNoise from '/IOS Dark Noise Background sound 1 Hour.mp3';
import { FaHistory, FaEllipsisH } from "react-icons/fa";
import IconsBar from "./IconsBar";
import { Link } from "react-router-dom";
import PixelArt from "./PixelArt";

const bgThemeColor = 'bg-[#FF7D01]';
const textThemeColor = 'text-[#FF7D01]';

interface PomodoroTimerProps {
    selectedButton: string;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = () => {
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
                <div className="text-white text-[40px] flex justify-center gap-4 w-[100%] select-none cursor-pointer" onMouseOver={() => {

                }}>
                    <div className={`${textThemeColor}`} onClick={() => setSeconds(seconds - 300)}>-</div>
                    <div className="text-center text-[45px]">{formatSeconds(seconds)}</div>
                    <div className={`${textThemeColor}`} onClick={() => setSeconds(seconds + 300)}>+</div>
                </div>
            </CircularProgressbarWithChildren>

            <div className="flex flex-col gap-2 justify-center items-center pt-6">
                <button type="button" className={`${bgThemeColor} rounded-full py-3 px-10 text-white min-w-[200px]`} onClick={handleTimerAction}>
                    {isActive ? 'Pause' : (seconds !== initialSeconds ? 'Continue' : 'Start')}
                </button>
                {!isActive && seconds !== initialSeconds && (
                    <button type="button" className={`${seconds !== initialSeconds && !isActive ? '' : 'invisible '}${bgThemeColor} rounded-full py-3 px-10 text-white min-w-[200px]`} onClick={handleResetTimer}>
                        End
                    </button>
                )}
                {!isActive && <div className="text-[#666666] mt-3">Today: 4 pomos - 2 hours 37 minutes</div>}
            </div>
        </div>
    );
};

interface TopBarProps {
    selectedButton: string,
    setSelectedButton: React.Dispatch<React.SetStateAction<string>>;
}

const TopBar: React.FC<TopBarProps> = ({ selectedButton, setSelectedButton }) => {
    const sharedButtonStyle = `py-1 px-4 rounded-3xl cursor-pointer`;
    const selectedButtonStyle = `${sharedButtonStyle} bg-[#321900] text-[#FE7C01]`;
    const unselectedButtonStyle = `${sharedButtonStyle} text-[#666666]`;

    return (
        <div className="flex justify-between items-center">
            <Link to="/focus-records">
                <FaHistory size={'25px'} color={'#999999'} />
            </Link>

            <div className="flex gap-1 mx-[100px]">
                <div className={selectedButton === 'pomo' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setSelectedButton('pomo')}>Pomo</div>
                <div className={selectedButton === 'stopwatch' ? selectedButtonStyle : unselectedButtonStyle} onClick={() => setSelectedButton('stopwatch')}>Stopwatch</div>
            </div>

            <div>
                <FaEllipsisH size={'25px'} color={'#999999'} />
            </div>
        </div>
    );
};

const TimerPage: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState('stopwatch');

    return (
        <div className="w-h-screen min-h-screen flex flex-col items-center bg-black">
            <div className="flex flex-col flex-1 container pt-6">
                <TopBar selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
                <div className="flex-1 flex justify-center items-center">
                    {selectedButton === 'pomo' ? (
                        <PomodoroTimer selectedButton={selectedButton} />
                    ) : (
                        <PixelArt gap="1px" />
                    )}
                </div>
            </div>
            <IconsBar />
        </div>
    );
};

export default TimerPage;