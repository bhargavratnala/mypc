import { useEffect, useState, useCallback } from 'react';
import '../assets/css/window.css';

function Window({ windowName, windowId, active, minimize, closeWindow, setActive } : { windowName: string, windowId: number, active: boolean, minimize: () => void, closeWindow: () => void, setActive: (value : boolean) => void }) {
    const [windowState, setWindowState] = useState({
        id: windowId,
        maximize: false,
        windowPosition: { x: 0, y: 0 },
        windowSize: { width: 200, height: 300 }
    });

    const handleClickOutside = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        setActive(!!target.closest(`.window${windowId}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowId]);

    const handleMouseDown = useCallback((e: MouseEvent) => {
        if (windowState.maximize) return;

        let isDragging = true;
        const offset = [
            windowState.windowPosition.x - e.clientX,
            windowState.windowPosition.y - e.clientY
        ];

        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging) {
                setWindowState((prevState) => ({
                    ...prevState,
                    windowPosition: {
                        x: event.clientX + offset[0],
                        y: event.clientY + offset[1]
                    }
                }));
            }
        };

        const handleMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [windowState.maximize, windowState.windowPosition]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        const titleBar = document.querySelector(`.windowTitleBar${windowId}`);
        if (titleBar) {
            titleBar.addEventListener("mousedown", handleMouseDown as EventListener);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (titleBar) {
                titleBar.removeEventListener('mousedown', handleMouseDown as EventListener);
            }
        };
    }, [handleClickOutside, handleMouseDown, windowId]);

    return (
        <div
            className={active ? `window window${windowId} activeWindow` : `window window${windowId}`}
            style={{
                width: windowState.maximize ? 'calc(100% - 2px)' : windowState.windowSize.width + 'px',
                height: windowState.maximize ? 'calc(100% - 52px)' : windowState.windowSize.height + 'px',
                left: windowState.maximize ? 0 : windowState.windowPosition.x + 'px',
                top: windowState.maximize ? 0 : windowState.windowPosition.y + 'px',
            }}
        >
            <div className={`windowTitleBar windowTitleBar${windowId}`}>
                <div className='windowTitle'>{windowName}</div>
                <div className='windowButtons'>
                    <div className='windowButton minimizeWindowButton' onClick={minimize}>-</div>
                    <div className='windowButton maximizeWindowButton' onClick={() =>
                        setWindowState((prevState) => ({
                            ...prevState,
                            maximize: !prevState.maximize
                        }))
                    }>
                        &#9633;
                    </div>
                    <div className='windowButton closeWindowButton' onClick={closeWindow}>&#10006;</div>
                </div>
            </div>
        </div>
    );
}

export default Window;