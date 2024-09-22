import '../assets/css/taskbar.css';
import { FcLinux } from "react-icons/fc";
import { RiRestartLine } from "react-icons/ri";
import SuspenseLoader from './SuspenseLoader';
import { useEffect, useState } from 'react';

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

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (startMenuVisible) {
                if ((e.target as HTMLElement).closest('.startMenu') || (e.target as HTMLElement).closest('.startButton')) {
                    return;
                }
                setStartMenuVisible(false);
            }
        });
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
    </div>
  );
}

export default Taskbar;