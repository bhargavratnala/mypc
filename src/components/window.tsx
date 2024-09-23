import { useEffect, useState, useCallback, ReactNode } from 'react';
import '../assets/css/window.css';

function Window({ windowName, windowId, active, content, isMinimized, minimize, closeWindow, setActive } : { windowName: string, windowId: number, active: boolean, content: ReactNode, isMinimized: boolean, minimize: () => void, closeWindow: () => void, setActive: (value : boolean) => void }) {
    const [windowState, setWindowState] = useState({
        id: windowId,
        maximize: false,
        windowPosition: { x: 100, y: 100 },
        windowSize: { width: 500, height: 400 }
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
                        x: Math.max(0, event.clientX + offset[0]),
                        y: Math.max(0, event.clientY + offset[1])
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
            className={`window window${windowId} ` + (isMinimized ? 'minimize ' : '') + (active ? `activeWindow` : ``)}
            style={{
                width: windowState.maximize ? 'calc(100% - 2px)' : windowState.windowSize.width + 'px',
                height: windowState.maximize ? 'calc(100% - 62px)' : windowState.windowSize.height + 'px',
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
            <div className='windowContent'>
                {content}
            </div>
        </div>
    );
}

export default Window;