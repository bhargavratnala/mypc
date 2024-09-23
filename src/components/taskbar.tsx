import '../assets/css/taskbar.css';
import { FcLinux } from "react-icons/fc";
import { RiRestartLine, RiSettings4Line } from "react-icons/ri";
import SuspenseLoader from './SuspenseLoader';
import { useEffect, useState } from 'react';
import { BsFillLightningChargeFill } from "react-icons/bs";

function Taskbar( { windows, unMinimizeWindow, openWindow, setActive } : { windows: {
        windowName: string,
        isOpen : boolean,
        active : boolean,
        minimized : boolean,
        icon : JSX.Element
    }[] ,
    unMinimizeWindow : (index : number) => void,
    openWindow : (index : number) => void,
    setActive : (index : number) => void
} ) {

    const [startMenuVisible, setStartMenuVisible] = useState(false);
    const [battery, setBattery] = useState({ level: 0, charging: false });
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (startMenuVisible) {
                if ((e.target as HTMLElement).closest('.startMenu') || (e.target as HTMLElement).closest('.startButton')) {
                    return;
                }
                setStartMenuVisible(false);
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (navigator as any).getBattery().then((battery: any) => {
            setBattery(battery);
        });

        const batteryInterval = setInterval(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (navigator as any).getBattery().then((battery: any) => {
                setBattery(battery);
            });
        }, 15000);

        const timeInterval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(batteryInterval);
            clearInterval(timeInterval);
        };
    });

  return (
    <div className="taskbar">
        <div className={startMenuVisible ? 'startMenu' : 'startMenu closeStartMenu'}>
            <div className='startMenuButton' onClick={() => {
                setStartMenuVisible(false);
                setTimeout(() => {
                    window.location.reload();
                }, 300);
            }}>
                <SuspenseLoader>
                    <RiRestartLine />
                </SuspenseLoader>
                Restart
            </div>
        </div>
        <div className="startButton" onClick={() => { setStartMenuVisible(!startMenuVisible) }}>
            <FcLinux />
        </div>
        {windows.map((window, index) => {
            return (
                <div className={window.isOpen ? "taskbarWindow taskbarWindowActive" : "taskbarWindow"} key={index} onClick={() => {
                    if(window.minimized)
                        unMinimizeWindow(index);
                    else if(!window.isOpen)
                        openWindow(index);
                    else
                        setActive(index);
                }}>
                    {window.icon}
                </div>
            );
        })}
        <div className="taskbarOptions">
            <div className="taskbarOption">
                { time }
            </div>
            <div className="taskbarOption">
                <SuspenseLoader>
                    <RiSettings4Line />
                </SuspenseLoader>
            </div>
            <div className="taskbarOption">
                <div className="batteryContainer">
                    <div className="battery">{ battery.charging && <BsFillLightningChargeFill />}{ Math.round(battery.level * 100) }%</div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Taskbar;